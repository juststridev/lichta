<script lang="ts">
	import { getYearDetails, getCalendarGrid, getWeekDayLabels, t } from '@lichta/core';
	import type { LunarDate, Locale, CalendarDayCell, FirstDayOfWeek } from '@lichta/core';

	interface Props {
		/** Ngày đang chọn (uncontrolled — component tự quản lý sau lần mount đầu) */
		value?: Date | null;
		/** Gọi khi người dùng chọn 1 ngày trong popover */
		onSelect?: (date: Date, lunar: LunarDate) => void;
		/** Callback khi user điều hướng tháng qua nút prev/next trong popover */
		onMonthChange?: (month: number, year: number) => void;
		placeholder?: string;
		locale?: Locale;
		/** Ngày bắt đầu tuần: 0 = Chủ Nhật (mặc định), 1 = Thứ Hai */
		firstDayOfWeek?: FirstDayOfWeek;
		theme?: 'classic' | 'glass';
		showLunar?: boolean;
		format?: (date: Date) => string;
		disabled?: boolean;
	}

	function defaultFormat(date: Date): string {
		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		return `${dd}/${mm}/${date.getFullYear()}`;
	}

	let {
		value = null,
		onSelect,
		onMonthChange,
		placeholder = 'Chọn ngày',
		locale = 'vi',
		firstDayOfWeek = 0,
		theme = 'classic',
		showLunar = true,
		format = defaultFormat,
		disabled = false
	}: Props = $props();

	// Writable $derived (Svelte 5): mặc định bám theo prop `value`, nhưng có thể
	// gán lại trực tiếp (xem handleDaySelect) — giá trị gán tay giữ nguyên cho tới
	// khi `value` đổi thì tính lại từ đầu.
	let selected = $derived<Date | null>(value ?? null);
	let isOpen = $state(false);
	let rootEl: HTMLElement | undefined = $state();

	// State điều hướng tháng/năm hiển thị trong popover, tách khỏi `selected` để
	// prevMonth()/nextMonth() điều hướng được độc lập (không phụ thuộc ngày đã chọn).
	const initialAnchor = value ?? new Date();
	let viewMonth = $state(initialAnchor.getMonth() + 1);
	let viewYear = $state(initialAnchor.getFullYear());

	// Đồng bộ lại view khi component cha đổi prop `value` từ bên ngoài.
	$effect(() => {
		if (value) {
			viewMonth = value.getMonth() + 1;
			viewYear = value.getFullYear();
		}
	});

	const weekDayLabels = $derived(getWeekDayLabels(locale, firstDayOfWeek));
	const monthNames = $derived(t(locale).solarMonthNames);
	let yearInfo = $derived(getYearDetails(viewYear));
	let grid = $derived(getCalendarGrid(viewMonth, viewYear, selected, firstDayOfWeek));
	const displayValue = $derived(selected ? format(selected) : '');

	function toggleOpen() {
		if (!disabled) isOpen = !isOpen;
	}

	function prevMonth() {
		const newMonth = viewMonth === 1 ? 12 : viewMonth - 1;
		const newYear = viewMonth === 1 ? viewYear - 1 : viewYear;
		viewMonth = newMonth;
		viewYear = newYear;
		onMonthChange?.(newMonth, newYear);
	}

	function nextMonth() {
		const newMonth = viewMonth === 12 ? 1 : viewMonth + 1;
		const newYear = viewMonth === 12 ? viewYear + 1 : viewYear;
		viewMonth = newMonth;
		viewYear = newYear;
		onMonthChange?.(newMonth, newYear);
	}

	function handleDaySelect(cell: CalendarDayCell) {
		selected = cell.solar;
		isOpen = false;
		onSelect?.(cell.solar, cell.lunar);
	}

	function handlePointerDown(event: MouseEvent) {
		if (rootEl && !rootEl.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') isOpen = false;
	}

	$effect(() => {
		if (!isOpen) return;
		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div bind:this={rootEl} class={['lich-ta-datepicker', `lichta-theme-${theme}`].join(' ')}>
	<input
		type="text"
		class="lich-ta-datepicker-input"
		readonly
		{disabled}
		{placeholder}
		value={displayValue}
		aria-haspopup="dialog"
		aria-expanded={isOpen}
		onclick={toggleOpen}
	/>
	{#if isOpen}
		<div class="lich-ta-datepicker-popover" role="dialog">
			<div class="lich-ta-datepicker-calendar">
				<div class="lich-ta-datepicker-calendar-header">
					<button
						type="button"
						class="lich-ta-datepicker-calendar-nav"
						onclick={prevMonth}
						aria-label="Tháng trước">◀</button
					>
					<div class="lich-ta-datepicker-calendar-title">
						<span class="lich-ta-datepicker-calendar-month-year">
							{monthNames[viewMonth - 1]}, {viewYear}
						</span>
						<span class="lich-ta-datepicker-calendar-canchi">
							{yearInfo.can}
							{yearInfo.chi}
						</span>
					</div>
					<button
						type="button"
						class="lich-ta-datepicker-calendar-nav"
						onclick={nextMonth}
						aria-label="Tháng sau">▶</button
					>
				</div>

				<div class="lich-ta-datepicker-calendar-weekdays">
					{#each weekDayLabels as label (label)}
						<div class="lich-ta-datepicker-calendar-weekday">{label}</div>
					{/each}
				</div>

				<div class="lich-ta-datepicker-calendar-grid">
					{#each grid as cell (cell.solar.getTime())}
						<button
							type="button"
							class="lich-ta-datepicker-calendar-day"
							class:is-today={cell.isToday}
							class:is-selected={cell.isSelected}
							class:is-other-month={!cell.isCurrentMonth}
							class:is-first-lunar={cell.lunar.day === 1}
							tabindex={cell.isCurrentMonth ? 0 : -1}
							onclick={() => handleDaySelect(cell)}
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
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
