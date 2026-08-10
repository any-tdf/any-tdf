import { describe, expect, test } from 'bun:test';
import {
	collectCurrentStats,
	createChartSeries,
	createProjectStatsDocument,
	historyFields,
	packageDefinitions,
	projectStatsLocales,
	renderProjectStatsSvg,
	serializeProjectStats,
	unpackHistory,
	validateProjectStats
} from './update-project-stats.mjs';

const createCurrentStats = () => ({
	github: {
		stars: 771,
		forks: 44,
		openIssues: 5,
		openPullRequests: 0
	},
	npm: {
		period: { start: '2026-07-31', end: '2026-08-06' },
		coreWeeklyDownloads: 923,
		ecosystemWeeklyDownloads: 2433,
		packages: packageDefinitions.map(({ name, group }, index) => ({
			name,
			group,
			weeklyDownloads: index + 1
		}))
	}
});

const jsonResponse = (value: unknown, status = 200) =>
	new Response(JSON.stringify(value), {
		status,
		headers: { 'content-type': 'application/json' }
	});

const createHistory = (days: number) =>
	Array.from({ length: days }, (_, index) => ({
		date: new Date(Date.parse('2026-01-01T00:00:00Z') + index * 86_400_000).toISOString().slice(0, 10),
		stars: index,
		forks: 0,
		openIssues: 0,
		openPullRequests: 0,
		coreWeeklyDownloads: 0,
		ecosystemWeeklyDownloads: 0
	}));

describe('project statistics collection', () => {
	test('collects GitHub counts and all public npm packages', async () => {
		const fetcher = async (input: string | URL | Request) => {
			const url = new URL(String(input));
			if (url.pathname === '/repos/any-tdf/any-tdf') {
				return jsonResponse({ stargazers_count: 771, forks_count: 44, open_issues_count: 7 });
			}
			if (url.pathname === '/repos/any-tdf/any-tdf/pulls') {
				return new Response(JSON.stringify([{}]), {
					status: 200,
					headers: {
						'content-type': 'application/json',
						link: '<https://api.github.com/repos/any-tdf/any-tdf/pulls?state=open&per_page=1&page=2>; rel="last"'
					}
				});
			}
			const packageName = decodeURIComponent(url.pathname.split('/').at(-1) as string);
			const packageIndex = packageDefinitions.findIndex(({ name }) => name === packageName);
			return jsonResponse({
				package: packageName,
				downloads: (packageIndex + 1) * 10,
				start: '2026-07-31',
				end: '2026-08-06'
			});
		};
		const current = await collectCurrentStats({ fetcher, token: 'test-token' });

		expect(current.github).toEqual({ stars: 771, forks: 44, openIssues: 5, openPullRequests: 2 });
		expect(current.npm.packages).toHaveLength(11);
		expect(current.npm.coreWeeklyDownloads).toBe(60);
		expect(current.npm.ecosystemWeeklyDownloads).toBe(660);
	});

	test('rejects incomplete API responses without writing a partial snapshot', async () => {
		const fetcher = async () => new Response('Service unavailable', { status: 503 });
		await expect(collectCurrentStats({ fetcher, token: '' })).rejects.toThrow('503');
	});
});

describe('project statistics chart series', () => {
	test('keeps daily precision for short histories', () => {
		const history = createHistory(90);
		expect(createChartSeries(history)).toBe(history);
	});

	test('downsamples long histories and always includes the first and latest snapshots', () => {
		const history = createHistory(200);
		const series = createChartSeries(history);

		expect(series.length).toBeLessThanOrEqual(90);
		expect(series[0]).toBe(history[0]);
		expect(series.at(-1)).toBe(history.at(-1));
	});

	test('renders month-precision axis labels once the span exceeds the daily threshold', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z'
		});
		stats.history = createHistory(200);

		expect(renderProjectStatsSvg(stats, 'light')).toContain('TRACKING SINCE Jan 2026');
		expect(renderProjectStatsSvg(stats, 'light', 'zh_CN')).toContain('持续采集自 2026-01');
	});

	test('rounds chart axis bounds to whole tens, hundreds, or thousands', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z'
		});
		stats.history = createHistory(200); // stars 0 … 199
		const lightSvg = renderProjectStatsSvg(stats, 'light');

		expect(lightSvg).toContain('>200</text>');
		expect(lightSvg).toContain('>100</text>');
		expect(lightSvg).toContain('>50</text>');
		expect(lightSvg).toContain('>0</text>');
		expect(lightSvg).not.toContain('>199</text>');
	});
});

describe('project statistics history and SVG output', () => {
	test('replaces the current date and keeps history ordered', () => {
		const previous = createProjectStatsDocument({
			current: { ...createCurrentStats(), github: { ...createCurrentStats().github, stars: 760 } },
			updatedAt: '2026-08-06T02:17:00.000Z'
		});
		const firstUpdate = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-10T02:17:00.000Z',
			previous
		});
		const secondUpdate = createProjectStatsDocument({
			current: { ...createCurrentStats(), github: { ...createCurrentStats().github, stars: 772 } },
			updatedAt: '2026-08-10T03:17:00.000Z',
			previous: firstUpdate
		});

		expect(secondUpdate.history).toHaveLength(2);
		expect(secondUpdate.history.map(({ date }) => date)).toEqual(['2026-08-06', '2026-08-10']);
		expect(secondUpdate.history.at(-1)?.stars).toBe(772);
		expect(validateProjectStats(secondUpdate)).toBe(secondUpdate);
	});

	test('renders an accessible first-day preview in every README locale and both themes', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z'
		});
		const lightSvg = renderProjectStatsSvg(stats, 'light');
		const darkSvg = renderProjectStatsSvg(stats, 'dark');
		const localizedSvgs = projectStatsLocales.flatMap((locale) => [
			renderProjectStatsSvg(stats, 'light', locale),
			renderProjectStatsSvg(stats, 'dark', locale)
		]);

		expect(lightSvg).toContain('Any TDF project statistics');
		expect(lightSvg).toContain('2,433');
		expect(lightSvg).toContain('Tracking starts here');
		expect(lightSvg).toContain('#f6f7ff');
		expect(darkSvg).toContain('#101113');
		expect(projectStatsLocales).toEqual([
			'en',
			'de_DE',
			'es_ES',
			'fr_FR',
			'it_IT',
			'ja_JP',
			'ko_KR',
			'ru_RU',
			'zh_CN',
			'zh_TW'
		]);
		expect(localizedSvgs).toHaveLength(20);
		expect(localizedSvgs.every((svg) => svg.includes('role="img"'))).toBe(true);
		expect(renderProjectStatsSvg(stats, 'light', 'zh_CN')).toContain('用数字看 Any TDF');
		expect(renderProjectStatsSvg(stats, 'dark', 'de_DE')).toContain('Any TDF in Zahlen');
	});
});

describe('project statistics history compaction', () => {
	test('keeps one entry per week plus the first and latest snapshots, and stays idempotent', () => {
		const previous = { history: createHistory(200) };
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-10T02:17:00.000Z',
			previous
		});
		const expectedSundays = Array.from({ length: 29 }, (_, index) =>
			new Date(Date.parse('2026-01-04T00:00:00Z') + index * 7 * 86_400_000).toISOString().slice(0, 10)
		);

		expect(stats.history.map(({ date }) => date)).toEqual(['2026-01-01', ...expectedSundays, '2026-08-10']);
		expect(stats.history.at(-1)?.stars).toBe(771);
		expect(validateProjectStats(stats)).toBe(stats);

		const rerun = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-10T03:17:00.000Z',
			previous: stats
		});
		expect(rerun.history).toEqual(stats.history);
	});
});

describe('project statistics serialization', () => {
	test('serializes history as compact rows and restores it losslessly', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z',
			previous: { history: createHistory(3) }
		});
		const json = serializeProjectStats(stats);
		const parsed = JSON.parse(json);

		expect(parsed.schemaVersion).toBe(2);
		expect(parsed.historyFields).toEqual(historyFields);
		expect(parsed.history[0]).toEqual(['2026-01-01', 0, 0, 0, 0, 0, 0]);
		expect(json).toContain('["2026-01-01", 0, 0, 0, 0, 0, 0]');
		expect(unpackHistory(parsed.history)).toEqual(stats.history);
	});
});

describe('project statistics time axis', () => {
	test('renders sparse year tick labels once the history spans multiple years', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z'
		});
		stats.history = createHistory(400); // 2026-01-01 … 2027-02-04
		const lightSvg = renderProjectStatsSvg(stats, 'light');

		expect(lightSvg).toContain('>2027</text>');
		expect(lightSvg).not.toContain('>2026</text>');
	});

	test('renders no year ticks for a single-year history', () => {
		const stats = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z'
		});
		stats.history = createHistory(200); // 2026-01-01 … 2026-07-19

		expect(renderProjectStatsSvg(stats, 'light')).not.toContain('>2027</text>');
	});
});
