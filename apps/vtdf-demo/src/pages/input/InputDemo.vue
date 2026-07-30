<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Button, Icon, Input, Toast } from 'vtdf/components';
import type { InputProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const messages = {
	zh_CN: {
		initialText: '初始文本',
		idPlaceholder: '请输入身份证号',
		idRecognizing: '两秒后识别完毕……',
		basic: '基础用法',
		text: '文本',
		withoutTitle: '不带标题',
		enterText: '请输入文本',
		customPlaceholder: '自定义 placeholder',
		customPlaceholderText: '我是自定义的 placeholder',
		inputTypes: '不同输入类型',
		mobileTip: '请在移动设备查看键盘类型',
		anyText: '任意文本（常规键盘）',
		password: '密码',
		numberAny: '数字（任意）',
		numberInteger: '数字（整数）',
		numberDecimal: '数字（允许小数点）',
		numberNegative: '数字（允许负数）',
		email: '邮箱',
		phone: '电话号码',
		url: '链接地址',
		search: '搜索内容',
		noKeyboard: '文本（不使用虚拟键盘）',
		lineStyle: '线性风格',
		lineCenter: '文本（线条居中过渡）',
		lineLeft: '文本（线条左侧过渡）',
		duration: '不同过渡时间',
		fastTransition: '过渡快',
		normalTransition: '过渡正常',
		slowTransition: '过渡较慢',
		normalLineTransition: '线性过渡正常',
		slowLineTransition: '线性过渡较慢',
		titlePosition: '不同标题位置',
		titleOut: '标题（外部）',
		titleIn: '标题（内部）',
		titleNone: '标题（无）',
		inputPosition: '不同输入文字位置',
		radius: '不同圆角风格',
		lineRadiusInvalid: '线性风格圆角无效',
		verticalSpacing: '不同垂直间距',
		spacing0: '请输入文本（间距为 0）',
		spacing4: '请输入文本（间距为 4）',
		clear: '带清除',
		disabled: '禁用',
		disabledValue: '已禁用',
		readonly: '只读',
		readonlyValue: '只读',
		state: '不同状态色',
		success: '成功',
		warning: '警告',
		error: '错误',
		info: '信息',
		warningLine: '警告 & 线性',
		warningLineAnimation: '警告 & 线性 & 动画',
		dynamicState: '动态改变状态色',
		phonePlaceholder: '请输入 11 位手机号',
		leftIcon: '左侧带图标',
		username: '用户名',
		leftText: '左侧带文字',
		account: '账号',
		leftIconText: '左侧带图标与文字',
		leftTextIcon: '左侧带文字与图标',
		leftIconTextIcon: '左侧带图标、文字、图标',
		rightIcon: '右侧带图标',
		idCard: '身份证号',
		rightText: '右侧带文字',
		amount: '金额',
		yuan: '元',
		rightIconText: '右侧带图标与文字',
		rightTextIcon: '右侧带文字与图标',
		rightIconTextIcon: '右侧带图标、文字、图标',
		leftTextRightIcon: '左侧带文字右侧带图标',
		allSix: '左右六项全带',
		tips: '提示信息与数据项组合',
		tipMessage: '提示信息',
		data1: '数据项 1',
		data2: '数据项 2',
		data3: '数据项 3',
		allConfig: '展示所有可配置项',
		title: '标题',
		label2: '标签 2',
		label5: '标签 5',
		childLabel: 'label1 和 label4 使用 Child',
		code: '验证码',
		getCode: '获取验证码',
		dynamicDisplay: '动态显示',
		dynamicLabel5: '动态显示 label5',
		bindValue: '绑定 value',
		showValue: '显示当前值',
		currentValue: '当前输入文本：',
		label4Event: '点击 label4 触发事件',
		textarea: 'textarea',
		textareaAutosize: 'textarea 自动高度',
		enterContent: '请输入内容',
		keydown: '监听 keydown 事件',
		keyPressed: '你按下了',
		selectMode: '选择模式（结合其他输入组件）',
		date: '日期',
		required: '必输项'
	},
	en_US: {
		initialText: 'Initial text',
		idPlaceholder: 'Please enter ID card number',
		idRecognizing: 'Recognition completed in 2 seconds......',
		basic: 'Basic Usage',
		text: 'Text',
		withoutTitle: 'Without Title',
		enterText: 'Please enter text',
		customPlaceholder: 'Custom Placeholder',
		customPlaceholderText: 'I am a custom placeholder',
		inputTypes: 'Different Input Types',
		mobileTip: 'Please check keyboard types on mobile devices',
		anyText: 'Any Text (Regular Keyboard)',
		password: 'Password',
		numberAny: 'Number (Any)',
		numberInteger: 'Number (Integer)',
		numberDecimal: 'Number (Decimal Allowed)',
		numberNegative: 'Number (Allow Negative)',
		email: 'Email',
		phone: 'Phone Number',
		url: 'URL',
		search: 'Search Content',
		noKeyboard: 'Text (No Virtual Keyboard)',
		lineStyle: 'Line Style',
		lineCenter: 'Text (Center Line Transition)',
		lineLeft: 'Text (Left Line Transition)',
		duration: 'Different Transition Times',
		fastTransition: 'Fast Transition',
		normalTransition: 'Normal Transition',
		slowTransition: 'Slower Transition',
		normalLineTransition: 'Normal Line Transition',
		slowLineTransition: 'Slower Line Transition',
		titlePosition: 'Different Title Positions',
		titleOut: 'Title (External)',
		titleIn: 'Title (Internal)',
		titleNone: 'Title (None)',
		inputPosition: 'Different Input Text Positions',
		radius: 'Different Border Radius Styles',
		lineRadiusInvalid: 'Line Style (Radius Invalid)',
		verticalSpacing: 'Different Vertical Spacing',
		spacing0: 'Please enter text (Spacing 0)',
		spacing4: 'Please enter text (Spacing 4)',
		clear: 'With Clear Button',
		disabled: 'Disabled',
		disabledValue: 'Disabled',
		readonly: 'Readonly',
		readonlyValue: 'Readonly',
		state: 'Different States',
		success: 'Success',
		warning: 'Warning',
		error: 'Error',
		info: 'Info',
		warningLine: 'Warning & Line',
		warningLineAnimation: 'Warning & Line & Animation',
		dynamicState: 'Dynamic State Change',
		phonePlaceholder: 'Please enter 11-digit phone number',
		leftIcon: 'Left Icon',
		username: 'Username',
		leftText: 'Left Text',
		account: 'Account',
		leftIconText: 'Left Icon and Text',
		leftTextIcon: 'Left Text and Icon',
		leftIconTextIcon: 'Left Icon, Text, Icon',
		rightIcon: 'Right Icon',
		idCard: 'ID Card',
		rightText: 'Right Text',
		amount: 'Amount',
		yuan: 'Yuan',
		rightIconText: 'Right Icon and Text',
		rightTextIcon: 'Right Text and Icon',
		rightIconTextIcon: 'Right Icon, Text, Icon',
		leftTextRightIcon: 'Left Text and Right Icon',
		allSix: 'All Six Items',
		tips: 'Tips and Data Items',
		tipMessage: 'Tip message',
		data1: 'Data item 1',
		data2: 'Data item 2',
		data3: 'Data item 3',
		allConfig: 'All Configurable Items',
		title: 'Title',
		label2: 'Label 2',
		label5: 'Label 5',
		childLabel: 'label1 and label4 Using Child',
		code: 'Verification Code',
		getCode: 'Get Code',
		dynamicDisplay: 'Dynamic Display',
		dynamicLabel5: 'Dynamic label5',
		bindValue: 'Bind Value',
		showValue: 'Show Current Value',
		currentValue: 'Current input text: ',
		label4Event: 'Click label4 Trigger Event',
		textarea: 'Textarea',
		textareaAutosize: 'Textarea Auto Height',
		enterContent: 'Please enter content',
		keydown: 'Listen to Keydown Event',
		keyPressed: 'You pressed',
		selectMode: 'Select Mode (Combine with Other Input Components)',
		date: 'Date',
		required: 'Required'
	}
};

const text = computed(() => messages[props.locale]);
const value = ref(text.value.initialText);
const visible = ref(false);
const idCard = ref('');
const placeholderIdCard = ref(text.value.idPlaceholder);
const mobileLength = ref(0);
const keyValue = ref('');
const isMobile = ref(false);
const mobileState = computed<InputProps['state']>(() =>
	mobileLength.value === 11 ? 'success' : mobileLength.value === 0 ? 'theme' : 'error'
);
const currentValueMessage = computed(() => `${text.value.currentValue}${value.value}`);

watch(
	() => props.locale,
	() => {
		value.value = text.value.initialText;
		idCard.value = '';
		placeholderIdCard.value = text.value.idPlaceholder;
	}
);

watch(idCard, (nextValue) => {
	if (nextValue === '') placeholderIdCard.value = text.value.idPlaceholder;
});

const changeStateFun = (nextValue: string) => {
	mobileLength.value = nextValue.length;
};

const clickLabelFun = (index: number) => {
	if (index !== 4) return;
	placeholderIdCard.value = text.value.idRecognizing;
	window.setTimeout(() => {
		idCard.value = '1234567890XXX-XX';
		placeholderIdCard.value = '';
	}, 2000);
};

onMounted(() => {
	isMobile.value = /Mobi|Android|iPhone/i.test(navigator.userAgent);
});
</script>

<template>
	<div>
		<div class="px-4 pt-8 text-xl font-bold">{{ text.basic }}</div>
		<Input :title="text.text" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.withoutTitle }}</div>
		<Input :placeholder="text.enterText" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.customPlaceholder }}</div>
		<Input :title="text.text" :placeholder="text.customPlaceholderText" />

		<div class="px-4 pt-8 text-xl font-bold">
			{{ text.inputTypes }}
			<span v-if="!isMobile" class="ml-2 text-xs opacity-50">{{ text.mobileTip }}</span>
		</div>
		<Input :title="text.anyText" />
		<Input :title="text.password" type="password" />
		<Input :title="text.numberAny" type="number" />
		<Input :title="text.numberInteger" type="numeric" />
		<Input :title="text.numberDecimal" type="decimal" />
		<Input :title="text.numberNegative" type="number" negative />
		<Input :title="text.email" type="email" />
		<Input :title="text.phone" type="tel" />
		<Input :title="text.url" type="url" />
		<Input :title="text.search" type="search" />
		<Input :title="text.noKeyboard" type="none" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.lineStyle }}</div>
		<Input :title="text.text" input-style="line" />
		<Input :title="text.lineCenter" input-style="line" line-transition="center" />
		<Input :title="text.lineLeft" input-style="line" line-transition="left" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.duration }}</div>
		<Input :title="text.fastTransition" duration="fast" />
		<Input :title="text.normalTransition" />
		<Input :title="text.slowTransition" duration="slower" />
		<Input :title="text.normalLineTransition" input-style="line" line-transition="center" />
		<Input :title="text.slowLineTransition" input-style="line" line-transition="center" duration="slower" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.titlePosition }}</div>
		<Input :title="text.titleOut" />
		<Input :title="text.titleIn" title-position="in" />
		<Input :title="text.titleNone" :title-position="null" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.inputPosition }}</div>
		<Input :title="text.text" />
		<Input :title="text.text" input-position="right" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.radius }}</div>
		<Input :title="text.text" />
		<Input :title="text.text" radius="xl" />
		<Input :title="text.text" radius="4xl" />
		<Input :title="text.text" radius="none" />
		<Input :title="text.lineRadiusInvalid" radius="4xl" input-style="line" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.verticalSpacing }}</div>
		<Input :placeholder="text.spacing0" py="0" input-style="line" />
		<Input :placeholder="text.spacing0" py="0" input-style="line" />
		<Input :placeholder="text.spacing0" py="0" input-style="line" />
		<Input :placeholder="text.spacing4" py="4" input-style="line" />
		<Input :placeholder="text.spacing4" py="4" input-style="line" />
		<Input :placeholder="text.spacing4" py="4" input-style="line" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.clear }}</div>
		<Input :title="text.text" clear />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.disabled }}</div>
		<Input :title="text.text" disabled :value="text.disabledValue" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.readonly }}</div>
		<Input :title="text.text" readonly :value="text.readonlyValue" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.state }}</div>
		<Input :title="text.success" state="success" />
		<Input :title="text.warning" state="warning" />
		<Input :title="text.error" state="error" />
		<Input :title="text.info" state="info" />
		<Input :title="text.warningLine" input-style="line" state="error" />
		<Input :title="text.warningLineAnimation" input-style="line" state="error" line-transition="center" />
		<Input
			:title="text.dynamicState"
			type="tel"
			:placeholder="text.phonePlaceholder"
			:maxlength="11"
			:state="mobileState"
			@change="changeStateFun"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftIcon }}</div>
		<Input :title="text.password" type="password" :label1="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }" />
		<Input
			:title="text.username"
			:label1="{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }"
			:label3="{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftText }}</div>
		<Input :title="text.account" :label2="text.account" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftIconText }}</div>
		<Input
			:title="text.password"
			type="password"
			:label1="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
			:label2="text.password"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftTextIcon }}</div>
		<Input
			:title="text.password"
			type="password"
			:label2="text.password"
			:label3="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftIconTextIcon }}</div>
		<Input
			:title="text.password"
			type="password"
			:label1="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label2="text.password"
			:label3="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.rightIcon }}</div>
		<Input :title="text.idCard" :label4="{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }" />
		<Input
			:title="text.username"
			:label4="{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }"
			:label6="{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.rightText }}</div>
		<Input :title="text.amount" type="number" :label5="text.yuan" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.rightIconText }}</div>
		<Input
			:title="text.password"
			type="password"
			:label4="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
			:label5="text.password"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.rightTextIcon }}</div>
		<Input
			:title="text.password"
			type="password"
			:label5="text.password"
			:label6="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.rightIconTextIcon }}</div>
		<Input
			:title="text.password"
			type="password"
			:label4="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label5="text.password"
			:label6="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.leftTextRightIcon }}</div>
		<Input :label2="text.idCard" :label6="{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }" :placeholder="text.idPlaceholder" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.allSix }}</div>
		<Input
			:title="text.password"
			type="password"
			:label1="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label2="text.password"
			:label3="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
			:label4="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label5="text.password"
			:label6="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.tips }}</div>
		<Input :title="text.text" :tip="text.tipMessage" />
		<Input :title="text.text" :data1="text.data1" />
		<Input :title="text.text" :data1="text.data1" :data2="text.data2" />
		<Input :title="text.text" :data3="text.data3" />
		<Input :title="text.text" :data1="text.data1" :tip="text.tipMessage" />
		<Input :title="text.text" :data3="text.data3" :tip="text.tipMessage" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.allConfig }}</div>
		<Input
			:title="text.title"
			:placeholder="text.enterText"
			:label1="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label2="text.label2"
			:label3="{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }"
			:label4="{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }"
			:label5="text.label5"
			:label6="{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5, y: -2 }"
			:data1="text.data1"
			:data2="text.data2"
			:data3="text.data3"
			:tip="text.tipMessage"
			clear
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.childLabel }}</div>
		<Input :title="text.code">
			<template #label1>
				<div class="flex items-center">
					<svg class="h-4 w-4 fill-current opacity-60" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M511.198384 637.07798c-17.170101 0-31.08202 13.911919-31.08202 31.08202v124.302222c0 17.157172 13.924848 31.08202 31.08202 31.08202s31.069091-13.924848 31.069091-31.08202v-124.302222c0-17.170101-13.911919-31.08202-31.069091-31.08202z m0 0"
						/>
						<path
							d="M759.815758 513.331717V264.145455C759.815758 126.823434 648.520404 15.515152 511.198384 15.515152c-137.309091 0-248.630303 111.308283-248.630303 248.630303v249.186262C223.702626 565.20404 200.40404 629.423838 200.40404 699.229091c0 171.649293 139.145051 310.794343 310.794344 310.794343s310.794343-139.145051 310.794343-310.794343c0-69.805253-23.311515-134.025051-62.176969-185.897374zM324.719192 264.145455c0-102.994747 83.497374-186.479192 186.479192-186.479192 102.981818 0 186.466263 83.484444 186.466262 186.479192v186.88c-51.975758-39.111111-116.402424-62.577778-186.466262-62.577778s-134.490505 23.453737-186.479192 62.577778V264.145455z m186.479192 683.726868c-137.309091 0-248.630303-111.321212-248.630303-248.643232 0-137.309091 111.308283-248.617374 248.630303-248.617374 132.628687 0 248.617374 115.988687 248.617374 248.617374 0 137.32202-111.295354 248.643232-248.617374 248.643232z m0 0"
						/>
					</svg>
				</div>
			</template>
			<template #label4>
				<Button size="auto" height-out="0" height-in="1" fill="lineState">
					<div class="px-2">{{ text.getCode }}</div>
				</Button>
			</template>
		</Input>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.dynamicDisplay }}</div>
		<Input
			:title="text.dynamicLabel5"
			type="tel"
			:placeholder="text.phonePlaceholder"
			:maxlength="11"
			:state="mobileState"
			@change="changeStateFun"
		>
			<template #label5>
				<div>
					<Icon v-if="mobileLength === 11" name="ri-check-fill" inj-class="text-success" :size="14" />
					<Icon v-else-if="mobileLength !== 0" name="ri-close-fill" inj-class="text-error" :size="14" />
				</div>
			</template>
		</Input>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.bindValue }}</div>
		<Input :title="text.text" :value="value" @change="(nextValue) => (value = nextValue)" />
		<Button @click="visible = true">{{ text.showValue }}</Button>
		<Toast v-model:visible="visible" :message="currentValueMessage" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.label4Event }}</div>
		<Input
			:title="text.idCard"
			:placeholder="placeholderIdCard"
			:value="idCard"
			:label4="{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }"
			@click-label="clickLabelFun"
			clear
			@change="(nextValue) => (idCard = nextValue)"
		/>

		<div class="px-4 pt-8 text-xl font-bold">{{ text.textarea }}</div>
		<Input :placeholder="text.enterContent" type="textarea" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.textareaAutosize }}</div>
		<Input :placeholder="text.enterContent" type="textarea" autosize />

		<div class="px-4 pt-4 text-xl font-bold">{{ text.keydown }}</div>
		<div class="px-4 pt-4">{{ text.keyPressed }} {{ keyValue }}</div>
		<Input :placeholder="text.enterContent" @keydown="(nextKey) => (keyValue = nextKey)" />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.selectMode }}</div>
		<Input :title="text.date" select />

		<div class="px-4 pt-8 text-xl font-bold">{{ text.required }}</div>
		<Input :title="text.required" required />
	</div>
</template>
