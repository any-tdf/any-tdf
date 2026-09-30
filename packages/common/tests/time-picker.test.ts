import { describe, expect, test } from 'bun:test';
import {
	resolveTimePickerConfirmValue,
	resolveTimePickerDerived,
	resolveTimePickerInitialSelectionKey,
	resolveTimePickerNowSnapshot
} from '../src/derived/timePicker';
import { en_US } from '../src/lang';

const options = {
	currentTime: resolveTimePickerNowSnapshot(new Date(2026, 0, 31, 12, 30, 45)),
	defaults: en_US.timePicker,
	type: 'YYYYMMDD',
	yearRange: [2024, 2025],
	initMonth: '02',
	initDay: '31'
};

describe('TimePicker initial date', () => {
	test.each([
		['2024', '02', 29, '2024-02-29'],
		['2025', '02', 28, '2025-02-28'],
		['2025', '04', 30, '2025-04-30']
	])('uses the selected month and clamps its final day: %s-%s', (initYear, initMonth, dayCount, expected) => {
		const state = resolveTimePickerDerived({ ...options, initYear, initMonth });
		expect(state.tempDayData).toHaveLength(dayCount);
		expect(state.columns.day.data).toHaveLength(dayCount);
		expect(state.safeInitDayIndex).toBe(dayCount - 1);
		const result = resolveTimePickerConfirmValue({
			type: state.typeInner,
			yearData: state.yearData,
			monthData: state.baseMonthData,
			dayData: state.baseDayData,
			hourData: state.baseHourData,
			minuteData: state.baseMinuteData,
			secondData: state.baseSecondData,
			yearIndex: state.safeInitYearIndex,
			monthIndex: state.safeInitMonthIndex,
			dayIndex: state.safeInitDayIndex,
			hourIndex: state.safeInitHourIndex,
			minuteIndex: state.safeInitMinuteIndex,
			secondIndex: state.safeInitSecondIndex
		});
		expect(result.timeStr).toBe(expected);
	});

	test('uses the first allowed year and month when the current date is outside the ranges', () => {
		const state = resolveTimePickerDerived({ ...options, initMonth: '', initDay: '', monthRange: [2, 3] });
		expect(state.yearData[state.safeInitYearIndex].label).toBe('2024');
		expect(state.baseMonthData[state.safeInitMonthIndex].label).toBe('02');
		expect(state.baseDayData).toHaveLength(29);
		expect(state.safeInitDayIndex).toBe(28);
	});

	test('preserves scrolled day data and index instead of restoring the initial month', () => {
		const currentDayData = Array.from({ length: 31 }, (_, index) => ({ label: String(index + 1).padStart(2, '0') }));
		const state = resolveTimePickerDerived({ ...options, initYear: '2024', currentDayData, dayInitIndex: 4 });
		expect(state.baseDayData).toEqual(currentDayData);
		expect(state.safeInitDayIndex).toBe(4);
	});

	test('resets selection only for date inputs, not language or layout changes', () => {
		const state = resolveTimePickerDerived({ ...options, initYear: '2024' });
		const changedLayout = resolveTimePickerDerived({
			...options,
			initYear: '2024',
			title: 'Updated title',
			viewportHeight: 900,
			defaults: { ...en_US.timePicker, defaultConfirm: 'OK' }
		});
		expect(resolveTimePickerInitialSelectionKey(changedLayout)).toBe(resolveTimePickerInitialSelectionKey(state));
		expect(resolveTimePickerInitialSelectionKey(resolveTimePickerDerived({ ...options, initYear: '2025' }))).not.toBe(
			resolveTimePickerInitialSelectionKey(state)
		);
	});
});
