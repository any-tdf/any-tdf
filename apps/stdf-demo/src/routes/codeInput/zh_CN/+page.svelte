<script lang="ts">
	import { CodeInput, FullKeyboard, NumKeyboard, Toast, Slider } from 'stdf';
	import type { SmallAreaRadius } from 'stdf/types';

	// 圆角选项
	const radiusValues: SmallAreaRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(7);
	let currentRadius = $derived<SmallAreaRadius>(radiusValues[radiusIndex]);

	// 基础用法
	let value1 = $state('');
	let focused1 = $state(false);
	let showNumKeyboard1 = $state(false);

	// 自定义长度
	let value2 = $state('');
	let focused2 = $state(false);
	let showNumKeyboard2 = $state(false);

	// 掩码显示
	let value3 = $state('');
	let focused3 = $state(false);
	let showNumKeyboard3 = $state(false);

	// 自定义掩码
	let value3b = $state('');
	let focused3b = $state(false);
	let showNumKeyboard3b = $state(false);

	// 字母输入
	let value4 = $state('');
	let focused4 = $state(false);
	let showFullKeyboard4 = $state(false);

	// 无间距
	let value5 = $state('');
	let focused5 = $state(false);
	let showNumKeyboard5 = $state(false);

	// 提示信息
	let value6 = $state('');
	let focused6 = $state(false);
	let showNumKeyboard6 = $state(false);
	let errorInfo6 = $state('');

	// 原生键盘
	let value7 = $state('');
	let focused7 = $state(false);

	// 原生键盘 - 电话
	let value7b = $state('');
	let focused7b = $state(false);

	// 原生键盘 - 小数
	let value7c = $state('');
	let focused7c = $state(false);

	// 数字键盘预览
	let value8 = $state('');
	let focused8 = $state(false);
	let showNumKeyboard8 = $state(false);

	// 全键盘预览
	let value9 = $state('');
	let focused9 = $state(false);
	let showFullKeyboard9 = $state(false);

	// 自定义字体
	let value10 = $state('');
	let focused10 = $state(false);
	let showFullKeyboard10 = $state(false);

	// 线模式
	let value11 = $state('');
	let focused11 = $state(false);
	let showNumKeyboard11 = $state(false);

	// 下划线光标
	let value12 = $state('');
	let focused12 = $state(false);
	let showNumKeyboard12 = $state(false);

	// 呼吸动画
	let value13 = $state('');
	let focused13 = $state(false);
	let showNumKeyboard13 = $state(false);

	// 自定义圆角
	let value14 = $state('');
	let focused14 = $state(false);
	let showNumKeyboard14 = $state(false);

	// 主题背景
	let value15 = $state('');
	let focused15 = $state(false);
	let showNumKeyboard15 = $state(false);

	// 虚线边框
	let value16 = $state('');
	let focused16 = $state(false);
	let showNumKeyboard16 = $state(false);

	// 无边框
	let value17 = $state('');
	let focused17 = $state(false);
	let showNumKeyboard17 = $state(false);

	// 加大加粗
	let value17b = $state('');
	let focused17b = $state(false);
	let showNumKeyboard17b = $state(false);

	// 自动关闭
	let value18 = $state('');
	let focused18 = $state(false);
	let showNumKeyboard18 = $state(false);
	let showToast18 = $state(false);

	// 输入完成回调
	const handleFinish1 = (val: string) => {
		console.log('验证码输入完成:', val);
	};

	const handleFinish6 = (val: string) => {
		if (val !== '123456') {
			errorInfo6 = '验证码错误，请重新输入';
		} else {
			errorInfo6 = '';
		}
	};
</script>

<div class="space-y-6 p-4">
	<p class="text-sm text-gray-500">基础用法</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value1}
			bind:focused={focused1}
			keyboardVisible={showNumKeyboard1}
			onfocus={() => (showNumKeyboard1 = true)}
			onfinish={handleFinish1}
		/>
	</div>
	<NumKeyboard bind:value={value1} bind:visible={showNumKeyboard1} done dot={false} />

	<p class="text-sm text-gray-500">自定义长度</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value2}
			bind:focused={focused2}
			keyboardVisible={showNumKeyboard2}
			length={4}
			onfocus={() => (showNumKeyboard2 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value2} bind:visible={showNumKeyboard2} done dot={false} />

	<p class="text-sm text-gray-500">掩码显示</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value3}
			bind:focused={focused3}
			keyboardVisible={showNumKeyboard3}
			mask
			onfocus={() => (showNumKeyboard3 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value3} bind:visible={showNumKeyboard3} done dot={false} />

	<p class="text-sm text-gray-500">自定义掩码</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value3b}
			bind:focused={focused3b}
			keyboardVisible={showNumKeyboard3b}
			mask="*"
			onfocus={() => (showNumKeyboard3b = true)}
		/>
	</div>
	<NumKeyboard bind:value={value3b} bind:visible={showNumKeyboard3b} done dot={false} />

	<p class="text-sm text-gray-500">字母输入</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value4}
			bind:focused={focused4}
			keyboardVisible={showFullKeyboard4}
			type="text"
			mask={false}
			onfocus={() => (showFullKeyboard4 = true)}
		/>
	</div>
	<FullKeyboard bind:value={value4} bind:visible={showFullKeyboard4} />

	<p class="text-sm text-gray-500">无间距</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value5}
			bind:focused={focused5}
			keyboardVisible={showNumKeyboard5}
			gutter="0"
			onfocus={() => (showNumKeyboard5 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value5} bind:visible={showNumKeyboard5} done dot={false} />

	<p class="text-sm text-gray-500">提示信息</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value6}
			bind:focused={focused6}
			keyboardVisible={showNumKeyboard6}
			info="请输入 6 位验证码"
			errorInfo={errorInfo6}
			onfocus={() => (showNumKeyboard6 = true)}
			onfinish={handleFinish6}
		/>
	</div>
	<NumKeyboard bind:value={value6} bind:visible={showNumKeyboard6} done dot={false} />

	<p class="text-sm text-gray-500">原生键盘（numeric）</p>
	<div class="flex justify-center">
		<CodeInput bind:value={value7} bind:focused={focused7} native mask={false} />
	</div>

	<p class="text-sm text-gray-500">原生键盘（tel）</p>
	<div class="flex justify-center">
		<CodeInput bind:value={value7b} bind:focused={focused7b} native inputMode="tel" mask={false} />
	</div>

	<p class="text-sm text-gray-500">原生键盘（decimal）</p>
	<div class="flex justify-center">
		<CodeInput bind:value={value7c} bind:focused={focused7c} native inputMode="decimal" mask={false} />
	</div>

	<p class="text-sm text-gray-500">数字键盘预览</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value8}
			bind:focused={focused8}
			keyboardVisible={showNumKeyboard8}
			mask={false}
			onfocus={() => (showNumKeyboard8 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value8} bind:visible={showNumKeyboard8} done dot={false} preview />

	<p class="text-sm text-gray-500">全键盘预览</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value9}
			bind:focused={focused9}
			keyboardVisible={showFullKeyboard9}
			type="text"
			mask={false}
			onfocus={() => (showFullKeyboard9 = true)}
		/>
	</div>
	<FullKeyboard bind:value={value9} bind:visible={showFullKeyboard9} preview />

	<p class="text-sm text-gray-500">自定义字体</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value10}
			bind:focused={focused10}
			keyboardVisible={showFullKeyboard10}
			type="text"
			mask={false}
			onfocus={() => (showFullKeyboard10 = true)}
		/>
	</div>
	<FullKeyboard bind:value={value10} bind:visible={showFullKeyboard10} keyClass="font-Trueno" />

	<p class="text-sm text-gray-500">线模式</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value11}
			bind:focused={focused11}
			keyboardVisible={showNumKeyboard11}
			cellStyle="line"
			mask={false}
			onfocus={() => (showNumKeyboard11 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value11} bind:visible={showNumKeyboard11} done dot={false} />

	<p class="text-sm text-gray-500">下划线光标</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value12}
			bind:focused={focused12}
			keyboardVisible={showNumKeyboard12}
			cursorStyle="underline"
			mask={false}
			onfocus={() => (showNumKeyboard12 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value12} bind:visible={showNumKeyboard12} done dot={false} />

	<p class="text-sm text-gray-500">呼吸动画</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value13}
			bind:focused={focused13}
			keyboardVisible={showNumKeyboard13}
			cursorAnimation="pulse"
			mask={false}
			onfocus={() => (showNumKeyboard13 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value13} bind:visible={showNumKeyboard13} done dot={false} />

	<p class="text-sm text-gray-500">自定义圆角</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value14}
			bind:focused={focused14}
			keyboardVisible={showNumKeyboard14}
			radius={currentRadius}
			mask={false}
			onfocus={() => (showNumKeyboard14 = true)}
		/>
	</div>
	<div class="px-4">
		<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
	</div>
	<NumKeyboard bind:value={value14} bind:visible={showNumKeyboard14} done dot={false} />

	<p class="text-sm text-gray-500">主题背景</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value15}
			bind:focused={focused15}
			keyboardVisible={showNumKeyboard15}
			cellBg="theme"
			mask={false}
			onfocus={() => (showNumKeyboard15 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value15} bind:visible={showNumKeyboard15} done dot={false} />

	<p class="text-sm text-gray-500">虚线边框</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value16}
			bind:focused={focused16}
			keyboardVisible={showNumKeyboard16}
			cellBorder="dashed"
			mask={false}
			onfocus={() => (showNumKeyboard16 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value16} bind:visible={showNumKeyboard16} done dot={false} />

	<p class="text-sm text-gray-500">无边框 + surface 背景</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value17}
			bind:focused={focused17}
			keyboardVisible={showNumKeyboard17}
			cellBg="surface"
			cellBorder="none"
			onfocus={() => (showNumKeyboard17 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value17} bind:visible={showNumKeyboard17} done dot={false} />

	<p class="text-sm text-gray-500">加大加粗</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value17b}
			bind:focused={focused17b}
			keyboardVisible={showNumKeyboard17b}
			bold
			onfocus={() => (showNumKeyboard17b = true)}
		/>
	</div>
	<NumKeyboard bind:value={value17b} bind:visible={showNumKeyboard17b} done dot={false} />

	<p class="text-sm text-gray-500">自动关闭</p>
	<div class="flex justify-center">
		<CodeInput
			bind:value={value18}
			bind:focused={focused18}
			bind:keyboardVisible={showNumKeyboard18}
			autoClose
			onfocus={() => (showNumKeyboard18 = true)}
			onclose={() => (showToast18 = true)}
		/>
	</div>
	<NumKeyboard bind:value={value18} bind:visible={showNumKeyboard18} dot={false} />
	<Toast bind:visible={showToast18} message="输入完成，键盘已关闭" />

	<div class="h-96"></div>
</div>
