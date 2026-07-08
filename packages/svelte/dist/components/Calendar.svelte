<script lang="ts">
	import { getYearDetails, getCalendarGrid, t } from '@lichta/core';
	import type { LunarDate, CalendarDayCell } from '@lichta/core';
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';

	import type { Locale } from '@lichta/core';

	/**
	 * Dữ liệu cho mỗi ô ngày trong lưới lịch
	 */
	type DayCellData = CalendarDayCell;

	interface Props {
		/** Tháng hiển thị (1-12). Mặc định: tháng hiện tại */
		month?: number;
		/** Năm hiển thị. Mặc định: năm hiện tại */
		year?: number;
		/** Ngày được chọn */
		selectedDate?: Date | null;
		/** Callback khi chọn ngày */
		onSelect?: (date: Date, lunar: LunarDate) => void;
		/** Hiển thị ngày âm lịch bên dưới ngày dương */
		showLunar?: boolean;
		/** Locale (vi | en | ja | ko) */
		locale?: Locale;
		/** Custom snippet cho mỗi ô ngày */
		dayCell?: Snippet<[DayCellData]>;
		children?: Snippet;
		/** Theme cho calendar */
		theme?: 'classic' | 'glass';
	}

	let {
		month = new Date().getMonth() + 1,
		year = new Date().getFullYear(),
		selectedDate = null,
		onSelect,
		showLunar = true,
		locale = 'vi',
		dayCell,
		children,
		theme = 'classic'
	}: Props = $props();

	// State nội bộ cho navigation (khởi tạo từ props hoặc giá trị mặc định).
	// Cố ý chỉ lấy giá trị ban đầu (untrack) — việc đồng bộ khi prop đổi sau đó
	// do 2 $effect bên dưới đảm nhiệm, để tránh cảnh báo state_referenced_locally.
	let currentMonth = $state(untrack(() => month ?? new Date().getMonth() + 1));
	let currentYear = $state(untrack(() => year ?? new Date().getFullYear()));

	// Đồng bộ lại state nội bộ khi component cha đổi prop `month`/`year` từ bên ngoài
	// (không chạy lại khi chỉ điều hướng nội bộ qua prevMonth()/nextMonth(), vì effect
	// này chỉ theo dõi `month`/`year`, không theo dõi `currentMonth`/`currentYear`).
	$effect(() => {
		if (month !== undefined) currentMonth = month;
	});
	$effect(() => {
		if (year !== undefined) currentYear = year;
	});

	// Tên thứ trong tuần
	const weekDayLabels = $derived(t(locale).weekDays);

	// Tên tháng dương lịch cho phần header điều hướng
	const monthNames = $derived(t(locale).solarMonthNames);

	// Can Chi năm hiển thị
	let yearInfo = $derived(getYearDetails(currentYear));

	// Tính grid lịch 6x7 = 42 ô
	let calendarGrid = $derived(getCalendarGrid(currentMonth, currentYear, selectedDate));

	// Navigation
	function prevMonth() {
		if (currentMonth === 1) {
			currentMonth = 12;
			currentYear -= 1;
		} else {
			currentMonth -= 1;
		}
	}

	function nextMonth() {
		if (currentMonth === 12) {
			currentMonth = 1;
			currentYear += 1;
		} else {
			currentMonth += 1;
		}
	}

	function handleDayClick(cell: DayCellData) {
		onSelect?.(cell.solar, cell.lunar);
	}

	function handleKeydown(event: KeyboardEvent, cell: DayCellData) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleDayClick(cell);
		}
	}
</script>

<div class={['lich-ta-calendar', `lichta-theme-${theme}`].join(' ')}>
	<!-- Header: Navigation + Tháng/Năm -->
	<div class="lich-ta-calendar-header">
		<button class="lich-ta-calendar-nav" onclick={prevMonth} aria-label="Tháng trước">◀</button>
		<div class="lich-ta-calendar-title">
			<span class="lich-ta-calendar-month-year">
				{monthNames[currentMonth - 1]}, {currentYear}
			</span>
			<span class="lich-ta-calendar-canchi">
				{yearInfo.can}
				{yearInfo.chi}
			</span>
		</div>
		<button class="lich-ta-calendar-nav" onclick={nextMonth} aria-label="Tháng sau">▶</button>
	</div>

	<!-- Tên thứ -->
	<div class="lich-ta-calendar-weekdays">
		{#each weekDayLabels as label (label)}
			<div class="lich-ta-calendar-weekday">{label}</div>
		{/each}
	</div>

	<!-- Grid ngày -->
	<div class="lich-ta-calendar-grid">
		{#each calendarGrid as cell (cell.solar.getTime())}
			{#if dayCell}
				{@render dayCell(cell)}
			{:else}
				<button
					class="lich-ta-calendar-day"
					class:is-today={cell.isToday}
					class:is-selected={cell.isSelected}
					class:is-other-month={!cell.isCurrentMonth}
					class:is-first-lunar={cell.lunar.day === 1}
					onclick={() => handleDayClick(cell)}
					onkeydown={(e) => handleKeydown(e, cell)}
					tabindex={cell.isCurrentMonth ? 0 : -1}
				>
					<span class="solar-day">{cell.solar.getDate()}</span>
					{#if showLunar}
						<span class="lunar-day">
							{#if cell.lunar.day === 1}
								{cell.lunar.day}/{cell.lunar.month}{cell.lunar.isLeap ? '*' : ''}
							{:else}
								{cell.lunar.day}
							{/if}
						</span>
					{/if}
				</button>
			{/if}
		{/each}
	</div>

	<!-- Slot cho nội dung tùy chỉnh bên dưới lịch -->
	{#if children}
		<div class="lich-ta-calendar-footer">
			{@render children()}
		</div>
	{/if}
</div>
