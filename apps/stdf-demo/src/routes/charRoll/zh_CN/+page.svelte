<!-- CharRoll Demo -->
<script lang="ts">
	import { CharRoll, Button } from 'stdf';

	type CharRollInstance = { start: () => void; pause: () => void; reset: () => void };
	let charRollRef: CharRollInstance;

	// 基础数值
	let basicValue = $state(12345);

	// 金额数值
	let moneyValue = $state(9876543.21);

	// 随机数值
	let randomValue = $state(88888);

	// 老虎机数值
	let slotValue = $state('🍒🍒🍒');

	// 字母值
	let letterValue = $state('STDF');

	// 验证码
	let codeValue = $state('A3F8');

	// 二进制
	let binaryValue = $state('1010');

	// 十六进制
	let hexValue = $state('FF5733');

	// 滚动方向示例值
	let directionValue = $state(12345);

	// 错开动画示例值
	let staggerValue = $state('HELLO');
	let staggerNormalRef = $state<CharRollInstance>();
	let staggerDelayRef = $state<CharRollInstance>();

	// 中文祝福语
	const blessChars = '福禄寿喜财吉祥如意平安健康幸福快乐';
	let blessValue = $state('福禄寿喜');

	// 中文成语
	const idiomChars = '龙马精神虎虎生威一帆风顺万事如意心想事成';
	let idiomValue = $state('龙马精神');

	// 自定义字符集 - 表情符号
	const emojiChars = '😀😃😄😁😆😅🤣😂🙂😊😇😎🤩🥳🎉🎊';
	let emojiValue = $state('😀😎🎉');

	// 自定义字符集 - 中文数字
	const chineseNumChars = '零一二三四五六七八九';
	let chineseNumValue = $state('一二三');

	// 前缀后缀
	let prefixSuffixValue = $state(1234);
	let percentValue = $state(85);

	// 不同字体大小
	let fontSizeValue = $state('STDF');

	// 生成随机数
	const generateRandom = () => {
		randomValue = Math.floor(Math.random() * 100000);
	};

	// 老虎机效果
	const slotSymbols = ['🍒', '🍋', '🍊', '🔔', '💎', '🍀', '⭐', '🎰'];
	const spinSlot = () => {
		slotValue =
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)] +
			slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
	};

	// 生成随机字母
	const generateRandomLetter = () => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		letterValue = Array(4)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * 26)])
			.join('');
	};

	// 生成随机验证码
	const generateCode = () => {
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		codeValue = Array(4)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * chars.length)])
			.join('');
	};

	// 生成随机二进制
	const generateBinary = () => {
		binaryValue = Array(4)
			.fill(0)
			.map(() => Math.round(Math.random()).toString())
			.join('');
	};

	// 生成随机十六进制
	const generateHex = () => {
		const chars = '0123456789ABCDEF';
		hexValue = Array(6)
			.fill(0)
			.map(() => chars[Math.floor(Math.random() * 16)])
			.join('');
	};

	// 生成随机方向值
	const generateDirectionValue = () => {
		directionValue = Math.floor(Math.random() * 100000);
	};

	// 生成随机错开值
	const generateStaggerValue = () => {
		staggerNormalRef?.start();
		staggerDelayRef?.start();
	};

	// 生成随机祝福语
	const generateRandomBless = () => {
		blessValue = Array(4)
			.fill(0)
			.map(() => blessChars[Math.floor(Math.random() * blessChars.length)])
			.join('');
	};

	// 生成随机成语
	const generateRandomIdiom = () => {
		const idioms = ['龙马精神', '虎虎生威', '一帆风顺', '万事如意', '心想事成'];
		idiomValue = idioms[Math.floor(Math.random() * idioms.length)];
	};

	// 生成随机表情符号
	const generateRandomEmoji = () => {
		const emojiArr = Array.from(emojiChars);
		emojiValue = Array(3)
			.fill(0)
			.map(() => emojiArr[Math.floor(Math.random() * emojiArr.length)])
			.join('');
	};

	// 生成随机中文数字
	const generateRandomChineseNum = () => {
		const numArr = Array.from(chineseNumChars);
		chineseNumValue = Array(3)
			.fill(0)
			.map(() => numArr[Math.floor(Math.random() * numArr.length)])
			.join('');
	};

	// 生成随机前缀后缀值
	const generatePrefixSuffixValue = () => {
		prefixSuffixValue = Math.floor(Math.random() * 9000) + 1000;
		percentValue = Math.floor(Math.random() * 100);
	};

	// 生成随机字体大小示例值
	const generateFontSizeValue = () => {
		const words = ['STDF', 'DEMO', 'TEST', 'COOL', 'NICE'];
		fontSizeValue = words[Math.floor(Math.random() * words.length)];
	};

	// 自定义样式
	let customNumberValue = $state(123456);
	let customLetterValue = $state('STDF');

	// 生成随机自定义样式值
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
	<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">数字滚动</span>
		<CharRoll value={basicValue} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => (basicValue += 100)}>+100</Button>
		<Button size="sm" fill="line" onclick={() => (basicValue -= 100)}>-100</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">字母滚动</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">大写字母</span>
		<CharRoll value={letterValue} preset="letterUpper" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomLetter}>随机字母</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">验证码效果</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">字母数字混合</span>
		<CharRoll value={codeValue} preset="alphanumeric" duration={1500} stagger={100} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateCode}>刷新验证码</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">二进制滚动</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">01</span>
		<CharRoll value={binaryValue} preset="binary" loops={3} prefix="0b" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateBinary}>随机生成</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">十六进制滚动</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">0-F</span>
		<CharRoll value={hexValue} preset="hexUpper" prefix="#" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateHex}>随机颜色</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">金额格式</div>
	<div class="p-4">
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">千分位 + 小数</div>
		<CharRoll value={moneyValue} separator decimal={2} prefix="¥" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => (moneyValue += 1234.56)}>+1234.56</Button>
		<Button size="sm" fill="line" onclick={() => (moneyValue = Math.max(0, moneyValue - 1234.56))}>-1234.56</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">滚动方向</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">向上滚动</span>
		<CharRoll value={directionValue} direction="up" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">向下滚动</span>
		<CharRoll value={directionValue} direction="down" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateDirectionValue}>重新滚动</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">循环圈数</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">1 圈</span>
		<CharRoll value={randomValue} loops={1} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">3 圈</span>
		<CharRoll value={randomValue} loops={3} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandom}>生成随机数</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">错开动画</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">无错开</span>
		<CharRoll value={staggerValue} preset="letterUpper" stagger={0} bind:this={staggerNormalRef} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">错开 100ms</span>
		<CharRoll value={staggerValue} preset="letterUpper" stagger={100} bind:this={staggerDelayRef} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateStaggerValue}>重新滚动</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">手动控制</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">手动触发</span>
		<CharRoll value="ABCD" preset="letterUpper" autoStart={false} duration={10000} loops={5} bind:this={charRollRef} />
	</div>
	<div class="p-4 text-sm text-gray-500 dark:text-gray-400">动画时长 10 秒，暂停时自动对齐到完整字符</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => charRollRef?.start()}>开始</Button>
		<Button size="sm" fill="line" onclick={() => charRollRef?.pause()}>暂停</Button>
		<Button size="sm" fill="line" onclick={() => charRollRef?.reset()}>重置</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">循环播放</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">每 3 秒循环</span>
		<CharRoll value="LOOP" preset="letterUpper" loop loopInterval={3000} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">自定义样式</div>
	<div class="p-4">
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">主题色背景</div>
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
		<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">卡片阴影</div>
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
		<Button size="sm" onclick={generateCustomValues}>随机生成</Button>
	</div>
	<div class="p-4">
		<div class="mb-3 text-sm text-gray-600 dark:text-gray-400">老虎机（使用 backOut 缓动产生回滚效果）</div>
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
		easing 可选值：linear、cubicOut（默认）、backOut（回弹）、elasticOut（弹性）、bounceOut（弹跳）等
	</div>
	<div class="flex justify-center gap-2 p-4">
		<Button size="md" onclick={spinSlot}>拉杆</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">自定义字符集</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">表情符号</span>
		<CharRoll value={emojiValue} charSet={emojiChars} height={48} fontSize="3xl" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomEmoji}>随机</Button>
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">中文数字</span>
		<CharRoll value={chineseNumValue} charSet={chineseNumChars} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomChineseNum}>随机</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">中文字符滚动</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">祝福语</span>
		<CharRoll value={blessValue} charSet={blessChars} height={48} fontSize="2xl" duration={1200} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomBless}>随机祝福</Button>
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">成语</span>
		<CharRoll value={idiomValue} charSet={idiomChars} height={48} fontSize="2xl" duration={1500} stagger={150} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateRandomIdiom}>随机成语</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">前缀后缀</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">带单位</span>
		<CharRoll value={prefixSuffixValue} prefix="共 " suffix=" 人" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">百分比</span>
		<CharRoll value={percentValue} suffix="%" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generatePrefixSuffixValue}>随机生成</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">不同字体大小</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">小号</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="sm" height={24} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">中号</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="lg" height={32} />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">大号</span>
		<CharRoll value={fontSizeValue} preset="letterUpper" fontSize="2xl" height={48} />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={generateFontSizeValue}>随机生成</Button>
	</div>
</div>
