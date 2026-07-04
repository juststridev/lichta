<script lang="ts">
	import { LichTa, getYearDetails } from '@lichta/core';
	import type { LunarDate } from '@lichta/core';
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';

	import type { Locale } from '@lichta/core';

	/**
	 * Dữ liệu cho mỗi ô ngày trong lưới lịch
	 */
	interface DayCellData {
		solar: Date;
		lunar: LunarDate;
		isToday: boolean;
		isSelected: boolean;
		isCurrentMonth: boolean;
	}

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
	const weekDayLabels = $derived(
		locale === 'vi'
			? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
			: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	);

	// Tên tháng hiển thị
	const monthNames = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12'
	];

	// Can Chi năm hiển thị
	let yearInfo = $derived(getYearDetails(currentYear));

	// Ngày hôm nay
	const today = new Date();
	const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	// Tính grid lịch 6x7 = 42 ô
	let calendarGrid = $derived.by((): DayCellData[] => {
		const grid: DayCellData[] = [];

		// Ngày đầu tiên của tháng
		const firstDay = new Date(currentYear, currentMonth - 1, 1);
		// Thứ của ngày đầu tiên (0=CN, 1=T2, ...)
		const startDayOfWeek = firstDay.getDay();
		// Số ngày trong tháng
		const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

		// Padding ngày tháng trước
		const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
		for (let i = startDayOfWeek - 1; i >= 0; i--) {
			const d = prevMonthDays - i;
			const m = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;
			const y = currentMonth - 1 <= 0 ? currentYear - 1 : currentYear;
			const solar = new Date(y, m - 1, d);
			const lunar = LichTa.toLunar(d, m, y);
			const dateStr = `${y}-${m}-${d}`;
			const selStr = selectedDate
				? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
				: '';

			grid.push({
				solar,
				lunar,
				isToday: dateStr === todayStr,
				isSelected: dateStr === selStr,
				isCurrentMonth: false
			});
		}

		// Ngày trong tháng hiện tại
		for (let d = 1; d <= daysInMonth; d++) {
			const solar = new Date(currentYear, currentMonth - 1, d);
			const lunar = LichTa.toLunar(d, currentMonth, currentYear);
			const dateStr = `${currentYear}-${currentMonth}-${d}`;
			const selStr = selectedDate
				? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
				: '';

			grid.push({
				solar,
				lunar,
				isToday: dateStr === todayStr,
				isSelected: dateStr === selStr,
				isCurrentMonth: true
			});
		}

		// Padding ngày tháng sau
		const remaining = 42 - grid.length;
		for (let d = 1; d <= remaining; d++) {
			const m = currentMonth + 1 > 12 ? 1 : currentMonth + 1;
			const y = currentMonth + 1 > 12 ? currentYear + 1 : currentYear;
			const solar = new Date(y, m - 1, d);
			const lunar = LichTa.toLunar(d, m, y);
			const dateStr = `${y}-${m}-${d}`;
			const selStr = selectedDate
				? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
				: '';

			grid.push({
				solar,
				lunar,
				isToday: dateStr === todayStr,
				isSelected: dateStr === selStr,
				isCurrentMonth: false
			});
		}

		return grid;
	});

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

<style>
	.lich-ta-calendar {
		--lichta-primary: #d4a373;
		--lichta-primary-light: #f5e6d3;
		--lichta-bg: #fffcf7;
		--lichta-surface: #ffffff;
		--lichta-text: #2c1810;
		--lichta-text-muted: #8b7355;
		--lichta-text-dim: #c4b5a0;
		--lichta-border: #e8ddd0;
		--lichta-today-bg: #d4a373;
		--lichta-today-text: #ffffff;
		--lichta-selected-bg: #a0522d;
		--lichta-selected-text: #ffffff;
		--lichta-hover-bg: #f5e6d3;
		--lichta-lunar-text: #b08968;
		--lichta-first-lunar: #c2185b;
		--lichta-radius: 8px;
		--lichta-font: inherit;

		font-family: var(--lichta-font);
		background: var(--lichta-bg);
		border: 1px solid var(--lichta-border);
		border-radius: calc(var(--lichta-radius) * 2);
		padding: 16px;
		max-width: 420px;
		width: 100%;
		box-sizing: border-box;
		user-select: none;
	}

	/* Header */
	.lich-ta-calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.lich-ta-calendar-nav {
		background: none;
		border: 1px solid var(--lichta-border);
		border-radius: var(--lichta-radius);
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--lichta-text);
		font-size: 0.85rem;
		transition: all 0.15s ease;
	}

	.lich-ta-calendar-nav:hover {
		background: var(--lichta-hover-bg);
		border-color: var(--lichta-primary);
	}

	.lich-ta-calendar-title {
		text-align: center;
	}

	.lich-ta-calendar-month-year {
		display: block;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--lichta-text);
	}

	.lich-ta-calendar-canchi {
		display: block;
		font-size: 0.8rem;
		color: var(--lichta-text-muted);
		margin-top: 2px;
	}

	/* Weekdays */
	.lich-ta-calendar-weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		margin-bottom: 4px;
	}

	.lich-ta-calendar-weekday {
		text-align: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--lichta-text-muted);
		padding: 6px 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Grid */
	.lich-ta-calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	.lich-ta-calendar-day {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6px 2px;
		min-height: 48px;
		border: none;
		border-radius: var(--lichta-radius);
		background: transparent;
		cursor: pointer;
		transition: all 0.15s ease;
		font-family: inherit;
	}

	.lich-ta-calendar-day:hover {
		background: var(--lichta-hover-bg);
	}

	.lich-ta-calendar-day:focus-visible {
		outline: 2px solid var(--lichta-primary);
		outline-offset: 1px;
	}

	.solar-day {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--lichta-text);
		line-height: 1.2;
	}

	.lunar-day {
		font-size: 0.65rem;
		color: var(--lichta-lunar-text);
		line-height: 1.2;
		margin-top: 1px;
	}

	/* States */
	.is-other-month .solar-day {
		color: var(--lichta-text-dim);
	}

	.is-other-month .lunar-day {
		color: var(--lichta-text-dim);
	}

	.is-today {
		background: var(--lichta-today-bg);
	}

	.is-today .solar-day {
		color: var(--lichta-today-text);
		font-weight: 700;
	}

	.is-today .lunar-day {
		color: var(--lichta-today-text);
		opacity: 0.85;
	}

	.is-today:hover {
		background: var(--lichta-today-bg);
		opacity: 0.9;
	}

	.is-selected {
		background: var(--lichta-selected-bg);
	}

	.is-selected .solar-day {
		color: var(--lichta-selected-text);
		font-weight: 700;
	}

	.is-selected .lunar-day {
		color: var(--lichta-selected-text);
		opacity: 0.85;
	}

	.is-first-lunar .lunar-day {
		color: var(--lichta-first-lunar);
		font-weight: 600;
	}

	.is-today.is-first-lunar .lunar-day,
	.is-selected.is-first-lunar .lunar-day {
		color: var(--lichta-today-text);
	}

	/* Footer */
	.lich-ta-calendar-footer {
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--lichta-border);
	}
</style>
