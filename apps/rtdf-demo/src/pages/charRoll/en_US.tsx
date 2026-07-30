import { useRef, useState } from 'react';
import { Button, CharRoll } from 'rtdf/components';
import type { CharRollRef } from 'rtdf/components';

const emojiChars = '😀😃😄😁😆😅🤣😂🙂😊😇😎🤩🥳🎉🎊';
const chineseNumChars = '零一二三四五六七八九';
const slotSymbols = ['🍒', '🍋', '🍊', '🔔', '💎', '🍀', '⭐', '🎰'];

function CharRollEn() {
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
	const [greetingValue, setGreetingValue] = useState('LOVE');
	const [phraseValue, setPhraseValue] = useState('HAPPY');
	const [emojiValue, setEmojiValue] = useState('😀😎🎉');
	const [chineseNumValue, setChineseNumValue] = useState('一二三');
	const [prefixSuffixValue, setPrefixSuffixValue] = useState(1234);
	const [percentValue, setPercentValue] = useState(85);
	const [fontSizeValue, setFontSizeValue] = useState('RTDF');
	const [directionValue, setDirectionValue] = useState(12345);
	const [staggerValue] = useState('HELLO');
	const [customNumberValue, setCustomNumberValue] = useState(123456);
	const [customLetterValue, setCustomLetterValue] = useState('RTDF');

	const greetingWords = ['LOVE', 'HOPE', 'LUCK', 'WISH', 'GOOD', 'BEST', 'LIFE', 'NICE'];
	const phrases = ['HAPPY', 'PEACE', 'CHEER', 'SWEET', 'DREAM'];

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

	const generateRandomGreeting = () => {
		setGreetingValue(greetingWords[Math.floor(Math.random() * greetingWords.length)]);
	};

	const generateRandomPhrase = () => {
		setPhraseValue(phrases[Math.floor(Math.random() * phrases.length)]);
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

	const generateDirectionValue = () => setDirectionValue(Math.floor(Math.random() * 100000));

	const generateStaggerValue = () => {
		staggerNormalRef.current?.start();
		staggerDelayRef.current?.start();
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
			<div className="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Number Roll</span>
				<CharRoll value={basicValue} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => setBasicValue((prev) => prev + 100)}>
					+100
				</Button>
				<Button size="sm" fill="line" onClick={() => setBasicValue((prev) => prev - 100)}>
					-100
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Letter Roll</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Uppercase Letters</span>
				<CharRoll value={letterValue} preset="letterUpper" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomLetter}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Verification Code</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Alphanumeric</span>
				<CharRoll value={codeValue} preset="alphanumeric" duration={1500} stagger={100} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateCode}>
					Refresh
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Binary Roll</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">01</span>
				<CharRoll value={binaryValue} preset="binary" loops={3} prefix="0b" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateBinary}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Hexadecimal Roll</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">0-F</span>
				<CharRoll value={hexValue} preset="hexUpper" prefix="#" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateHex}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Money Format</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Separator + Decimal</div>
				<CharRoll value={moneyValue} separator decimal={2} prefix="$" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => setMoneyValue((prev) => prev + 1234.56)}>
					+1234.56
				</Button>
				<Button size="sm" fill="line" onClick={() => setMoneyValue((prev) => Math.max(0, prev - 1234.56))}>
					-1234.56
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Scroll Direction</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Scroll Up</span>
				<CharRoll value={directionValue} direction="up" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Scroll Down</span>
				<CharRoll value={directionValue} direction="down" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateDirectionValue}>
					Roll Again
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Loops</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">1 Cycle</span>
				<CharRoll value={randomValue} loops={1} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">3 Cycles</span>
				<CharRoll value={randomValue} loops={3} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandom}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Stagger Animation</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">No Stagger</span>
				<CharRoll value={staggerValue} preset="letterUpper" stagger={0} ref={staggerNormalRef} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Stagger 100ms</span>
				<CharRoll value={staggerValue} preset="letterUpper" stagger={100} ref={staggerDelayRef} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateStaggerValue}>
					Roll Again
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Manual Control</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Manual Trigger</span>
				<CharRoll value="ABCD" preset="letterUpper" autoStart={false} duration={10000} loops={5} ref={charRollRef} />
			</div>
			<div className="p-4 text-sm text-gray-500 dark:text-gray-400">10s duration, auto snap to complete character on pause</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => charRollRef.current?.start()}>
					Start
				</Button>
				<Button size="sm" fill="line" onClick={() => charRollRef.current?.pause()}>
					Pause
				</Button>
				<Button size="sm" fill="line" onClick={() => charRollRef.current?.reset()}>
					Reset
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Loop Animation</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Loop every 3s</span>
				<CharRoll value="LOOP" preset="letterUpper" loop loopInterval={3000} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Custom Style</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Theme Background</div>
				<CharRoll value={customNumberValue} height={48} fontSize="3xl" fontWeight="bold" bg="theme" radius="lg" gap="2" charClass="px-2" />
			</div>
			<div className="p-4">
				<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Card Shadow</div>
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
					Random
				</Button>
			</div>
			<div className="p-4">
				<div className="mb-3 text-sm text-gray-600 dark:text-gray-400">Slot Machine (using backOut easing for bounce effect)</div>
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
				easing options: linear, cubicOut (default), backOut (bounce), elasticOut (elastic), bounceOut, etc.
			</div>
			<div className="flex justify-center gap-2 p-4">
				<Button size="md" onClick={spinSlot}>
					Pull
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Custom Character Set</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Emoji</span>
				<CharRoll value={emojiValue} charSet={emojiChars} height={48} fontSize="3xl" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomEmoji}>
					Random
				</Button>
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Chinese Numbers</span>
				<CharRoll value={chineseNumValue} charSet={chineseNumChars} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomChineseNum}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Word Rolling</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Greetings</span>
				<CharRoll value={greetingValue} preset="letterUpper" height={48} fontSize="2xl" duration={1200} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomGreeting}>
					Random
				</Button>
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Phrases</span>
				<CharRoll value={phraseValue} preset="letterUpper" height={48} fontSize="2xl" duration={1500} stagger={150} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateRandomPhrase}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Prefix & Suffix</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">With Unit</span>
				<CharRoll value={prefixSuffixValue} prefix="$" suffix=" USD" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Percentage</span>
				<CharRoll value={percentValue} suffix="%" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generatePrefixSuffixValue}>
					Random
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Font Sizes</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Small</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="sm" height={24} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Medium</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="lg" height={32} />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">Large</span>
				<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="2xl" height={48} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={generateFontSizeValue}>
					Random
				</Button>
			</div>
		</div>
	);
}

export default CharRollEn;
