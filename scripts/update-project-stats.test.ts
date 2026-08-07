import { describe, expect, test } from 'bun:test';
import {
	collectCurrentStats,
	createProjectStatsDocument,
	packageDefinitions,
	projectStatsLocales,
	renderProjectStatsSvg,
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

describe('project statistics history and SVG output', () => {
	test('replaces the current date and keeps history ordered', () => {
		const previous = createProjectStatsDocument({
			current: { ...createCurrentStats(), github: { ...createCurrentStats().github, stars: 760 } },
			updatedAt: '2026-08-06T02:17:00.000Z'
		});
		const firstUpdate = createProjectStatsDocument({
			current: createCurrentStats(),
			updatedAt: '2026-08-07T02:17:00.000Z',
			previous
		});
		const secondUpdate = createProjectStatsDocument({
			current: { ...createCurrentStats(), github: { ...createCurrentStats().github, stars: 772 } },
			updatedAt: '2026-08-07T03:17:00.000Z',
			previous: firstUpdate
		});

		expect(secondUpdate.history).toHaveLength(2);
		expect(secondUpdate.history.map(({ date }) => date)).toEqual(['2026-08-06', '2026-08-07']);
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
