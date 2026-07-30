import fs from 'node:fs';

export type WriteBuildTimeEnvOptions = {
	filePath?: string;
	enOffset?: number;
	zhOffset?: number;
	enVarName?: string;
	zhVarName?: string;
	log?: boolean;
};

const getLocalTime = (offsetHours: number) => {
	const d = new Date();
	const len = d.getTime();
	const offset = d.getTimezoneOffset() * 60000;
	const utcTime = len + offset;
	return new Date(utcTime + 3600000 * offsetHours);
};

const formatBuildTime = (date: Date, locale: string, gmt: string) => {
	const now = date.toLocaleString(locale, { hour12: false });
	return `${now.slice(0, -3)} ${gmt}`;
};

export const writeBuildTimeEnv = (options: WriteBuildTimeEnvOptions = {}) => {
	const {
		filePath = '.env',
		enOffset = -4,
		zhOffset = 8,
		enVarName = 'VITE_BUILD_TIME_EN',
		zhVarName = 'VITE_BUILD_TIME_ZH',
		log = true
	} = options;
	const now_en = formatBuildTime(getLocalTime(enOffset), 'en-US', `GMT${enOffset}`);
	const now_zh = formatBuildTime(getLocalTime(zhOffset), 'zh-CN', `GMT+${zhOffset}`);

	if (log) {
		console.log('now_en', now_en);
		console.log('now_zh', now_zh);
	}

	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}

	fs.writeFileSync(filePath, `${enVarName}=${now_en}\n${zhVarName}=${now_zh}`);

	return { now_en, now_zh };
};
