import { Icon } from 'rtdf/components';
import type { IconProps } from 'rtdf/types';

const icons = ['ri-spy-fill', 'ri-chrome-fill', 'ri-riding-line', 'ri-switch-fill'];
const msIcons: IconProps[] = [
	{ name: 'material-symbols--agriculture' },
	{ name: 'material-symbols--brightness-5', state: 'theme' },
	{ name: 'material-symbols--cardiology-outline', opacity: 0.5 },
	{ name: 'material-symbols--e911-avatar-rounded', size: 36 }
];
const solarIcons: IconProps[] = [
	{ name: 'solar--cat-broken' },
	{ name: 'solar--chair-2-line-duotone', state: 'theme' },
	{ name: 'solar--bonfire-line-duotone', opacity: 0.5 },
	{ name: 'solar--cup-hot-broken', size: 36 }
];
const states = ['theme', 'success', 'warning', 'error', 'info'] as const;
const fcIcons: IconProps[] = [
	{ name: 'fluent-color--building-store-24' },
	{ name: 'fluent-color--slide-text-sparkle-16' },
	{ name: 'fluent-color--chart-multiple-24', opacity: 0.5 },
	{ name: 'fluent-color--bot-sparkle-24', size: 36 }
];

export default function IconDemoEn() {
	return (
		<div className="flex flex-col space-y-12 px-4 py-8">
			<div>
				<div className="mb-2 font-bold text-xl">Basic usage</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon) => (
						<div key={icon} className="flex-1 py-2 text-center">
							<Icon name={icon} />
							<div className="mt-2 text-xs">{icon}</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Different states</div>
				<div className="flex flex-wrap justify-between">
					{states.map((state) => (
						<div key={state} className="flex-1 py-2 text-center">
							<Icon name={icons[0]} state={state} />
							<div className="mt-2 text-xs">{state}</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Different size</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon, i) => (
						<div key={`${icon}-size-${18 + i * 6}`} className="flex-1 py-2 text-center">
							<Icon name={icon} size={18 + i * 6} />
							<div className="mt-2 text-xs">{18 + i * 6}</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Different transparency</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon, i) => (
						<div key={`${icon}-opacity-${(0.2 + i * 0.2).toFixed(1)}`} className="flex-1 py-2 text-center">
							<Icon name={icon} opacity={Number((0.2 + i * 0.2).toFixed(1))} />
							<div className="mt-2 text-xs">{(0.2 + i * 0.2).toFixed(1)}</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Use iconify</div>
				<div>material-symbols</div>
				<div className="flex flex-wrap items-center justify-around py-2">
					{msIcons.map((icon) => (
						<Icon key={icon.name} type="iconify" {...icon} />
					))}
				</div>
				<div>solar</div>
				<div className="flex flex-wrap items-center justify-around py-2">
					{solarIcons.map((icon) => (
						<Icon key={icon.name} type="iconify" {...icon} />
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Use iconify-color</div>
				<div className="flex flex-wrap items-center justify-around py-2">
					{fcIcons.map((icon) => (
						<Icon key={icon.name} type="iconify-color" {...icon} />
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">
					Custom color
					<span className="ml-2 font-normal text-xs">By injClass</span>
				</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon) => (
						<div key={icon} className="flex-1 py-2 text-center">
							<Icon name={icon} injClass="rtdf-demo-text-red-green" />
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">
					Custom color
					<span className="ml-2 font-normal text-xs">by children</span>
				</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon) => (
						<div key={icon} className="flex-1 py-2 text-center">
							<Icon>
								<i className="rtdf-demo-text-blue-red">
									<Icon name={icon} />
								</i>
							</Icon>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">children</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon, index) => (
						<div key={`${icon}-github-${index % 2 ? 'dark' : 'light'}`} className="flex-1 py-2 text-center">
							<Icon>
								<svg
									height="24"
									width="24"
									aria-hidden="true"
									viewBox="0 0 16 16"
									data-view-component="true"
									style={{ display: 'inline' }}
									className={index % 2 ? 'fill-primary dark:fill-dark' : 'fill-black dark:fill-white'}
								>
									<path
										fillRule="evenodd"
										d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
									/>
								</svg>
							</Icon>
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="mb-2 font-bold text-xl">Offset</div>
				<div className="flex flex-wrap justify-between">
					{icons.map((icon, i) => (
						<div key={`${icon}-offset-${-4 + i * 2}`} className="flex-1 py-2 text-center">
							<Icon name={icons[1]} y={-4 + i * 2} />
							y:{-4 + i * 2}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
