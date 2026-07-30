<!-- Input Demo -->
<script lang="ts">
	import { Input, Button, Icon, Toast } from 'stdf';

	let value = $state('Initial text');
	let visible = $state(false);

	let IdCard = $state('');

	// Get browser information to determine if it is a mobile device
	const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	let placeholderIdCard = $state('');
	$effect(() => {
		placeholderIdCard = IdCard === '' ? 'Please enter ID card number' : '';
	});
	const clickLabel4Fun = () => {
		placeholderIdCard = 'Recognition completed in 2 seconds......';
		setTimeout(() => {
			IdCard = '1234567890XXX-XX';
		}, 2000);
	};
	let mobileLength = $state(0);
	const changeStateFun = (v: string) => {
		mobileLength = v.length;
	};

	let mobileState: 'success' | 'theme' | 'error' = $derived(mobileLength === 11 ? 'success' : mobileLength === 0 ? 'theme' : 'error');

	// Key pressed
	let key = $state('');
</script>

<div class="px-4 pt-8 text-xl font-bold">Basic Usage</div>
<Input title="Text" />

<div class="px-4 pt-8 text-xl font-bold">Without Title</div>
<Input placeholder="Please enter text" />

<div class="px-4 pt-8 text-xl font-bold">Custom Placeholder</div>
<Input title="Text" placeholder="I am a custom placeholder" />

<div class="px-4 pt-8 text-xl font-bold">
	Different Input Types
	{#if !isMobile}
		<span class="ml-2 text-xs opacity-50">Please check keyboard types on mobile devices</span>
	{/if}
</div>
<Input title="Any Text (Regular Keyboard)" />
<Input title="Password" type="password" />
<Input title="Number (Any)" type="number" />
<Input title="Number (Integer)" type="numeric" />
<Input title="Number (Decimal Allowed)" type="decimal" />
<Input title="Number (Allow Negative)" type="number" negative />
<Input title="Email" type="email" />
<Input title="Phone Number" type="tel" />
<Input title="URL" type="url" />
<Input title="Search Content" type="search" />
<Input title="Text (No Virtual Keyboard)" type="none" />

<div class="px-4 pt-8 text-xl font-bold">Line Style</div>
<Input title="Text" inputStyle="line" />
<Input title="Text (Center Line Transition)" inputStyle="line" lineTransition="center" />
<Input title="Text (Left Line Transition)" inputStyle="line" lineTransition="left" />

<div class="px-4 pt-8 text-xl font-bold">Different Transition Times</div>
<Input title="Fast Transition" duration="fast" />
<Input title="Normal Transition" />
<Input title="Slower Transition" duration="slower" />
<Input title="Normal Line Transition" inputStyle="line" lineTransition="center" />
<Input title="Slower Line Transition" inputStyle="line" lineTransition="center" duration="slower" />

<div class="px-4 pt-8 text-xl font-bold">Different Title Positions</div>
<Input title="Title (External)" />
<Input title="Title (Internal)" titlePosition="in" />
<Input title="Title (None)" titlePosition={null} />

<div class="px-4 pt-8 text-xl font-bold">Different Input Text Positions</div>
<Input title="Text" />
<Input title="Text" inputPosition="right" />

<div class="px-4 pt-8 text-xl font-bold">Different Border Radius Styles</div>
<Input title="Text" />
<Input title="Text" radius="xl" />
<Input title="Text" radius="4xl" />
<Input title="Text" radius="none" />
<Input title="Line Style (Radius Invalid)" radius="4xl" inputStyle="line" />

<div class="px-4 pt-8 text-xl font-bold">Different Vertical Spacing</div>
<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />
<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />
<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />

<div class="px-4 pt-8 text-xl font-bold">With Clear Button</div>
<Input title="Text" clear />

<div class="px-4 pt-8 text-xl font-bold">Disabled</div>
<Input title="Text" disabled value="Disabled" />

<div class="px-4 pt-8 text-xl font-bold">Readonly</div>
<Input title="Text" readonly value="Readonly" />

<div class="px-4 pt-8 text-xl font-bold">Different States</div>
<Input title="Success" state="success" />
<Input title="Warning" state="warning" />
<Input title="Error" state="error" />
<Input title="Info" state="info" />
<Input title="Warning & Line" inputStyle="line" state="error" />
<Input title="Warning & Line & Animation" inputStyle="line" state="error" lineTransition="center" />
<Input
	title="Dynamic State Change"
	type="tel"
	placeholder="Please enter 11-digit phone number"
	maxlength={11}
	state={mobileState}
	onchange={changeStateFun}
/>

<div class="px-4 pt-8 text-xl font-bold">Left Icon</div>
<Input title="Password" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />
<Input
	title="Username"
	label1={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
	label3={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
/>

<div class="px-4 pt-8 text-xl font-bold">Left Text</div>
<Input title="Account" label2="Account" />

<div class="px-4 pt-8 text-xl font-bold">Left Icon and Text</div>
<Input title="Password" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label2="Password" />

<div class="px-4 pt-8 text-xl font-bold">Left Text and Icon</div>
<Input title="Password" type="password" label2="Password" label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

<div class="px-4 pt-8 text-xl font-bold">Left Icon, Text, Icon</div>
<Input
	title="Password"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="Password"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">Right Icon</div>
<Input title="ID Card" label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} />
<Input
	title="Username"
	label4={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
	label6={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
/>

<div class="px-4 pt-8 text-xl font-bold">Right Text</div>
<Input title="Amount" type="number" label5="Yuan" />

<div class="px-4 pt-8 text-xl font-bold">Right Icon and Text</div>
<Input title="Password" type="password" label4={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label5="Password" />

<div class="px-4 pt-8 text-xl font-bold">Right Text and Icon</div>
<Input title="Password" type="password" label5="Password" label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

<div class="px-4 pt-8 text-xl font-bold">Right Icon, Text, Icon</div>
<Input
	title="Password"
	type="password"
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="Password"
	label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">Left Text and Right Icon</div>
<Input label2="ID Card" label6={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} placeholder="Please enter ID card number" />

<div class="px-4 pt-8 text-xl font-bold">All Six Items</div>
<Input
	title="Password"
	type="password"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="Password"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="Password"
	label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
/>

<div class="px-4 pt-8 text-xl font-bold">Tips and Data Items</div>
<Input title="Text" tip="Tip message" />
<Input title="Text" data1="Data item 1" />
<Input title="Text" data1="Data item 1" data2="Data item 2" />
<Input title="Text" data3="Data item 3" />
<Input title="Text" data1="Data item 1" tip="Tip message" />
<Input title="Text" data3="Data item 3" tip="Tip message" />

<div class="px-4 pt-8 text-xl font-bold">All Configurable Items</div>
<Input
	title="Title"
	placeholder="Please enter text"
	label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label2="Label 2"
	label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
	label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
	label5="Label 5"
	label6={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5, y: -2 }}
	data1="Data item 1"
	data2="Data item 2"
	data3="Data item 3"
	tip="Tip message"
	clear
/>

<div class="px-4 pt-8 text-xl font-bold">label1 and label4 Using Snippet</div>
<Input title="Verification Code">
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
				<div class="px-2">Get Code</div>
			</Button>
		</div>
	{/snippet}
</Input>

<div class="px-4 pt-8 text-xl font-bold">Dynamic Display</div>
<Input
	title="Dynamic label5"
	type="tel"
	placeholder="Please enter 11-digit phone number"
	maxlength={11}
	state={mobileState}
	onchange={changeStateFun}
>
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

<div class="px-4 pt-8 text-xl font-bold">Bind Value</div>
<Input title="Text" bind:value />
<Button onclick={() => (visible = true)}>Show Current Value</Button>
<Toast bind:visible message={`Current input text: ${value}`} />

<div class="px-4 pt-8 text-xl font-bold">Click label4 Trigger Event</div>
<Input
	title="ID Card"
	placeholder={placeholderIdCard}
	bind:value={IdCard}
	label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }}
	onclickLabel4={clickLabel4Fun}
	clear
/>

<div class="px-4 pt-8 text-xl font-bold">Textarea</div>
<Input placeholder="Please enter content" type="textarea" />

<div class="px-4 pt-8 text-xl font-bold">Textarea Auto Height</div>
<Input placeholder="Please enter content" type="textarea" autosize />

<div class="px-4 pt-4 text-xl font-bold">Listen to Keydown Event</div>
<div class="px-4 pt-4">You pressed {key}</div>
<Input placeholder="Please enter content" onkeydown={(v) => (key = v)} />

<div class="px-4 pt-8 text-xl font-bold">Select Mode (Combine with Other Input Components)</div>
<Input title="Date" select />

<div class="px-4 pt-8 text-xl font-bold">Required</div>
<Input title="Required" required />
