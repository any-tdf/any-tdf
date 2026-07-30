<!-- CharRoll Demo -->
<script lang="ts">
	import { CharRoll, Button } from 'stdf';

	type CharRollInstance = { start: () => void; pause: () => void; reset: () => void };
	let charRollRef: CharRollInstance;

	// Basic value
	let basicValue = $state(12345);

	// Money value
	let moneyValue = $state(9876543.21);

	// Random value
	let randomValue = $state(88888);

	// Slot value
	let slotValue = $state('🍒🍒🍒');

	// Letter value
	let letterValue = $state('STDF');

	// Verification code
	let codeValue = $state('A3F8');

	// Binary
	let binaryValue = $state('1010');

	// Hexadecimal
	let hexValue = $state('FF5733');

	// English greetings
	const greetingWords = ['LOVE', 'HOPE', 'LUCK', 'WISH', 'GOOD', 'BEST', 'LIFE', 'NICE'];
	let greetingValue = $state('LOVE');

	// English phrases
	const phrases = ['HAPPY', 'PEACE', 'CHEER', 'SWEET', 'DREAM'];
	let phraseValue = $state('HAPPY');

	// Custom charset - Emoji
	const emojiChars = '😀😃😄😁😆😅🤣😂🙂😊😇😎🤩🥳🎉🎊';
	let emojiValue = $state('😀😎🎉');

	// Custom charset - Chinese numbers
	const chineseNumChars = '零一二三四五六七八九';
	let chineseNumValue = $state('一二三');

	// Prefix & Suffix
	let prefixSuffixValue = $state(1234);
	let percentValue = $state(85);

	// Font sizes
	let fontSizeValue = $state('STDF');

	// Direction demo value
	let directionValue = $state(12345);

	// Stagger demo value
	let staggerValue = $state('HELLO');
	let staggerNormalRef = $state<CharRollInstance>();
	let staggerDelayRef = $state<CharRollInstance>();

	// Generate random number
	const generateRandom = () => {
		randomValue = Math.floor(Math.random() * 100000);
	};

	// Slot machine effect
	const slotSymbols = ['🍒', '🍋', '🍊', '🔔', '💎', '🍀', '⭐', '🎰'];
	const spinSlot = () => {
		slotValue =
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
	};

	// Generate random letters
	const generateRandomLetter = () => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		letterValue = Array(4)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * 26)])
			.join('');
	};

	// Generate random code
	const generateCode = () => {
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		codeValue = Array(4)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * chars.length)])
			.join('');
	};

	// Generate random binary
	const generateBinary = () => {
		binaryValue = Array(4)
			.fill(0)
			.map(() => Math.round(Math.random()).toString())
			.join('');
	};

	// Generate random hex
	const generateHex = () => {
		const chars = '0123456789ABCDEF';
		hexValue = Array(6)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * 16)])
			.join('');
	};

	// Generate random greeting
	const generateRandomGreeting = () => {
		greetingValue = greetingWords[Math.floor(Math.random() * greetingWords.length)];
	};

	// Generate random phrase
	const generateRandomPhrase = () => {
		phraseValue = phrases[Math.floor(Math.random() * phrases.length)];
	};

	// Generate random emoji
	const generateRandomEmoji = () => {
		const emojiArr = Array.from(emojiChars);
		emojiValue = Array(3)
			.fill(0)
			.map(() => emojiArr[Math.floor(Math.random() * emojiArr.length)])
			.join('');
	};

	// Generate random Chinese number
	const generateRandomChineseNum = () => {
		const numArr = Array.from(chineseNumChars);
		chineseNumValue = Array(3)
			.fill(0)
			.map(() => numArr[Math.floor(Math.random() * numArr.length)])
			.join('');
	};

	// Generate random prefix suffix value
	const generatePrefixSuffixValue = () => {
		prefixSuffixValue = Math.floor(Math.random() * 9000) + 1000;
		percentValue = Math.floor(Math.random() * 100);
	};

	// Generate random font size value
	const generateFontSizeValue = () => {
		const words = ['STDF', 'DEMO', 'TEST', 'COOL', 'NICE'];
		fontSizeValue = words[Math.floor(Math.random() * words.length)];
	};

	// Generate direction value
	const generateDirectionValue = () => {
		directionValue = Math.floor(Math.random() * 100000);
	};

	// Generate stagger value
	const generateStaggerValue = () => {
		staggerNormalRef?.start();
		staggerDelayRef?.start();
	};

	// Custom style
	let customNumberValue = $state(123456);
	let customLetterValue = $state('STDF');

	// Generate random custom style values
	const generateCustomValues = () => {
		customNumberValue = Math.floor(Math.random() * 900000) + 100000;
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		customLetterValue = Array(4)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * 26)])
			.join('');
	};
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Number Roll</span>
		<CharRoll value={basicValue} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => (basicValue += 100)}>+100</Button>
		<Button size="sm" fill="line" onclick={() => (basicValue -= 100)}>-100</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Letter Roll</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Uppercase Letters</span>
		<CharRoll value={letterValue} preset="letterUpper" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomLetter}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Verification Code</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Alphanumeric</span>
		<CharRoll value={codeValue} preset="alphanumeric" duration={1500} stagger={100} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateCode}>Refresh</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Binary Roll</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">01</span>
		<CharRoll value={binaryValue} preset="binary" loops={3} prefix="0b" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateBinary}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Hexadecimal Roll</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">0-F</span>
		<CharRoll value={hexValue} preset="hexUpper" prefix="#" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateHex}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Money Format</div>
	<div class="p-4">
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">Separator + Decimal</div>
		<CharRoll value={moneyValue} separator decimal={2} prefix="$" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => (moneyValue += 1234.56)}>+1234.56</Button>
		<Button size="sm" fill="line" onclick={() => (moneyValue = Math.max(0, moneyValue - 1234.56))}>-1234.56</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Scroll Direction</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Scroll Up</span>
		<CharRoll value={directionValue} direction="up" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Scroll Down</span>
		<CharRoll value={directionValue} direction="down" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateDirectionValue}>Roll Again</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Loops</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">1 Cycle</span>
		<CharRoll value={randomValue} loops={1} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">3 Cycles</span>
		<CharRoll value={randomValue} loops={3} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandom}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Stagger Animation</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">No Stagger</span>
		<CharRoll value={staggerValue} preset="letterUpper" stagger={0} bind:this={staggerNormalRef} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Stagger 100ms</span>
		<CharRoll value={staggerValue} preset="letterUpper" stagger={100} bind:this={staggerDelayRef} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateStaggerValue}>Roll Again</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Manual Control</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Manual Trigger</span>
		<CharRoll value="ABCD" preset="letterUpper" autoStart={false} duration={10000} loops={5} bind:this={charRollRef} />
	</div>
	<div class="p-4 text-sm text-gray-500 dark:text-gray-400">10s duration, auto snap to complete character on pause</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => charRollRef?.start()}>Start</Button>
		<Button size="sm" fill="line" onclick={() => charRollRef?.pause()}>Pause</Button>
		<Button size="sm" fill="line" onclick={() => charRollRef?.reset()}>Reset</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Loop Animation</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Loop every 3s</span>
		<CharRoll value="LOOP" preset="letterUpper" loop loopInterval={3000} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Style</div>
	<div class="p-4">
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">Theme Background</div>
		<CharRoll
			value={customNumberValue}
			height={48}
			fontSize="3xl"
			fontWeight="bold"
			bg="theme"
			radius="lg"
			gap="2"
			charClass="px-2"
		/>
	</div>
	<div class="p-4">
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">Card Shadow</div>
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
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateCustomValues}>Random</Button>
	</div>
	<div class="p-4">
		<div class="mb-3 text-sm text-gray-600 dark:text-gray-400">Slot Machine (using backOut easing for bounce effect)</div>
		<div class="flex items-center justify-center rounded-2xl bg-linear-to-b from-yellow-600 to-yellow-800 p-4 shadow-xl">
			<div class="rounded-xl bg-black/80 p-3">
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
	<div class="p-4 text-sm text-gray-500 dark:text-gray-400">
		easing options: linear, cubicOut (default), backOut (bounce), elasticOut (elastic), bounceOut, etc.
	</div>
	<div class="flex justify-center gap-2 p-4">
		<Button size="md" onclick={spinSlot}>Pull</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Character Set</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Emoji</span>
		<CharRoll value={emojiValue} charSet={emojiChars} height={48} fontSize="3xl" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomEmoji}>Random</Button>
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Chinese Numbers</span>
		<CharRoll value={chineseNumValue} charSet={chineseNumChars} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomChineseNum}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Word Rolling</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Greetings</span>
		<CharRoll value={greetingValue} preset="letterUpper" height={48} fontSize="2xl" duration={1200} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomGreeting}>Random</Button>
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Phrases</span>
		<CharRoll value={phraseValue} preset="letterUpper" height={48} fontSize="2xl" duration={1500} stagger={150} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomPhrase}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Prefix & Suffix</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">With Unit</span>
		<CharRoll value={prefixSuffixValue} prefix="$" suffix=" USD" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Percentage</span>
		<CharRoll value={percentValue} suffix="%" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generatePrefixSuffixValue}>Random</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Font Sizes</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Small</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="sm" height={24} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Medium</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="lg" height={32} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Large</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="2xl" height={48} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateFontSizeValue}>Random</Button>
	</div>
</div>
