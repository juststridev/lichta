<script lang="ts">
	import { LichTa } from '@lichta/core';
	import type { LunarDate } from '@lichta/core';
	import type { Snippet } from 'svelte';

	// Props nhận vào từ consumer ứng dụng
	interface Props {
		date?: Date;
		children?: Snippet;
	}
	let { date = new Date(), children }: Props = $props();

	// Khai báo biến reactive tự động tính toán lại khi `date` thay đổi
	let lunar: LunarDate = $derived.by(() => {
		const d = date.getDate();
		const m = date.getMonth() + 1; // Tháng trong JS tính từ 0
		const y = date.getFullYear();
		return LichTa.toLunar(d, m, y);
	});
</script>

<div class="lich-ta-formatter">
	<div class="lunar-display-banner">
		<span class="lunar-date">Ngày {lunar.day} tháng {lunar.month} (Âm lịch)</span>
		<span class="can-chi-details">Năm {lunar.yearCanChi}</span>
	</div>

	<div class="control-slot-wrapper">
		{@render children?.()}
	</div>
</div>

<style>
	.lich-ta-formatter {
		display: block;
		width: 100%;
		box-sizing: border-box;
	}
	.lunar-display-banner {
		padding: 12px;
		background-color: #fcfaf7;
		border-left: 4px solid #d4a373;
		margin-bottom: 16px;
	}
	.lunar-date {
		display: block;
		font-weight: bold;
		font-size: 1.1rem;
		color: #1a1a1a;
	}
	.can-chi-details {
		display: block;
		font-size: 0.9rem;
		color: #666666;
		margin-top: 4px;
	}
</style>
