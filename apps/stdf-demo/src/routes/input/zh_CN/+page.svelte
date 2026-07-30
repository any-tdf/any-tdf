<!-- Input Demo -->
<script lang="ts">
	import { Input, Button, Icon, Toast } from 'stdf';

	let value = $state('初始文本');
	let visible = $state(false);

	let IdCard = $state('');

	// 通过获取浏览器信息判断是否是移动设备
	const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	let placeholderIdCard = $state('');
	$effect(() => {
		placeholderIdCard = IdCard === '' ? '请输入身份证号' : '';
	});
	const clickLabel4Fun = () => {
		placeholderIdCard = '两秒后识别完毕......';
		setTimeout(() => {
			IdCard = '1234567890XXX-XX';
		}, 2000);
	};
	let mobileLength = $state(0);
	const changeStateFun = (v: string) => {
		mobileLength = v.length;
	};

	let mobileState: 'success' | 'theme' | 'error' = $derived(mobileLength === 11 ? 'success' : mobileLength === 0 ? 'theme' : 'error');

	// 按键 key
	let key = $state('');
</script>

<div class="px-4 pt-8 text-xl font-bold">基础用法</div>
<Input title="文本" />

<div class="px-4 pt-8 text-xl font-bold">不带标题</div>
<Input placeholder="请输入文本" />

<div class="px-4 pt-8 text-xl font-bold">自定义 placeholder</div>
<Input title="文本" placeholder="我是自定义的 placeholder" />

<div class="px-4 pt-8 text-xl font-bold">
	不同输入类型
	{#if !isMobile}
		<span class="ml-2 text-xs opacity-50">请在移动设备查看键盘类型</span>
	{/if}
</div>
<Input title="任意文本（常规键盘）" />
<Input title="密码" type="password" />
<Input title="数字（任意）" type="number" />
<Input title="数字（整数）" type="numeric" />
<Input title="数字（允许小数点）" type="decimal" />
<Input title="数字（允许负数）" type="number" negative />
<Input title="邮箱" type="email" />
<Input title="电话号码" type="tel" />
<Input title="链接地址" type="url" />
<Input title="搜索内容" type="search" />
<Input title="文本（不使用虚拟键盘）" type="none" />

<div class="px-4 pt-8 text-xl font-bold">线性风格</div>
<Input title="文本" inputStyle="line" />
<Input title="文本（线条居中过渡）" inputStyle="line" lineTransition="center" />
<Input title="文本（线条左侧过渡）" inputStyle="line" lineTransition="left" />

<div class="px-4 pt-8 text-xl font-bold">不同过渡时间</div>
<Input title="过渡快" duration="fast" />
<Input title="过渡正常" />
<Input title="过渡较慢" duration="slower" />
<Input title="线性过渡正常" inputStyle="line" lineTransition="center" />
<Input title="线性过渡较慢" inputStyle="line" lineTransition="center" duration="slower" />

<div class="px-4 pt-8 text-xl font-bold">不同标题位置</div>
<Input title="标题（外部）" />
<Input title="标题（内部）" titlePosition="in" />
<Input title="标题（无）" titlePosition={null} />

<div class="px-4 pt-8 text-xl font-bold">不同输入文字位置</div>
<Input title="文本" />
<Input title="文本" inputPosition="right" />

<div class="px-4 pt-8 text-xl font-bold">不同圆角风格</div>
<Input title="文本" />
<Input title="文本" radius="xl" />
<Input title="文本" radius="4xl" />
<Input title="文本" radius="none" />
<Input title="线性风格圆角无效" radius="4xl" inputStyle="line" />

<div class="px-4 pt-8 text-xl font-bold">不同垂直间距</div>
<Input placeholder="请输入文本（间距为 0）" py="0" inputStyle="line" />
<Input placeholder="请输入文本（间距为 0）" py="0" inputStyle="line" />
<Input placeholder="请输入文本（间距为 0）" py="0" inputStyle="line" />
<Input placeholder="请输入文本（间距为 4）" py="4" inputStyle="line" />
<Input placeholder="请输入文本（间距为 4）" py="4" inputStyle="line" />
<Input placeholder="请输入文本（间距为 4）" py="4" inputStyle="line" />

<div class="px-4 pt-8 text-xl font-bold">带清除</div>
<Input title="文本" clear />

<div class="px-4 pt-8 text-xl font-bold">禁用</div>
<Input title="文本" disabled value="已禁用" />

<div class="px-4 pt-8 text-xl font-bold">只读</div>
<Input title="文本" readonly value="只读" />

<div class="px-4 pt-8 text-xl font-bold">不同状态色</div>
<Input title="成功" state="success" />
<Input title="警告" state="warning" />
<Input title="错误" state="error" />
<Input title="信息" state="info" />
<Input title="警告&线性" inputStyle="line" state="error" />
<Input title="警告&线性&动画" inputStyle="line" state="error" lineTransition="center" />
<Input title="动态改变状态色" type="tel" placeholder="请输入11位手机号" maxlength={11} state={mobileState} onchange={changeStateFun} />

<div class="px-4 pt-8 text-xl font-bold">左侧带图标</div>
<Input title="密码" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />
<Input
	title="用户名"
	label1={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
	label3={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
/>

<div class="px-4 pt-8 text-xl font-bold">左侧带文字</div>
<Input title="账号" label2="账号" />

<div class="px-4 pt-8 text-xl font-bold">左侧带图标与文字</div>
<Input title="密码" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label2="密码" />

<div class="px-4 pt-8 text-xl font-bold">左侧带文字与图标</div>
<Input title="密码" type="password" label2="密码" label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

<div class="px-4 pt-8 text-xl font-bold">左侧带图标、文字、图标</div>
<Input
	title="密码"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="密码"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">右侧带图标</div>
<Input title="身份证号" label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} />
<Input
	title="用户名"
	label4={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
	label6={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
/>

<div class="px-4 pt-8 text-xl font-bold">右侧带文字</div>
<Input title="金额" type="number" label5="元" />

<div class="px-4 pt-8 text-xl font-bold">右侧带图标与文字</div>
<Input title="密码" type="password" label4={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label5="密码" />

<div class="px-4 pt-8 text-xl font-bold">右侧带文字与图标</div>
<Input title="密码" type="password" label5="密码" label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

<div class="px-4 pt-8 text-xl font-bold">右侧带图标、文字、图标</div>
<Input
	title="密码"
	type="password"
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="密码"
	label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">左侧带文字右侧带图标</div>
<Input label2="身份证号" label6={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} placeholder="请输入身份证号" />

<div class="px-4 pt-8 text-xl font-bold">左右六项全带</div>
<Input
	title="密码"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="密码"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="密码"
	label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">提示信息与数据项组合</div>
<Input title="文本" tip="提示信息" />
<Input title="文本" data1="数据项1" />
<Input title="文本" data1="数据项1" data2="数据项2" />
<Input title="文本" data3="数据项3" />
<Input title="文本" data1="数据项1" tip="提示信息" />
<Input title="文本" data3="数据项3" tip="提示信息" />

<div class="px-4 pt-8 text-xl font-bold">展示所有可配置项</div>
<Input
	title="标题"
	placeholder="请输入文本"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="标签 2"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="标签 5"
	label6={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5, y: -2 }}
	data1="数据项 1"
	data2="数据项 2"
	data3="数据项 3"
	tip="提示信息"
	clear
/>

<div class="px-4 pt-8 text-xl font-bold">label1 和 label4 使用 Snippet</div>
<Input title="验证码">
	{#snippet label1Child()}
		<div>
			<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
				<path
					d="M511.198384 637.07798c-17.170101 0-31.08202 13.911919-31.08202 31.08202v124.302222c0 17.157172 13.924848 31.08202 31.08202 31.08202s31.069091-13.924848 31.069091-31.08202v-124.302222c0-17.170101-13.911919-31.08202-31.069091-31.08202z m0 0"
					fill="#515151"
				/>
				<path
					d="M759.815758 513.331717V264.145455C759.815758 126.823434 648.520404 15.515152 511.198384 15.515152c-137.309091 0-248.630303 111.308283-248.630303 248.630303v249.186262C223.702626 565.20404 200.40404 629.423838 200.40404 699.229091c0 171.649293 139.145051 310.794343 310.794344 310.794343s310.794343-139.145051 310.794343-310.794343c0-69.805253-23.311515-134.025051-62.176969-185.897374zM324.719192 264.145455c0-102.994747 83.497374-186.479192 186.479192-186.479192 102.981818 0 186.466263 83.484444 186.466262 186.479192v186.88c-51.975758-39.111111-116.402424-62.577778-186.466262-62.577778s-134.490505 23.453737-186.479192 62.577778V264.145455z m186.479192 683.726868c-137.309091 0-248.630303-111.321212-248.630303-248.643232 0-137.309091 111.308283-248.617374 248.630303-248.617374 132.628687 0 248.617374 115.988687 248.617374 248.617374 0 137.32202-111.295354 248.643232-248.617374 248.643232z m0 0"
					fill="#515151"
				/>
			</svg>
		</div>
	{/snippet}
	{#snippet label4Child()}
		<div>
			<Button size="auto" heightOut="0" heightIn="1" fill="lineState">
				<div class="px-2">获取验证码</div>
			</Button>
		</div>
	{/snippet}
</Input>

<div class="px-4 pt-8 text-xl font-bold">动态显示</div>
<Input title="动态显示 label5" type="tel" placeholder="请输入11位手机号" maxlength={11} state={mobileState} onchange={changeStateFun}>
	{#snippet label5Child()}
		<div>
			{#if mobileLength === 11}
				<Icon name="ri-check-fill" injClass="text-success" size={14} />
			{:else if mobileLength === 0}{:else}
				<Icon name="ri-close-fill" injClass="text-error" size={14} />
			{/if}
		</div>
	{/snippet}
</Input>

<div class="px-4 pt-8 text-xl font-bold">绑定 value</div>
<Input title="文本" bind:value />
<Button onclick={() => (visible = true)}>显示当前值</Button>
<Toast bind:visible message={`当前输入文本：${value}`} />

<div class="px-4 pt-8 text-xl font-bold">点击 label4 触发事件</div>
<Input
	title="身份证号"
	placeholder={placeholderIdCard}
	bind:value={IdCard}
	label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }}
	onclickLabel4={clickLabel4Fun}
	clear
/>

<div class="px-4 pt-8 text-xl font-bold">textarea</div>
<Input placeholder="请输入内容" type="textarea" />

<div class="px-4 pt-8 text-xl font-bold">textarea 自动高度</div>
<Input placeholder="请输入内容" type="textarea" autosize />

<div class="px-4 pt-4 text-xl font-bold">监听 keydown 事件</div>
<div class="px-4 pt-4">你按下了 {key}</div>
<Input placeholder="请输入内容" onkeydown={(v) => (key = v)} />

<div class="px-4 pt-8 text-xl font-bold">选择模式（结合其他输入组件）</div>
<Input title="日期" select />

<div class="px-4 pt-8 text-xl font-bold">必输项</div>
<Input title="必输项" required />
