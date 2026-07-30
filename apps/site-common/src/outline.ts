export type SiteOutlineItem = {
	id: string;
	title: string;
	level: 2 | 3;
};

const normalizeHeadingId = (value: string) => {
	return value
		.normalize('NFKC')
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
};

export const buildSiteOutline = (container: HTMLElement): SiteOutlineItem[] => {
	const usedIds = new Map<string, number>();
	const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>('h2, h3'));

	return headings.flatMap((heading, index) => {
		const title = heading.textContent?.trim().replace(/\s+/g, ' ') ?? '';
		if (!title || heading.closest('[data-site-outline-ignore]')) return [];

		const baseId = heading.id || normalizeHeadingId(title) || `section-${index + 1}`;
		const occurrence = usedIds.get(baseId) ?? 0;
		usedIds.set(baseId, occurrence + 1);
		const id = occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`;
		heading.id = id;
		heading.dataset.siteOutlineHeading = '';

		return [
			{
				id,
				title,
				level: heading.tagName === 'H2' ? 2 : 3
			} satisfies SiteOutlineItem
		];
	});
};

export const observeActiveSiteOutline = (container: HTMLElement, onActiveChange: (id: string) => void) => {
	const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>('[data-site-outline-heading]'));
	if (headings.length === 0) {
		onActiveChange('');
		return () => undefined;
	}

	const findScrollRoot = () => {
		let parent = container.parentElement;
		while (parent) {
			const { overflowY } = getComputedStyle(parent);
			if (/(auto|scroll|overlay)/.test(overflowY) && parent.scrollHeight > parent.clientHeight) return parent;
			parent = parent.parentElement;
		}
		return null;
	};

	const scrollRoot = findScrollRoot();
	const scrollTarget: HTMLElement | Window = scrollRoot ?? window;
	let frame = 0;
	let lastActiveId = '';

	const updateActive = () => {
		frame = 0;
		const rootRect = scrollRoot?.getBoundingClientRect();
		const top = (rootRect?.top ?? 0) + (scrollRoot ? 16 : 96);
		const bottom = rootRect?.bottom ?? window.innerHeight;
		const visibleHeading = headings.find((heading) => {
			const rect = heading.getBoundingClientRect();
			return rect.bottom > top && rect.top < bottom;
		});
		const previousHeading = [...headings].reverse().find((heading) => heading.getBoundingClientRect().top <= top);
		const activeId = (visibleHeading ?? previousHeading ?? headings[0]).id;

		if (activeId !== lastActiveId) {
			lastActiveId = activeId;
			onActiveChange(activeId);
		}
	};

	const scheduleUpdate = () => {
		if (frame) return;
		frame = requestAnimationFrame(updateActive);
	};

	updateActive();
	scrollTarget.addEventListener('scroll', scheduleUpdate, { passive: true });
	window.addEventListener('resize', scheduleUpdate, { passive: true });

	return () => {
		if (frame) cancelAnimationFrame(frame);
		scrollTarget.removeEventListener('scroll', scheduleUpdate);
		window.removeEventListener('resize', scheduleUpdate);
	};
};
