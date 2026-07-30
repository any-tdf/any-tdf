import { useEffect, useState } from 'react';
import { Button, Icon, Input, Toast } from 'rtdf/components';

function InputEn() {
	const [value, setValue] = useState('Initial text');
	const [visible, setVisible] = useState(false);

	const [idCard, setIdCard] = useState('');
	const [placeholderIdCard, setPlaceholderIdCard] = useState('Please enter ID card number');

	useEffect(() => {
		if (idCard === '') setPlaceholderIdCard('Please enter ID card number');
	}, [idCard]);

	const clickLabel4Fun = () => {
		setPlaceholderIdCard('Recognition completed in 2 seconds......');
		setTimeout(() => {
			setIdCard('1234567890XXX-XX');
			setPlaceholderIdCard('');
		}, 2000);
	};

	const [mobileLength, setMobileLength] = useState(0);
	const changeStateFun = (v: string) => {
		setMobileLength(v.length);
	};
	const mobileState: 'success' | 'theme' | 'error' = mobileLength === 11 ? 'success' : mobileLength === 0 ? 'theme' : 'error';

	const [key, setKey] = useState('');
	const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	return (
		<div>
			<div className="px-4 pt-8 text-xl font-bold">Basic Usage</div>
			<Input title="Text" />

			<div className="px-4 pt-8 text-xl font-bold">Without Title</div>
			<Input placeholder="Please enter text" />

			<div className="px-4 pt-8 text-xl font-bold">Custom Placeholder</div>
			<Input title="Text" placeholder="I am a custom placeholder" />

			<div className="px-4 pt-8 text-xl font-bold">
				Different Input Types
				{!isMobile && <span className="ml-2 text-xs opacity-50">Please check keyboard types on mobile devices</span>}
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

			<div className="px-4 pt-8 text-xl font-bold">Line Style</div>
			<Input title="Text" inputStyle="line" />
			<Input title="Text (Center Line Transition)" inputStyle="line" lineTransition="center" />
			<Input title="Text (Left Line Transition)" inputStyle="line" lineTransition="left" />

			<div className="px-4 pt-8 text-xl font-bold">Different Transition Times</div>
			<Input title="Fast Transition" duration="fast" />
			<Input title="Normal Transition" />
			<Input title="Slower Transition" duration="slower" />
			<Input title="Normal Line Transition" inputStyle="line" lineTransition="center" />
			<Input title="Slower Line Transition" inputStyle="line" lineTransition="center" duration="slower" />

			<div className="px-4 pt-8 text-xl font-bold">Different Title Positions</div>
			<Input title="Title (External)" />
			<Input title="Title (Internal)" titlePosition="in" />
			<Input title="Title (None)" titlePosition={null} />

			<div className="px-4 pt-8 text-xl font-bold">Different Input Text Positions</div>
			<Input title="Text" />
			<Input title="Text" inputPosition="right" />

			<div className="px-4 pt-8 text-xl font-bold">Different Border Radius Styles</div>
			<Input title="Text" />
			<Input title="Text" radius="xl" />
			<Input title="Text" radius="4xl" />
			<Input title="Text" radius="none" />
			<Input title="Line Style (Radius Invalid)" radius="4xl" inputStyle="line" />

			<div className="px-4 pt-8 text-xl font-bold">Different Vertical Spacing</div>
			<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
			<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
			<Input placeholder="Please enter text (Spacing 0)" py="0" inputStyle="line" />
			<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />
			<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />
			<Input placeholder="Please enter text (Spacing 4)" py="4" inputStyle="line" />

			<div className="px-4 pt-8 text-xl font-bold">With Clear Button</div>
			<Input title="Text" clear />

			<div className="px-4 pt-8 text-xl font-bold">Disabled</div>
			<Input title="Text" disabled value="Disabled" />

			<div className="px-4 pt-8 text-xl font-bold">Readonly</div>
			<Input title="Text" readonly value="Readonly" />

			<div className="px-4 pt-8 text-xl font-bold">Different States</div>
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
				onChange={changeStateFun}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Left Icon</div>
			<Input title="Password" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />
			<Input
				title="Username"
				label1={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
				label3={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Left Text</div>
			<Input title="Account" label2="Account" />

			<div className="px-4 pt-8 text-xl font-bold">Left Icon and Text</div>
			<Input title="Password" type="password" label1={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label2="Password" />

			<div className="px-4 pt-8 text-xl font-bold">Left Text and Icon</div>
			<Input title="Password" type="password" label2="Password" label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

			<div className="px-4 pt-8 text-xl font-bold">Left Icon, Text, Icon</div>
			<Input
				title="Password"
				type="password"
				label1={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
				label2="Password"
				label3={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Right Icon</div>
			<Input title="ID Card" label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} />
			<Input
				title="Username"
				label4={{ name: 'ri-arrow-down-s-line', size: 16, opacity: 0.5 }}
				label6={{ name: 'ri-shield-user-line', size: 16, opacity: 0.5 }}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Right Text</div>
			<Input title="Amount" type="number" label5="Yuan" />

			<div className="px-4 pt-8 text-xl font-bold">Right Icon and Text</div>
			<Input title="Password" type="password" label4={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} label5="Password" />

			<div className="px-4 pt-8 text-xl font-bold">Right Text and Icon</div>
			<Input title="Password" type="password" label5="Password" label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }} />

			<div className="px-4 pt-8 text-xl font-bold">Right Icon, Text, Icon</div>
			<Input
				title="Password"
				type="password"
				label4={{ name: 'ri-bank-line', size: 16, opacity: 0.5, y: -2 }}
				label5="Password"
				label6={{ name: 'ri-lock-line', size: 16, opacity: 0.5, y: -2 }}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Left Text and Right Icon</div>
			<Input label2="ID Card" label6={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }} placeholder="Please enter ID card number" />

			<div className="px-4 pt-8 text-xl font-bold">All Six Items</div>
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

			<div className="px-4 pt-8 text-xl font-bold">Tips and Data Items</div>
			<Input title="Text" tip="Tip message" />
			<Input title="Text" data1="Data item 1" />
			<Input title="Text" data1="Data item 1" data2="Data item 2" />
			<Input title="Text" data3="Data item 3" />
			<Input title="Text" data1="Data item 1" tip="Tip message" />
			<Input title="Text" data3="Data item 3" tip="Tip message" />

			<div className="px-4 pt-8 text-xl font-bold">All Configurable Items</div>
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

			<div className="px-4 pt-8 text-xl font-bold">label1 and label4 Using Child</div>
			<Input
				title="Verification Code"
				label1Child={
					<div className="flex items-center">
						<svg className="h-4 w-4 fill-current opacity-60" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
							<path d="M511.198384 637.07798c-17.170101 0-31.08202 13.911919-31.08202 31.08202v124.302222c0 17.157172 13.924848 31.08202 31.08202 31.08202s31.069091-13.924848 31.069091-31.08202v-124.302222c0-17.170101-13.911919-31.08202-31.069091-31.08202z m0 0" />
							<path d="M759.815758 513.331717V264.145455C759.815758 126.823434 648.520404 15.515152 511.198384 15.515152c-137.309091 0-248.630303 111.308283-248.630303 248.630303v249.186262C223.702626 565.20404 200.40404 629.423838 200.40404 699.229091c0 171.649293 139.145051 310.794343 310.794344 310.794343s310.794343-139.145051 310.794343-310.794343c0-69.805253-23.311515-134.025051-62.176969-185.897374zM324.719192 264.145455c0-102.994747 83.497374-186.479192 186.479192-186.479192 102.981818 0 186.466263 83.484444 186.466262 186.479192v186.88c-51.975758-39.111111-116.402424-62.577778-186.466262-62.577778s-134.490505 23.453737-186.479192 62.577778V264.145455z m186.479192 683.726868c-137.309091 0-248.630303-111.321212-248.630303-248.643232 0-137.309091 111.308283-248.617374 248.630303-248.617374 132.628687 0 248.617374 115.988687 248.617374 248.617374 0 137.32202-111.295354 248.643232-248.617374 248.643232z m0 0" />
						</svg>
					</div>
				}
				label4Child={
					<Button size="auto" heightOut="0" heightIn="1" fill="lineState">
						<div className="px-2">Get Code</div>
					</Button>
				}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Dynamic Display</div>
			<Input
				title="Dynamic label5"
				type="tel"
				placeholder="Please enter 11-digit phone number"
				maxlength={11}
				state={mobileState}
				onChange={changeStateFun}
				label5Child={
					<div>
						{mobileLength === 11 ? (
							<Icon name="ri-check-fill" injClass="text-success" size={14} />
						) : mobileLength === 0 ? null : (
							<Icon name="ri-close-fill" injClass="text-error" size={14} />
						)}
					</div>
				}
			/>

			<div className="px-4 pt-8 text-xl font-bold">Bind Value</div>
			<Input title="Text" value={value} onChange={setValue} />
			<Button onClick={() => setVisible(true)}>Show Current Value</Button>
			<Toast visible={visible} message={`Current input text: ${value}`} onClose={() => setVisible(false)} />

			<div className="px-4 pt-8 text-xl font-bold">Click label4 Trigger Event</div>
			<Input
				title="ID Card"
				placeholder={placeholderIdCard}
				value={idCard}
				onChange={setIdCard}
				label4={{ name: 'ri-qr-scan-line', size: 16, opacity: 0.5 }}
				onClickLabel4={clickLabel4Fun}
				clear
			/>

			<div className="px-4 pt-8 text-xl font-bold">Textarea</div>
			<Input placeholder="Please enter content" type="textarea" />

			<div className="px-4 pt-8 text-xl font-bold">Textarea Auto Height</div>
			<Input placeholder="Please enter content" type="textarea" autosize />

			<div className="px-4 pt-4 text-xl font-bold">Listen to Keydown Event</div>
			<div className="px-4 pt-4">You pressed {key}</div>
			<Input placeholder="Please enter content" onKeyDown={(v) => setKey(v)} />

			<div className="px-4 pt-8 text-xl font-bold">Select Mode (Combine with Other Input Components)</div>
			<Input title="Date" select />

			<div className="px-4 pt-8 text-xl font-bold">Required</div>
			<Input title="Required" required />
		</div>
	);
}

export default InputEn;
