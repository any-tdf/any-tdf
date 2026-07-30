const isDate = (value: unknown): value is Date => Object.prototype.toString.call(value) === '[object Date]';

export const getInterpolator = <T>(a: T, b: T): ((t: number) => T) => {
	if (Object.is(a, b) || (a as unknown) !== (a as unknown)) return () => a;

	const type = typeof a;
	if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
		throw new Error('Cannot interpolate values of different type');
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		const interpolators = b.map((item, index) => getInterpolator(a[index], item));
		return ((t: number) => interpolators.map((interpolate) => interpolate(t))) as (t: number) => T;
	}

	if (type === 'object') {
		if (!a || !b) {
			throw new Error('Object cannot be null');
		}
		if (isDate(a) && isDate(b)) {
			const start = a.getTime();
			const delta = b.getTime() - start;
			return ((t: number) => new Date(start + t * delta)) as (t: number) => T;
		}
		const resultKeys = Object.keys(b as Record<string, unknown>);
		const interpolators = new Map<string, (t: number) => unknown>();
		for (const key of resultKeys) {
			interpolators.set(key, getInterpolator((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
		}
		return ((t: number) => {
			const result: Record<string, unknown> = {};
			for (const key of resultKeys) {
				result[key] = interpolators.get(key)?.(t);
			}
			return result as T;
		}) as (t: number) => T;
	}

	if (type === 'number') {
		const delta = (b as number) - (a as number);
		return ((t: number) => (a as number) + t * delta) as (t: number) => T;
	}

	return () => b;
};
