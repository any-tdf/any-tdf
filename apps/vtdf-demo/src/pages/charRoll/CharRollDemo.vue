<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, CharRoll } from 'vtdf';

type Locale = 'zh_CN' | 'en_US';
type CharRollExpose = {
	start: () => void;
	pause: () => void;
	reset: () => void;
};

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const emojiChars = '😀😃😄😁😆😅🤣😂🙂😊😇😎🤩🥳🎉🎊';
const chineseNumChars = '零一二三四五六七八九';
const slotSymbols = ['🍒', '🍋', '🍊', '🔔', '💎', '🍀', '⭐', '🎰'];
const blessChars = '福禄寿喜财吉祥如意平安健康幸福快乐';
const idiomChars = '龙马精神虎虎生威一帆风顺万事如意心想事成';
const greetingWords = ['LOVE', 'HOPE', 'LUCK', 'WISH', 'GOOD', 'BEST', 'LIFE', 'NICE'];
const phrases = ['HAPPY', 'PEACE', 'CHEER', 'SWEET', 'DREAM'];

const messages = {
	zh_CN: {
		basic: '基础用法',
		numberRoll: '数字滚动',
		letterRoll: '字母滚动',
		upperLetters: '大写字母',
		randomLetters: '随机字母',
		code: '验证码效果',
		alphanumeric: '字母数字混合',
		refreshCode: '刷新验证码',
		binary: '二进制滚动',
		random: '随机生成',
		hex: '十六进制滚动',
		randomColor: '随机颜色',
		money: '金额格式',
		moneyDesc: '千分位 + 小数',
		direction: '滚动方向',
		up: '向上滚动',
		down: '向下滚动',
		rollAgain: '重新滚动',
		loops: '循环圈数',
		oneLoop: '1 圈',
		threeLoops: '3 圈',
		stagger: '错开动画',
		noStagger: '无错开',
		stagger100: '错开 100 ms',
		manual: '手动控制',
		manualTrigger: '手动触发',
		manualDesc: '动画时长 10 秒，暂停时自动对齐到完整字符',
		start: '开始',
		pause: '暂停',
		reset: '重置',
		loop: '循环播放',
		loopDesc: '每 3 秒循环',
		customStyle: '自定义样式',
		themeBg: '主题色背景',
		cardShadow: '卡片阴影',
		slotMachine: '老虎机（使用 backOut 缓动产生回滚效果）',
		easingDesc: 'easing 可选值：linear、cubicOut（默认）、backOut（回弹）、elasticOut（弹性）、bounceOut（弹跳）等。',
		pull: '拉杆',
		customCharSet: '自定义字符集',
		emoji: '表情符号',
		chineseNumber: '中文数字',
		wordRoll: '中文字符滚动',
		greeting: '祝福语',
		randomBless: '随机祝福',
		phrase: '成语',
		randomPhrase: '随机成语',
		prefixSuffix: '前缀后缀',
		unit: '带单位',
		percent: '百分比',
		fontSizes: '不同字体大小',
		small: '小号',
		medium: '中号',
		large: '大号'
	},
	en_US: {
		basic: 'Basic Usage',
		numberRoll: 'Number Roll',
		letterRoll: 'Letter Roll',
		upperLetters: 'Uppercase Letters',
		randomLetters: 'Random',
		code: 'Verification Code',
		alphanumeric: 'Alphanumeric',
		refreshCode: 'Refresh',
		binary: 'Binary Roll',
		random: 'Random',
		hex: 'Hexadecimal Roll',
		randomColor: 'Random',
		money: 'Money Format',
		moneyDesc: 'Separator + Decimal',
		direction: 'Scroll Direction',
		up: 'Scroll Up',
		down: 'Scroll Down',
		rollAgain: 'Roll Again',
		loops: 'Loops',
		oneLoop: '1 Cycle',
		threeLoops: '3 Cycles',
		stagger: 'Stagger Animation',
		noStagger: 'No Stagger',
		stagger100: 'Stagger 100 ms',
		manual: 'Manual Control',
		manualTrigger: 'Manual Trigger',
		manualDesc: '10 s duration, auto snap to complete character on pause',
		start: 'Start',
		pause: 'Pause',
		reset: 'Reset',
		loop: 'Loop Animation',
		loopDesc: 'Loop every 3 s',
		customStyle: 'Custom Style',
		themeBg: 'Theme Background',
		cardShadow: 'Card Shadow',
		slotMachine: 'Slot Machine (using backOut easing for bounce effect)',
		easingDesc: 'easing options: linear, cubicOut (default), backOut (bounce), elasticOut (elastic), bounceOut, etc.',
		pull: 'Pull',
		customCharSet: 'Custom Character Set',
		emoji: 'Emoji',
		chineseNumber: 'Chinese Numbers',
		wordRoll: 'Word Rolling',
		greeting: 'Greetings',
		randomBless: 'Random',
		phrase: 'Phrases',
		randomPhrase: 'Random',
		prefixSuffix: 'Prefix & Suffix',
		unit: 'With Unit',
		percent: 'Percentage',
		fontSizes: 'Font Sizes',
		small: 'Small',
		medium: 'Medium',
		large: 'Large'
	}
};

const text = computed(() => messages[props.locale]);
const isZh = computed(() => props.locale === 'zh_CN');

const charRollRef = ref<CharRollExpose | null>(null);
const staggerNormalRef = ref<CharRollExpose | null>(null);
const staggerDelayRef = ref<CharRollExpose | null>(null);

const basicValue = ref(12345);
const moneyValue = ref(9876543.21);
const randomValue = ref(88888);
const slotValue = ref('🍒🍒🍒');
const letterValue = ref('VTDF');
const codeValue = ref('A3F8');
const binaryValue = ref('1010');
const hexValue = ref('FF5733');
const directionValue = ref(12345);
const staggerValue = ref('HELLO');
const blessValue = ref('福禄寿喜');
const idiomValue = ref('龙马精神');
const greetingValue = ref('LOVE');
const phraseValue = ref('HAPPY');
const emojiValue = ref('😀😎🎉');
const chineseNumValue = ref('一二三');
const prefixSuffixValue = ref(1234);
const percentValue = ref(85);
const fontSizeValue = ref('VTDF');
const customNumberValue = ref(123456);
const customLetterValue = ref('VTDF');

const randomFromArray = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const randomChars = (chars: string, length: number) => {
	const list = Array.from(chars);
	return Array.from({ length }, () => randomFromArray(list)).join('');
};

const generateRandom = () => {
	randomValue.value = Math.floor(Math.random() * 100000);
};

const spinSlot = () => {
	slotValue.value = Array.from({ length: 3 }, () => randomFromArray(slotSymbols)).join('');
};

const generateRandomLetter = () => {
	letterValue.value = randomChars('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
};

const generateCode = () => {
	codeValue.value = randomChars('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
};

const generateBinary = () => {
	binaryValue.value = Array.from({ length: 4 }, () => Math.round(Math.random()).toString()).join('');
};

const generateHex = () => {
	hexValue.value = randomChars('0123456789ABCDEF', 6);
};

const generateDirectionValue = () => {
	directionValue.value = Math.floor(Math.random() * 100000);
};

const generateStaggerValue = () => {
	staggerNormalRef.value?.start();
	staggerDelayRef.value?.start();
};

const generateRandomBless = () => {
	blessValue.value = randomChars(blessChars, 4);
};

const generateRandomIdiom = () => {
	const idioms = ['龙马精神', '虎虎生威', '一帆风顺', '万事如意', '心想事成'];
	idiomValue.value = randomFromArray(idioms);
};

const generateRandomGreeting = () => {
	greetingValue.value = randomFromArray(greetingWords);
};

const generateRandomPhrase = () => {
	phraseValue.value = randomFromArray(phrases);
};

const generateRandomEmoji = () => {
	emojiValue.value = randomChars(emojiChars, 3);
};

const generateRandomChineseNum = () => {
	chineseNumValue.value = randomChars(chineseNumChars, 3);
};

const generatePrefixSuffixValue = () => {
	prefixSuffixValue.value = Math.floor(Math.random() * 9000) + 1000;
	percentValue.value = Math.floor(Math.random() * 100);
};

const generateFontSizeValue = () => {
	fontSizeValue.value = randomFromArray(['VTDF', 'DEMO', 'TEST', 'COOL', 'NICE']);
};

const generateCustomValues = () => {
	customNumberValue.value = Math.floor(Math.random() * 900000) + 100000;
	customLetterValue.value = randomChars('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
};
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">{{ text.basic }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.numberRoll }}</span>
			<CharRoll :value="basicValue" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="basicValue += 100">+100</Button>
			<Button size="sm" fill="line" @click="basicValue -= 100">-100</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.letterRoll }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.upperLetters }}</span>
			<CharRoll :value="letterValue" preset="letterUpper" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateRandomLetter">{{ text.randomLetters }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.code }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.alphanumeric }}</span>
			<CharRoll :value="codeValue" preset="alphanumeric" :duration="1500" :stagger="100" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateCode">{{ text.refreshCode }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.binary }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">01</span>
			<CharRoll :value="binaryValue" preset="binary" :loops="3" prefix="0b" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateBinary">{{ text.random }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.hex }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">0-F</span>
			<CharRoll :value="hexValue" preset="hexUpper" prefix="#" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateHex">{{ text.randomColor }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.money }}</div>
		<div class="p-4">
			<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">{{ text.moneyDesc }}</div>
			<CharRoll :value="moneyValue" separator :decimal="2" :prefix="isZh ? '¥' : '$'" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="moneyValue += 1234.56">+1234.56</Button>
			<Button size="sm" fill="line" @click="moneyValue = Math.max(0, moneyValue - 1234.56)">-1234.56</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.direction }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.up }}</span>
			<CharRoll :value="directionValue" direction="up" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.down }}</span>
			<CharRoll :value="directionValue" direction="down" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateDirectionValue">{{ text.rollAgain }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.loops }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.oneLoop }}</span>
			<CharRoll :value="randomValue" :loops="1" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.threeLoops }}</span>
			<CharRoll :value="randomValue" :loops="3" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateRandom">{{ text.random }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.stagger }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.noStagger }}</span>
			<CharRoll ref="staggerNormalRef" :value="staggerValue" preset="letterUpper" :stagger="0" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.stagger100 }}</span>
			<CharRoll ref="staggerDelayRef" :value="staggerValue" preset="letterUpper" :stagger="100" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateStaggerValue">{{ text.rollAgain }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.manual }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.manualTrigger }}</span>
			<CharRoll ref="charRollRef" value="ABCD" preset="letterUpper" :auto-start="false" :duration="10000" :loops="5" />
		</div>
		<div class="p-4 text-sm text-gray-500 dark:text-gray-400">{{ text.manualDesc }}</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="charRollRef?.start()">{{ text.start }}</Button>
			<Button size="sm" fill="line" @click="charRollRef?.pause()">{{ text.pause }}</Button>
			<Button size="sm" fill="line" @click="charRollRef?.reset()">{{ text.reset }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.loop }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.loopDesc }}</span>
			<CharRoll value="LOOP" preset="letterUpper" loop :loop-interval="3000" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.customStyle }}</div>
		<div class="p-4">
			<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">{{ text.themeBg }}</div>
			<CharRoll
				:value="customNumberValue"
				:height="48"
				font-size="3xl"
				font-weight="bold"
				bg="theme"
				radius="lg"
				gap="2"
				char-class="px-2"
			/>
		</div>
		<div class="p-4">
			<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">{{ text.cardShadow }}</div>
			<CharRoll
				:value="customLetterValue"
				preset="letterUpper"
				:height="56"
				font-size="4xl"
				font-weight="bold"
				bg="surface"
				radius="xl"
				gap="3"
				char-class="px-3 shadow-md"
			/>
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateCustomValues">{{ text.random }}</Button>
		</div>
		<div class="p-4">
			<div class="mb-3 text-sm text-gray-600 dark:text-gray-400">{{ text.slotMachine }}</div>
			<div class="flex items-center justify-center rounded-2xl bg-linear-to-b from-yellow-600 to-yellow-800 p-4 shadow-xl">
				<div class="rounded-xl bg-black/80 p-3">
					<CharRoll
						:value="slotValue"
						char-set="🍒🍋🍊🔔💎🍀⭐🎰"
						:height="72"
						font-size="4xl"
						font-weight="bold"
						bg="surface"
						radius="lg"
						gap="2"
						char-class="px-3 border-2 border-yellow-500/50"
						:duration="2000"
						:stagger="300"
						:loops="3"
						easing="backOut"
					/>
				</div>
			</div>
		</div>
		<div class="p-4 text-sm text-gray-500 dark:text-gray-400">{{ text.easingDesc }}</div>
		<div class="flex justify-center gap-2 p-4">
			<Button size="md" @click="spinSlot">{{ text.pull }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.customCharSet }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.emoji }}</span>
			<CharRoll :value="emojiValue" :char-set="emojiChars" :height="48" font-size="3xl" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateRandomEmoji">{{ text.random }}</Button>
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.chineseNumber }}</span>
			<CharRoll :value="chineseNumValue" :char-set="chineseNumChars" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateRandomChineseNum">{{ text.random }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.wordRoll }}</div>
		<template v-if="isZh">
			<div class="flex items-center justify-between p-4">
				<span class="text-gray-600 dark:text-gray-400">{{ text.greeting }}</span>
				<CharRoll :value="blessValue" :char-set="blessChars" :height="48" font-size="2xl" :duration="1200" />
			</div>
			<div class="flex gap-2 p-4">
				<Button size="sm" @click="generateRandomBless">{{ text.randomBless }}</Button>
			</div>
			<div class="flex items-center justify-between p-4">
				<span class="text-gray-600 dark:text-gray-400">{{ text.phrase }}</span>
				<CharRoll :value="idiomValue" :char-set="idiomChars" :height="48" font-size="2xl" :duration="1500" :stagger="150" />
			</div>
			<div class="flex gap-2 p-4">
				<Button size="sm" @click="generateRandomIdiom">{{ text.randomPhrase }}</Button>
			</div>
		</template>
		<template v-else>
			<div class="flex items-center justify-between p-4">
				<span class="text-gray-600 dark:text-gray-400">{{ text.greeting }}</span>
				<CharRoll :value="greetingValue" preset="letterUpper" :height="48" font-size="2xl" :duration="1200" />
			</div>
			<div class="flex gap-2 p-4">
				<Button size="sm" @click="generateRandomGreeting">{{ text.randomBless }}</Button>
			</div>
			<div class="flex items-center justify-between p-4">
				<span class="text-gray-600 dark:text-gray-400">{{ text.phrase }}</span>
				<CharRoll :value="phraseValue" preset="letterUpper" :height="48" font-size="2xl" :duration="1500" :stagger="150" />
			</div>
			<div class="flex gap-2 p-4">
				<Button size="sm" @click="generateRandomPhrase">{{ text.randomPhrase }}</Button>
			</div>
		</template>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.prefixSuffix }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.unit }}</span>
			<CharRoll :value="prefixSuffixValue" :prefix="isZh ? '共 ' : '$'" :suffix="isZh ? ' 人' : ' USD'" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.percent }}</span>
			<CharRoll :value="percentValue" suffix="%" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generatePrefixSuffixValue">{{ text.random }}</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.fontSizes }}</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.small }}</span>
			<CharRoll :value="fontSizeValue" preset="letterUpper" font-size="sm" :height="24" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.medium }}</span>
			<CharRoll :value="fontSizeValue" preset="letterUpper" font-size="lg" :height="32" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">{{ text.large }}</span>
			<CharRoll :value="fontSizeValue" preset="letterUpper" font-size="2xl" :height="48" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="generateFontSizeValue">{{ text.random }}</Button>
		</div>
	</div>
</template>
