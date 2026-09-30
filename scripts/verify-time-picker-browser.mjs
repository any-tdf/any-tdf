export const verifyTimePickerBrowser = async (runInPage) => {
	const result = await runInPage(`
		const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		await pause(800);
		for (const [date, days] of [['2024-02', 29], ['2025-02', 28], ['2025-04', 30]]) {
			const root = document.querySelector('[data-time-picker-regression="' + date + '"]');
			if (!root) throw new Error('Missing initial date example: ' + date);
			const columns = [...root.querySelectorAll('.snap-y')];
			if (columns.length !== 3) throw new Error('Expected three date columns: ' + date);
			const labels = [...columns[2].querySelectorAll('.truncate')].map((element) => element.textContent.trim()).filter(Boolean);
			if (labels.length !== days || labels.at(-1) !== String(days)) throw new Error('Incorrect month length: ' + date + ' ' + JSON.stringify(labels));
			const buttons = [...root.querySelectorAll('button')].filter((element) => !element.hasAttribute('data-update-title'));
			buttons.at(-1).click();
			await pause(100);
			if (root.querySelector('output').textContent !== date + '-' + days) throw new Error('Initial confirmation does not match the selected month end: ' + date + ': ' + root.querySelector('output').textContent + ' '  + JSON.stringify(columns.map((column) => ({ scrollTop: column.scrollTop, height: column.clientHeight, itemHeight: column.firstElementChild.getBoundingClientRect().height }))));
		}
		const root = document.querySelector('[data-time-picker-regression="2024-02"]');
		const monthColumn = root.querySelectorAll('.snap-y')[1];
		monthColumn.scrollTo({ top: monthColumn.firstElementChild.getBoundingClientRect().height * 2, behavior: 'instant' });
		monthColumn.dispatchEvent(new Event('scroll'));
		await pause(500);
		const dayColumn = root.querySelectorAll('.snap-y')[2];
		const marchDays = [...dayColumn.querySelectorAll('.truncate')].map((element) => element.textContent.trim()).filter(Boolean);
		if (marchDays.length !== 31) throw new Error('Scrolling to March did not refresh its day column.');
		const itemHeight = dayColumn.firstElementChild.getBoundingClientRect().height;
		dayColumn.scrollTo({ top: itemHeight * 4, behavior: 'instant' });
		dayColumn.dispatchEvent(new Event('scroll'));
		await pause(500);
		root.querySelector('[data-update-title]').click();
		window.dispatchEvent(new Event('resize'));
		await pause(500);
		[...root.querySelectorAll('button')].filter((element) => !element.hasAttribute('data-update-title')).at(-1).click();
		await pause(100);
		const selected = root.querySelector('output').textContent;
		if (selected !== '2024-03-05') throw new Error('Title or layout update reset the scrolled selection: ' + selected);
		return selected;
	`);
	if (result !== '2024-03-05') throw new Error('TimePicker regression verification did not complete.');
};
