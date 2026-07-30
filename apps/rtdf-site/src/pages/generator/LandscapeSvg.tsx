type LandscapeSvgProps = {
	dark?: boolean;
};

const LandscapeSvg = ({ dark = false }: LandscapeSvgProps) => {
	const isDark = dark;

	return (
		<svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 614 383.76" className="w-full">
			<defs>
				<style>{`
			.cls-1 {
				isolation: isolate;
			}
			.cls-2 {
				fill: url(#linear-gradient);
			}
			.cls-3 {
				fill: red;
			}
			.cls-moon {
				fill: #fff;
			}
			.cls-4 {
				fill: url(#linear-gradient-2);
			}
			.cls-5 {
				fill: var(--color-primary-500);
			}
			.cls-5-dark {
				fill: var(--color-dark-500);
			}
			.cls-6 {
				fill: var(--color-primary-700);
			}
			.cls-6-dark {
				fill: var(--color-dark-800);
			}
			.cls-7 {
				opacity: 0.61;
				fill: url(#linear-gradient-3);
			}
			.cls-17,
			.cls-21,
			.cls-22,
			.cls-7,
			.cls-8 {
				mix-blend-mode: overlay;
			}
			.cls-8 {
				fill: url(#linear-gradient-4);
			}
			.cls-9 {
				fill: url(#linear-gradient-5);
			}
			.cls-10 {
				fill: url(#linear-gradient-6);
			}
			.cls-11 {
				fill: #260202;
			}
			.cls-12 {
				fill: url(#linear-gradient-7);
			}
			.cls-13 {
				fill: url(#linear-gradient-8);
			}
			.cls-14 {
				fill: url(#linear-gradient-9);
			}
			.cls-15 {
				fill: url(#linear-gradient-10);
			}
			.cls-16 {
				fill: url(#linear-gradient-11);
			}
			.cls-17 {
				fill: url(#linear-gradient-12);
			}
			.cls-18 {
				fill: url(#linear-gradient-13);
			}
			.cls-19 {
				fill: url(#linear-gradient-14);
			}
			.cls-20 {
				fill: url(#linear-gradient-15);
			}
			.cls-21 {
				fill: url(#linear-gradient-16);
			}
			.cls-22 {
				fill: url(#linear-gradient-17);
			}
			.cls-23 {
				fill: url(#linear-gradient-18);
			}
			.cls-24 {
				fill: url(#linear-gradient-19);
			}
			.cls-25 {
				fill: url(#linear-gradient-20);
			}
			.cls-26 {
				fill: url(#linear-gradient-21);
			}
			.cls-27 {
				fill: url(#linear-gradient-22);
			}
			.cls-28 {
				fill: url(#linear-gradient-23);
			}
			.cls-29 {
				fill: url(#linear-gradient-24);
			}
			.cls-30 {
				fill: url(#linear-gradient-25);
			}
			.cls-31 {
				opacity: 0.7;
				mix-blend-mode: screen;
				fill: url(#radial-gradient);
			}
			.cls-moon-light {
				opacity: 0.4;
				mix-blend-mode: screen;
				fill: url(#radial-gradient-moon);
			}
		`}</style>
				<linearGradient id="linear-gradient" x1="307" y1="369.32" x2="307" y2="23.88" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor={isDark ? 'var(--color-dark-400)' : 'var(--color-primary-50)'} />
					<stop offset="1" stopColor={isDark ? 'var(--color-dark-800)' : 'var(--color-primary-500)'} />
				</linearGradient>
				<linearGradient id="linear-gradient-2" x1="375" y1="390.15" x2="375" y2="207.5" xlinkHref="#linear-gradient" />
				<linearGradient id="linear-gradient-3" x1="481.92" y1="363.2" x2="481.92" y2="267.14" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor="#fff" stopOpacity="0" />
					<stop offset="0.12" stopColor="#fff" stopOpacity="0.18" />
					<stop offset="0.3" stopColor="#fff" stopOpacity="0.42" />
					<stop offset="0.48" stopColor="#fff" stopOpacity="0.63" />
					<stop offset="0.64" stopColor="#fff" stopOpacity="0.79" />
					<stop offset="0.78" stopColor="#fff" stopOpacity="0.91" />
					<stop offset="0.91" stopColor="#fff" stopOpacity="0.98" />
					<stop offset="1" stopColor="#fff" />
				</linearGradient>
				<linearGradient id="linear-gradient-4" x1="293.94" y1="377.42" x2="299.58" y2="307.74" xlinkHref="#linear-gradient-3" />
				<linearGradient id="linear-gradient-5" x1="304.08" y1="357.53" x2="589.55" y2="357.53" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor={isDark ? 'var(--color-dark-900)' : 'var(--color-primary-900)'} stopOpacity={0.1} />
					<stop offset="1" stopColor={isDark ? 'var(--color-dark-900)' : 'var(--color-primary-900)'} />
				</linearGradient>
				<linearGradient id="linear-gradient-6" x1="615.64" y1="385.54" x2="615.64" y2="337.77" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor={isDark ? 'var(--color-dark-700)' : 'var(--color-primary-700)'} />
					<stop offset="1" stopColor={isDark ? 'var(--color-dark-500)' : 'var(--color-primary-500)'} />
				</linearGradient>
				<linearGradient id="linear-gradient-7" x1="645.03" y1="386.28" x2="645.03" y2="344.39" xlinkHref="#linear-gradient-6" />
				<linearGradient id="linear-gradient-8" x1="530.63" y1="385.84" x2="530.63" y2="340.47" xlinkHref="#linear-gradient-6" />
				<linearGradient id="linear-gradient-9" x1="395.26" y1="388.24" x2="395.26" y2="353.31" xlinkHref="#linear-gradient-6" />
				<linearGradient id="linear-gradient-10" x1="89.92" y1="448.19" x2="226.82" y2="254.6" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor={isDark ? 'var(--color-dark-950)' : 'var(--color-primary-950)'} />
					<stop offset="1" stopColor={isDark ? 'var(--color-dark-800)' : 'var(--color-primary-800)'} />
				</linearGradient>
				<linearGradient id="linear-gradient-11" x1="141.89" y1="484.94" x2="278.79" y2="291.35" xlinkHref="#linear-gradient-10" />
				<linearGradient id="linear-gradient-12" x1="169.94" y1="166.78" x2="169.94" y2="82.46" xlinkHref="#linear-gradient-3" />
				<linearGradient id="linear-gradient-13" x1="151.99" y1="365.33" x2="582.81" y2="365.33" xlinkHref="#linear-gradient" />
				<linearGradient id="linear-gradient-14" x1="243.34" y1="586.07" x2="399.62" y2="365.09" xlinkHref="#linear-gradient-10" />
				<linearGradient id="linear-gradient-15" x1="201.81" y1="475.52" x2="208" y2="401.64" xlinkHref="#linear-gradient-10" />
				<linearGradient id="linear-gradient-16" x1="500.15" y1="179.64" x2="862.56" y2="179.64" xlinkHref="#linear-gradient-3" />
				<linearGradient id="linear-gradient-17" x1="532.11" y1="134.72" x2="532.11" y2="80.96" xlinkHref="#linear-gradient-3" />
				<linearGradient id="linear-gradient-18" x1="297.29" y1="245.04" x2="294.84" y2="236.16" xlinkHref="#linear-gradient-10" />
				<linearGradient
					id="linear-gradient-19"
					x1="353.05"
					y1="283.25"
					x2="348.44"
					y2="266.53"
					gradientTransform="matrix(1, 0.01, -0.01, 1, 0.8, 4.06)"
					xlinkHref="#linear-gradient-10"
				/>
				<linearGradient
					id="linear-gradient-20"
					x1="391.03"
					y1="260.57"
					x2="386.96"
					y2="245.77"
					gradientTransform="matrix(0.97, 0.26, -0.26, 0.97, 80.16, -79.02)"
					xlinkHref="#linear-gradient-10"
				/>
				<linearGradient
					id="linear-gradient-21"
					x1="448.52"
					y1="222.49"
					x2="445.09"
					y2="210.06"
					gradientTransform="translate(108.87 -112.9) rotate(19.64)"
					xlinkHref="#linear-gradient-10"
				/>
				<linearGradient id="linear-gradient-22" x1="512.44" y1="317.53" x2="511.66" y2="307.93" xlinkHref="#linear-gradient-6" />
				<linearGradient id="linear-gradient-23" x1="518.15" y1="344.39" x2="518.15" y2="315.46" xlinkHref="#linear-gradient-10" />
				<linearGradient id="linear-gradient-24" x1="493.07" y1="353.96" x2="493.07" y2="305.26" xlinkHref="#linear-gradient" />
				<linearGradient id="linear-gradient-25" x1="493.07" y1="334.45" x2="493.07" y2="312.8" xlinkHref="#linear-gradient-10" />
				<radialGradient
					id="radial-gradient"
					cx="353.5"
					cy="241.44"
					r="179"
					gradientTransform="translate(274.26 -179.24) rotate(45)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="red" />
					<stop offset="1" />
				</radialGradient>
				<radialGradient
					id="radial-gradient-moon"
					cx="353.5"
					cy="241.44"
					r="179"
					gradientTransform="translate(274.26 -179.24) rotate(45)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="white" />
					<stop offset="1" />
				</radialGradient>
			</defs>
			<g id="OBJECTS">
				<rect className="cls-2" width="614" height="383.76" />
				<circle
					className="cls-3 transition-all duration-1000 dark:translate-y-full"
					cx="348.85"
					cy="246.41"
					r="32.45"
					transform="translate(-114.76 27.34) rotate(-13.1)"
				/>
				<path
					className="cls-moon translate-y-full transition-all duration-1000 dark:translate-y-0"
					d="M311.533 177.529C308.429 178.533 305.117 179.075 301.679 179.075C284.01 179.075 269.687 164.752 269.687 147.083C269.687 141.22 271.265 135.725 274.018 131C260.177 134.77 250 147.428 250 162.464C250 180.472 264.599 195.071 282.607 195.071C295.181 195.071 306.092 187.954 311.533 177.529Z"
				/>
				<path
					className="cls-4"
					d="M618.71,258.8c-31.85,23.89-57.07,1.77-104-38.93-47.74-41.43-95.56,9.29-142,37.16S308.37,221.2,238,199.3c-64.75-20.16-125.43,2-170,29.33V441.88H682V264.06C657.67,234.51,642.92,240.64,618.71,258.8Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-5 dark:hidden"
					d="M549.25,273c-61.05-35.84-89.58,8-144,34.5s-84.93,20-207.71-46.45C147,233.67,103.56,227.38,68,231.24V441.88H682V219.05C613.42,213.69,602.69,304.32,549.25,273Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-5-dark hidden dark:block"
					d="M549.25,273c-61.05-35.84-89.58,8-144,34.5s-84.93,20-207.71-46.45C147,233.67,103.56,227.38,68,231.24V441.88H682V219.05C613.42,213.69,602.69,304.32,549.25,273Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M604,364.53c-42.8-27.87-35.83-2-95.56,5s-93.23-86.6-169.21-64.7c-45.36,13.07-67,19.91-162.25-11.95-30-10-72.33,5.64-109,19.85V441.88H682V361.3C662.54,371.51,631.08,382.17,604,364.53Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M604,364.53c-42.8-27.87-35.83-2-95.56,5s-93.23-86.6-169.21-64.7c-45.36,13.07-67,19.91-162.25-11.95-30-10-72.33,5.64-109,19.85V441.88H682V361.3C662.54,371.51,631.08,382.17,604,364.53Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M500.77,337.32c-4.93,0-8.92,8.06-8.92,18a34.64,34.64,0,0,0,.39,5.29,8.59,8.59,0,0,0,8.11,7.22v6.77a.42.42,0,1,0,.84,0v-6.77a8.6,8.6,0,0,0,8.12-7.22,36,36,0,0,0,.39-5.29C509.7,345.38,505.7,337.32,500.77,337.32Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M567.8,330.69c-3.49,0-6.31,5.69-6.31,12.71a24.9,24.9,0,0,0,.28,3.74,6.05,6.05,0,0,0,5.73,5.1V357a.3.3,0,0,0,.59,0v-4.79a6.07,6.07,0,0,0,5.74-5.1,24.93,24.93,0,0,0,.27-3.74C574.1,336.38,571.28,330.69,567.8,330.69Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M89.56,290.43c-3.16,0-5.71,5.15-5.71,11.5a23,23,0,0,0,.25,3.39,5.49,5.49,0,0,0,5.19,4.61v4.33a.27.27,0,1,0,.53,0v-4.33A5.49,5.49,0,0,0,95,305.32a23,23,0,0,0,.25-3.39C95.26,295.58,92.71,290.43,89.56,290.43Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M120.66,281.36c-2.86,0-5.18,4.68-5.18,10.45a20.14,20.14,0,0,0,.23,3.07,5,5,0,0,0,4.71,4.19V303a.25.25,0,1,0,.49,0v-3.93a5,5,0,0,0,4.71-4.19,20.14,20.14,0,0,0,.23-3.07C125.85,286,123.52,281.36,120.66,281.36Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M142.78,284.24c-2.34,0-4.24,3.82-4.24,8.54a17,17,0,0,0,.19,2.52,4.09,4.09,0,0,0,3.85,3.43v3.21a.2.2,0,0,0,.4,0v-3.21a4.1,4.1,0,0,0,3.86-3.43,17,17,0,0,0,.18-2.52C147,288.06,145.12,284.24,142.78,284.24Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M375,291.65c-2.34,0-4.24,3.82-4.24,8.54a17,17,0,0,0,.19,2.52,4.09,4.09,0,0,0,3.85,3.43v3.21a.2.2,0,0,0,.4,0v-3.21a4.09,4.09,0,0,0,3.85-3.43,17,17,0,0,0,.19-2.52C379.28,295.47,377.38,291.65,375,291.65Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M343.52,293.91c-2.1,0-3.8,3.43-3.8,7.65a14.68,14.68,0,0,0,.17,2.25,3.65,3.65,0,0,0,3.45,3.07v2.88a.18.18,0,0,0,.18.18.18.18,0,0,0,.17-.18v-2.88a3.64,3.64,0,0,0,3.45-3.07,14.68,14.68,0,0,0,.17-2.25C347.31,297.34,345.61,293.91,343.52,293.91Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M320.29,303.65c-1.63,0-3,2.67-3,6a12.31,12.31,0,0,0,.13,1.75,2.85,2.85,0,0,0,2.69,2.39V316a.14.14,0,0,0,.28,0v-2.24a2.85,2.85,0,0,0,2.69-2.39,12.31,12.31,0,0,0,.13-1.75C323.25,306.32,321.92,303.65,320.29,303.65Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6 dark:hidden"
					d="M394.56,301.23c-1.64,0-3,2.67-3,6a12.31,12.31,0,0,0,.13,1.75,2.85,2.85,0,0,0,2.69,2.39v2.24a.14.14,0,0,0,.14.14.14.14,0,0,0,.14-.14v-2.24a2.83,2.83,0,0,0,2.68-2.39,11,11,0,0,0,.13-1.75C397.51,303.9,396.19,301.23,394.56,301.23Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M500.77,337.32c-4.93,0-8.92,8.06-8.92,18a34.64,34.64,0,0,0,.39,5.29,8.59,8.59,0,0,0,8.11,7.22v6.77a.42.42,0,1,0,.84,0v-6.77a8.6,8.6,0,0,0,8.12-7.22,36,36,0,0,0,.39-5.29C509.7,345.38,505.7,337.32,500.77,337.32Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M567.8,330.69c-3.49,0-6.31,5.69-6.31,12.71a24.9,24.9,0,0,0,.28,3.74,6.05,6.05,0,0,0,5.73,5.1V357a.3.3,0,0,0,.59,0v-4.79a6.07,6.07,0,0,0,5.74-5.1,24.93,24.93,0,0,0,.27-3.74C574.1,336.38,571.28,330.69,567.8,330.69Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M89.56,290.43c-3.16,0-5.71,5.15-5.71,11.5a23,23,0,0,0,.25,3.39,5.49,5.49,0,0,0,5.19,4.61v4.33a.27.27,0,1,0,.53,0v-4.33A5.49,5.49,0,0,0,95,305.32a23,23,0,0,0,.25-3.39C95.26,295.58,92.71,290.43,89.56,290.43Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M120.66,281.36c-2.86,0-5.18,4.68-5.18,10.45a20.14,20.14,0,0,0,.23,3.07,5,5,0,0,0,4.71,4.19V303a.25.25,0,1,0,.49,0v-3.93a5,5,0,0,0,4.71-4.19,20.14,20.14,0,0,0,.23-3.07C125.85,286,123.52,281.36,120.66,281.36Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M142.78,284.24c-2.34,0-4.24,3.82-4.24,8.54a17,17,0,0,0,.19,2.52,4.09,4.09,0,0,0,3.85,3.43v3.21a.2.2,0,0,0,.4,0v-3.21a4.1,4.1,0,0,0,3.86-3.43,17,17,0,0,0,.18-2.52C147,288.06,145.12,284.24,142.78,284.24Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M375,291.65c-2.34,0-4.24,3.82-4.24,8.54a17,17,0,0,0,.19,2.52,4.09,4.09,0,0,0,3.85,3.43v3.21a.2.2,0,0,0,.4,0v-3.21a4.09,4.09,0,0,0,3.85-3.43,17,17,0,0,0,.19-2.52C379.28,295.47,377.38,291.65,375,291.65Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M343.52,293.91c-2.1,0-3.8,3.43-3.8,7.65a14.68,14.68,0,0,0,.17,2.25,3.65,3.65,0,0,0,3.45,3.07v2.88a.18.18,0,0,0,.18.18.18.18,0,0,0,.17-.18v-2.88a3.64,3.64,0,0,0,3.45-3.07,14.68,14.68,0,0,0,.17-2.25C347.31,297.34,345.61,293.91,343.52,293.91Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M320.29,303.65c-1.63,0-3,2.67-3,6a12.31,12.31,0,0,0,.13,1.75,2.85,2.85,0,0,0,2.69,2.39V316a.14.14,0,0,0,.28,0v-2.24a2.85,2.85,0,0,0,2.69-2.39,12.31,12.31,0,0,0,.13-1.75C323.25,306.32,321.92,303.65,320.29,303.65Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-6-dark hidden dark:block"
					d="M394.56,301.23c-1.64,0-3,2.67-3,6a12.31,12.31,0,0,0,.13,1.75,2.85,2.85,0,0,0,2.69,2.39v2.24a.14.14,0,0,0,.14.14.14.14,0,0,0,.14-.14v-2.24a2.83,2.83,0,0,0,2.68-2.39,11,11,0,0,0,.13-1.75C397.51,303.9,396.19,301.23,394.56,301.23Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-7"
					d="M682,302.9V403H281.83S369.2,293.31,468.3,323.39c33.32,10.11,81.84,21.23,142.45-17.92C635.58,289.43,661.35,293.63,682,302.9Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-8"
					d="M434.45,360.55c-29.86-19.91-47.78,32.52-127.41-11.28S236.7,324.05,177,331.35c-37.86,4.63-81.84-.61-109-5.07v115.6H518.8C490.07,411.33,451.9,372.18,434.45,360.55Z"
					transform="translate(-68 -58.12)"
				/>
				<rect className="cls-9" y="331.3" width="614" height="52.46" />
				<path
					className="cls-10"
					d="M615.64,382.29a11.18,11.18,0,0,0,11.09-9.41,46.08,46.08,0,0,0,.51-6.88c0-12.92-5.2-23.39-11.6-23.39S604,353.08,604,366a46.08,46.08,0,0,0,.51,6.88,11.18,11.18,0,0,0,11.1,9.41Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-11"
					d="M619.84,358.34a.55.55,0,0,0-.77,0l-2.89,2.89v-7a.55.55,0,0,0-1.09,0v15.39l-4.92-4.92a.54.54,0,0,0-.77.77l5.69,5.69v19.87a.55.55,0,0,0,1.09,0V362.76l0,0,3.64-3.63A.55.55,0,0,0,619.84,358.34Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-12"
					d="M645,383.44a9.81,9.81,0,0,0,9.73-8.26,40.22,40.22,0,0,0,.45-6c0-11.33-4.56-20.51-10.18-20.51s-10.17,9.18-10.17,20.51a40.25,40.25,0,0,0,.44,6,9.82,9.82,0,0,0,9.73,8.26Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-11"
					d="M648.72,362.43a.48.48,0,0,0-.68,0L645.51,365v-6.09a.48.48,0,1,0-1,0v13.49l-4.32-4.31a.48.48,0,0,0-.68,0,.48.48,0,0,0,0,.67l5,5v17.42a.48.48,0,1,0,1,0V366.31l0,0,3.19-3.19A.48.48,0,0,0,648.72,362.43Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-13"
					d="M530.63,382.76a10.63,10.63,0,0,0,10.54-8.94,42.87,42.87,0,0,0,.49-6.54c0-12.27-4.94-22.21-11-22.21s-11,9.94-11,22.21a42.87,42.87,0,0,0,.49,6.54,10.63,10.63,0,0,0,10.53,8.94Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-11"
					d="M534.63,360a.5.5,0,0,0-.73,0l-2.75,2.74v-6.61a.52.52,0,0,0-1,0v14.62l-4.68-4.67a.52.52,0,0,0-.73.73l5.41,5.4v18.87a.52.52,0,1,0,1,0V364.2h0l3.46-3.45A.52.52,0,0,0,534.63,360Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-14"
					d="M395.26,385.86a8.16,8.16,0,0,0,8.11-6.88,32.49,32.49,0,0,0,.38-5c0-9.45-3.8-17.11-8.49-17.11s-8.48,7.66-8.48,17.11a33.8,33.8,0,0,0,.37,5,8.18,8.18,0,0,0,8.11,6.88Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-11"
					d="M398.34,368.35a.4.4,0,0,0-.57,0l-2.11,2.11v-5.09a.39.39,0,0,0-.4-.39.38.38,0,0,0-.39.39v11.26l-3.6-3.6a.4.4,0,0,0-.57,0,.4.4,0,0,0,0,.56l4.17,4.16v14.53a.39.39,0,0,0,.39.4.4.4,0,0,0,.4-.4v-20.7h0l2.66-2.66A.4.4,0,0,0,398.34,368.35Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-15"
					d="M197.81,242c-15.54,0-28.14,25.4-28.14,56.73a110.33,110.33,0,0,0,1.24,16.69,27.08,27.08,0,0,0,25.58,22.78v21.35a1.32,1.32,0,0,0,2.64,0V338.19a27.1,27.1,0,0,0,25.59-22.78A110.33,110.33,0,0,0,226,298.72C226,267.39,213.36,242,197.81,242Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-16"
					d="M264.47,266c-13.21,0-23.92,21.59-23.92,48.22a95,95,0,0,0,1,14.19,23,23,0,0,0,21.75,19.36v18.15a1.12,1.12,0,0,0,2.24,0V347.79a23,23,0,0,0,21.76-19.36,95,95,0,0,0,1-14.19C288.4,287.61,277.69,266,264.47,266Z"
					transform="translate(-68 -58.12)"
				/>
				<rect className="cls-18" y="346.89" width="614" height="36.87" />
				<path
					className="cls-19"
					d="M682,421.93c-84.8.85-250.57,1.52-382.92-48.11C203.52,338,116.6,343.55,68,357.91v84H682Z"
					transform="translate(-68 -58.12)"
				/>
				<path className="cls-20" d="M68,398.32v43.56H344.91C244.58,381.37,128.79,388.5,68,398.32Z" transform="translate(-68 -58.12)" />
				<path
					className="cls-17 dark:hidden"
					d="M271.87,160.77H68V127.89c12.36-7.71,30.21-15.11,43.12-4.78,21.72,17.38,34.27-7.24,49.24,4.83s26.07,26.55,56.48,15.45S271.87,160.77,271.87,160.77Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-21 dark:hidden"
					d="M682,164.66c-6-2.15-12.2-2.09-17.28,2.78-15.93,15.27-52.42-16.59-67.69,4s-92.9.66-96.88,24.55H682Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-22 animate-cloudMove dark:hidden"
					d="M519.5,117.79c17.43,8.5,31.58-9.9,42.64,2.48s36.55.17,50.27,15.21H451.82S489,102.91,519.5,117.79Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-23 dark:hidden"
					d="M294.88,236.75s-1.44-1.72-4.16-.42a4.77,4.77,0,0,1,4.6,2.7s.95-3.86,3.39-4C298.71,235.05,296.84,234.18,294.88,236.75Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-24 dark:hidden"
					d="M346.92,274.81s-2.68-3.26-7.82-.87c0,0,5.35-.71,8.61,5.17,0,0,1.87-7.25,6.45-7.44C354.16,271.67,350.65,270,346.92,274.81Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-25 dark:hidden"
					d="M390.73,259s-1.58-3.39-6.51-2.47c0,0,4.74.56,6.24,6.32,0,0,3.19-5.8,7.16-4.95C397.62,257.86,395,255.66,390.73,259Z"
					transform="translate(-68 -58.12)"
				/>
				<path
					className="cls-26 dark:hidden"
					d="M457.22,235.33s-1.09-3-5.28-2.52c0,0,3.93.8,4.79,5.73,0,0,3.08-4.64,6.34-3.65C463.07,234.89,461,232.87,457.22,235.33Z"
					transform="translate(-68 -58.12)"
				/>
				<polygon className="cls-27" points="530.69 315.91 505.61 315.91 493.13 306.1 518.22 306.1 530.69 315.91" />
				<rect className="cls-28" x="505.61" y="315.91" width="25.08" height="22.41" />
				<polygon className="cls-29" points="505.61 315.91 505.61 338.32 480.52 338.32 480.52 315.91 493.13 306.1 505.61 315.91" />
				<polygon className="cls-30" points="498.64 324.83 498.64 317.54 493.1 313.17 487.49 317.54 487.49 324.83 498.64 324.83" />
				<circle className="cls-31 dark:hidden" cx="353.5" cy="241.44" r="179" transform="translate(-135.18 262.55) rotate(-45)" />
				<circle
					className="cls-moon-light hidden dark:block"
					cx="353.5"
					cy="241.44"
					r="179"
					transform="translate(-135.18 262.55) rotate(-45)"
				/>
				<path
					className="animate-starTwinkle hidden dark:block"
					d="M102 27.5C102 34.0667 105.441 39.5384 110 40.75C105.441 41.9616 102 47.4333 102 54C102 47.4333 98.5591 41.9616 94 40.75C98.5591 39.5384 102 34.0667 102 27.5Z"
					fill="#fff"
				/>
				<path
					className="animate-starTwinkle2 hidden dark:block"
					d="M555 21.4444C555 27.2815 558.011 32.1452 562 33.2222C558.011 34.2992 555 39.1629 555 45C555 39.1629 551.989 34.2992 548 33.2222C551.989 32.1452 555 27.2815 555 21.4444Z"
					fill="#fff"
				/>
				<path
					className="animate-starTwinkle3 hidden dark:block"
					d="M366 27.3333C366 31.7112 368.151 35.3589 371 36.1667C368.151 36.9744 366 40.6222 366 45C366 40.6222 363.849 36.9744 361 36.1667C363.849 35.3589 366 31.7112 366 27.3333Z"
					fill="#fff"
				/>
				<path
					className="animate-starTwinkle4 hidden dark:block"
					d="M534 94.3333C534 98.7112 536.151 102.359 539 103.167C536.151 103.974 534 107.622 534 112C534 107.622 531.849 103.974 529 103.167C531.849 102.359 534 98.7112 534 94.3333Z"
					fill="#fff"
				/>
			</g>
		</svg>
	);
};

export default LandscapeSvg;
