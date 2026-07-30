import { useMemo } from 'react';
import { aphorisms } from '@any-tdf/site-common/data';

interface AphorismType {
	text: string;
	from: string;
	fromItalic?: boolean;
}

export interface AphorismProps {
	num?: number;
	compact?: boolean;
}

const Aphorism: React.FC<AphorismProps> = ({ num = 0, compact = false }) => {
	// 创建稳定的 key 值
	const createStableKey = (text: string, from: string) => {
		// 使用文本内容和出处的组合创建简单的哈希
		const combined = `${text.slice(0, 20)}${from.slice(0, 10)}`;
		let hash = 0;
		for (let i = 0; i < combined.length; i++) {
			const char = combined.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // 转换为32位整数
		}
		return Math.abs(hash).toString(36);
	};

	// 从 aphorisms 随机取出 num 条数据
	const aphorismsList = useMemo(() => {
		if (num <= 0) return [];
		return [...aphorisms].sort(() => Math.random() - 0.5).slice(0, num);
	}, [num]);

	if (num <= 0) {
		return null;
	}

	return (
		<div className={`${compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5`}>
			{aphorismsList.map((item: AphorismType) => (
				<div key={createStableKey(item.text, item.from)} className={num > 1 ? 'py-6' : ''}>
					<div className="text-justify text-sm">{item.text}</div>
					<div className={`mt-1 text-right ${item.fromItalic ? 'italic' : ''}`}>{item.from}</div>
				</div>
			))}
		</div>
	);
};

export default Aphorism;
