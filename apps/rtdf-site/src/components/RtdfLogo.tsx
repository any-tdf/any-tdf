type RtdfLogoProps = {
	className?: string;
};

export const RtdfLogoMark = () => (
	<>
		<path
			className="fill-primary dark:fill-dark"
			d="M40 0C54.8054 0 67.7312 8.04427 74.6475 20H30V30H40C45.5228 30 50 34.4772 50 40C50 45.5228 45.5228 50 40 50H30V80H10V20H0V0H40ZM78.7393 30C79.5619 33.1962 80 36.547 80 40C80 62.0914 62.0914 80 40 80V60C51.0457 60 60 51.0457 60 40C60 36.3571 59.0259 32.9417 57.3242 30H78.7393Z"
		/>
		<g data-logo-layer="react">
			<image className="block dark:hidden" href="/frameworks/react-light.svg" width="80" height="80" />
			<image className="hidden dark:block" href="/frameworks/react-dark.svg" width="80" height="80" />
		</g>
	</>
);

const RtdfLogo = ({ className }: RtdfLogoProps) => (
	<svg className={className} viewBox="0 0 80 80" aria-hidden="true">
		<RtdfLogoMark />
	</svg>
);

export default RtdfLogo;
