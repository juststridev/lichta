<script lang="ts">
	import { getYearDetails, getCalendarGrid, getWeekDayLabels, t } from '@lichta/core';
	import type { LunarDate, CalendarDayCell } from '@lichta/core';
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';

	import type { Locale, FirstDayOfWeek } from '@lichta/core';

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
		/** Callback khi user điều hướng tháng qua nút prev/next trong header */
		onMonthChange?: (month: number, year: number) => void;
		/** Hiển thị ngày âm lịch bên dưới ngày dương */
		showLunar?: boolean;
		/** Locale (vi | en | ja | ko) */
		locale?: Locale;
		/** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
		firstDayOfWeek?: FirstDayOfWeek;
		/** Hiển thị số tuần (ISO-8601) ở đầu mỗi hàng */
		showWeekNumber?: boolean;
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
		onMonthChange,
		showLunar = true,
		locale = 'vi',
		firstDayOfWeek = 0,
		showWeekNumber = false,
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
	const weekDayLabels = $derived(getWeekDayLabels(locale, firstDayOfWeek));

	// Tên tháng dương lịch cho phần header điều hướng
	const monthNames = $derived(t(locale).solarMonthNames);

	// Can Chi năm hiển thị
	let yearInfo = $derived(getYearDetails(currentYear));

	// Tính grid lịch 6x7 = 42 ô
	let calendarGrid = $derived(getCalendarGrid(currentMonth, currentYear, selectedDate, firstDayOfWeek));

	// Navigation
	function prevMonth() {
		const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
		const newYear = currentMonth === 1 ? currentYear - 1 : currentYear;
		currentMonth = newMonth;
		currentYear = newYear;
		onMonthChange?.(newMonth, newYear);
	}

	function nextMonth() {
		const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
		const newYear = currentMonth === 12 ? currentYear + 1 : currentYear;
		currentMonth = newMonth;
		currentYear = newYear;
		onMonthChange?.(newMonth, newYear);
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

<div class={['lich-ta-calendar', `lichta-theme-${theme}`, showWeekNumber ? 'lich-ta-calendar--with-week-number' : ''].filter(Boolean).join(' ')}>
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
		{#if showWeekNumber}
			<div class="lich-ta-calendar-week-number" aria-hidden="true"></div>
		{/if}
		{#each weekDayLabels as label (label)}
			<div class="lich-ta-calendar-weekday">{label}</div>
		{/each}
	</div>

	<!-- Grid ngày -->
	<div class="lich-ta-calendar-grid">
		{#each calendarGrid as cell, idx (cell.solar.getTime())}
			{#if showWeekNumber && idx % 7 === 0}
				<div class="lich-ta-calendar-week-number">{cell.weekNumber}</div>
			{/if}
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
