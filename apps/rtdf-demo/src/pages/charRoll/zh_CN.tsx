import { useRef, useState } from 'react';
import { Button, CharRoll } from 'rtdf/components';
import type { CharRollRef } from 'rtdf/components';

const blessChars = '福禄寿喜财吉祥如意平安健康幸福快乐';
const idiomChars = '龙马精神虎虎生威一帆风顺万事如意心想事成';
const emojiChars = '😀😃😄😁😆😅🤣😂🙂😊😇😎🤩🥳🎉🎊';
const chineseNumChars = '零一二三四五六七八九';
const slotSymbols = ['🍒', '🍋', '🍊', '🔔', '💎', '🍀', '⭐', '🎰'];

function CharRollZh() {
	const charRollRef = useRef<CharRollRef | null>(null);
	const staggerNormalRef = useRef<CharRollRef | null>(null);
	const staggerDelayRef = useRef<CharRollRef | null>(null);

	const [basicValue, setBasicValue] = useState(12345);
	const [moneyValue, setMoneyValue] = useState(9876543.21);
	const [randomValue, setRandomValue] = useState(88888);
	const [slotValue, setSlotValue] = useState('🍒🍒🍒');
	const [letterValue, setLetterValue] = useState('RTDF');
	const [codeValue, setCodeValue] = useState('A3F8');
	const [binaryValue, setBinaryValue] = useState('1010');
	const [hexValue, setHexValue] = useState('FF5733');
	const [directionValue, setDirectionValue] = useState(12345);
	const [staggerValue] = useState('HELLO');
	const [blessValue, setBlessValue] = useState('福禄寿喜');
	const [idiomValue, setIdiomValue] = useState('龙马精神');
	const [emojiValue, setEmojiValue] = useState('😀😎🎉');
	const [chineseNumValue, setChineseNumValue] = useState('一二三');
	const [prefixSuffixValue, setPrefixSuffixValue] = useState(1234);
	const [percentValue, setPercentValue] = useState(85);
	const [fontSizeValue, setFontSizeValue] = useState('RTDF');
	const [customNumberValue, setCustomNumberValue] = useState(123456);
	const [customLetterValue, setCustomLetterValue] = useState('RTDF');

	const generateRandom = () => setRandomValue(Math.floor(Math.random() * 100000));

	const spinSlot = () => {
		setSlotValue(
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
				slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
				slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
		);
	};

	const generateRandomLetter = () => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		setLetterValue(
			Array(4)
				.fill(0)
				.map(() => chars[Math.floor(Math.random() * 26)])
				.join('')
		);
	};

	const generateCode = () => {
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		setCodeValue(
			Array(4)
				.fill(0)
				.map(() => chars[Math.floor(Math.random() * chars.length)])
				.join('')
		);
	};

	const generateBinary = () => {
		setBinaryValue(
			Array(4)
				.fill(0)
				.map(() => Math.round(Math.random()).toString())
				.join('')
		);
	};

	const generateHex = () => {
		const chars = '0123456789ABCDEF';
		setHexValue(
			Array(6)
				.fill(0)
				.map(() => chars[Math.floor(Math.random() * 16)])
				.join('')
		);
	};

	const generateDirectionValue = () => setDirectionValue(Math.floor(Math.random() * 100000));

	const generateStaggerValue = () => {
		staggerNormalRef.current?.start();
		staggerDelayRef.current?.start();
	};

	const generateRandomBless = () => {
		setBlessValue(
			Array(4)
				.fill(0)
				.map(() => blessChars[Math.floor(Math.random() * blessChars.length)])
				.join('')
		);
	};

	const generateRandomIdiom = () => {
		const idioms = ['龙马精神', '虎虎生威', '一帆风顺', '万事如意', '心想事成'];
		setIdiomValue(idioms[Math.floor(Math.random() * idioms.length)]);
	};

	const generateRandomEmoji = () => {
		const emojiArr = Array.from(emojiChars);
		setEmojiValue(
			Array(3)
				.fill(0)
				.map(() => emojiArr[Math.floor(Math.random() * emojiArr.length)])
				.join('')
		);
	};

	const generateRandomChineseNum = () => {
		const numArr = Array.from(chineseNumChars);
		setChineseNumValue(
			Array(3)
				.fill(0)
				.map(() => numArr[Math.floor(Math.random() * numArr.length)])
				.join('')
		);
	};

	const generatePrefixSuffixValue = () => {
		setPrefixSuffixValue(Math.floor(Math.random() * 9000) + 1000);
		setPercentValue(Math.floor(Math.random() * 100));
	};

	const generateFontSizeValue = () => {
		const words = ['RTDF', 'DEMO', 'TEST', 'COOL', 'NICE'];
		setFontSizeValue(words[Math.floor(Math.random() * words.length)]);
	};

	const generateCustomValues = () => {
		setCustomNumberValue(Math.floor(Math.random() * 900000) + 100000);
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		setCustomLetterValue(
			Array(4)
				.fill(0)
				.map(() => chars[Math.floor(Math.random() * 26)])
				.join('')
		);
	};

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">基础用法</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">数字滚动</span>
				<CharRoll value={basicValue} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => setBasicValue((prev) => prev + 100)}>
					+100
				</Button>
				<Button size="sm" fill="lineState" onClick={() => setBasicValue((prev) => prev - 100)}>
					-100
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">字母滚动</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">大写字母</span>
				<CharRoll value={letterValue} preset="letterUpper" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomLetter}>
					随机字母
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">验证码效果</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">字母数字混合</span>
				<CharRoll value={codeValue} preset="alphanumeric" duration={1500} stagger={100} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateCode}>
					刷新验证码
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">二进制滚动</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">01</span>
				<CharRoll value={binaryValue} preset="binary" loops={3} prefix="0b" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateBinary}>
					随机生成
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">十六进制滚动</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">0-F</span>
				<CharRoll value={hexValue} preset="hexUpper" prefix="#" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateHex}>
					随机颜色
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">金额格式</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">千分位 + 小数</div>
				<CharRoll value={moneyValue} separator decimal={2} prefix="¥" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => setMoneyValue((prev) => prev + 1234.56)}>
					+1234.56
				</Button>
				<Button size="sm" fill="lineState" onClick={() => setMoneyValue((prev) => Math.max(0, prev - 1234.56))}>
					-1234.56
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">滚动方向</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">向上滚动</span>
				<CharRoll value={directionValue} direction="up" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">向下滚动</span>
				<CharRoll value={directionValue} direction="down" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateDirectionValue}>
					重新滚动
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">循环圈数</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">1 圈</span>
				<CharRoll value={randomValue} loops={1} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">3 圈</span>
				<CharRoll value={randomValue} loops={3} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandom}>
					生成随机数
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">错开动画</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">无错开</span>
				<CharRoll value={staggerValue} preset="letterUpper" stagger={0} ref={staggerNormalRef} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">错开 100 ms</span>
				<CharRoll value={staggerValue} preset="letterUpper" stagger={100} ref={staggerDelayRef} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateStaggerValue}>
					重新滚动
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">手动控制</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">手动触发</span>
				<CharRoll value="ABCD" preset="letterUpper" autoStart={false} duration={10000} loops={5} ref={charRollRef} />
			</div>
			<div className="p-4 text-sm text-gray-500 dark:text-gray-400">动画时长 10 秒，暂停时自动对齐到完整字符</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => charRollRef.current?.start()}>
					开始
				</Button>
				<Button size="sm" fill="lineState" onClick={() => charRollRef.current?.pause()}>
					暂停
				</Button>
				<Button size="sm" fill="lineState" onClick={() => charRollRef.current?.reset()}>
					重置
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">循环播放</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">每 3 秒循环</span>
				<CharRoll value="LOOP" preset="letterUpper" loop loopInterval={3000} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">自定义样式</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">主题色背景</div>
				<CharRoll value={customNumberValue} height={48} fontSize="3xl" fontWeight="bold" bg="theme" radius="lg" gap="2" charClass="px-2" />
			</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">卡片阴影</div>
				<CharRoll
					value={customLetterValue}
					preset="letterUpper"
					height={56}
					fontSize="4xl"
					fontWeight="bold"
					bg="surface"
					radius="xl"
					gap="3"
					charClass="px-3 shadow-md"
				/>
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateCustomValues}>
					随机生成
				</Button>
			</div>
			<div className="p-4">
				<div className="mb-3 text-sm text-gray-600 dark:text-gray-400">老虎机（使用 backOut 缓动产生回滚效果）</div>
				<div className="flex items-center justify-center rounded-2xl bg-linear-to-b from-yellow-600 to-yellow-800 p-4 shadow-xl">
					<div className="rounded-xl bg-black/80 p-3">
						<CharRoll
							value={slotValue}
							charSet="🍒🍋🍊🔔💎🍀⭐🎰"
							height={72}
							fontSize="4xl"
							fontWeight="bold"
							bg="surface"
							radius="lg"
							gap="2"
							charClass="px-3 border-2 border-yellow-500/50"
							duration={2000}
							stagger={300}
							loops={3}
							easing="backOut"
						/>
					</div>
				</div>
			</div>
			<div className="p-4 text-sm text-gray-500 dark:text-gray-400">
				easing 可选值： linear、cubicOut（默认）、backOut（回弹）、elasticOut（弹性）、bounceOut（弹跳）等
			</div>
			<div className="flex justify-center gap-2 p-4">
				<Button size="md" onClick={spinSlot}>
					拉杆
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">自定义字符集</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">表情符号</span>
				<CharRoll value={emojiValue} charSet={emojiChars} height={48} fontSize="3xl" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomEmoji}>
					随机
				</Button>
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">中文数字</span>
				<CharRoll value={chineseNumValue} charSet={chineseNumChars} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomChineseNum}>
					随机
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">中文字符滚动</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">祝福语</span>
				<CharRoll value={blessValue} charSet={blessChars} height={48} fontSize="2xl" duration={1200} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomBless}>
					随机祝福
				</Button>
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">成语</span>
				<CharRoll value={idiomValue} charSet={idiomChars} height={48} fontSize="2xl" duration={1500} stagger={150} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomIdiom}>
					随机成语
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">前缀后缀</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">带单位</span>
				<CharRoll value={prefixSuffixValue} prefix="共 " suffix=" 人" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">百分比</span>
				<CharRoll value={percentValue} suffix="%" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generatePrefixSuffixValue}>
					随机生成
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">不同字体大小</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">小号</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="sm" height={24} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">中号</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="lg" height={32} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">大号</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="2xl" height={48} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateFontSizeValue}>
					随机生成
				</Button>
			</div>
		</div>
	);
}

export default CharRollZh;
