import { useId } from 'react';

type RtdfLogoProps = {
	className?: string;
};

export const RtdfLogoMark = () => {
	const logoId = useId().replace(/:/g, '');
	const reactCoreCutoutId = `${logoId}-react-core-cutout`;
	const reactMaskId = `${logoId}-react-mask`;

	return (
		<>
			<path
				className="fill-primary dark:fill-dark"
				d="M40 0C54.8 0 67.7 8 74.6 20H30V30H40A10 10 0 0 1 40 50H30V80H10V20H0V0H40Zm38.7 30A40 40 0 0 1 40 80V60A20 20 0 0 0 57.3 30h21.4Z"
			/>
			<defs>
				<mask id={reactCoreCutoutId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
					<path fill="#fff" fillRule="evenodd" d="M0 0H80V80H0V0ZM40 32A8 8 0 1 0 40 48A8 8 0 1 0 40 32Z" />
				</mask>
				<mask id={reactMaskId} className="tdf-logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
					<image href="/frameworks/react-light.svg" width="80" height="80" mask={`url(#${reactCoreCutoutId})`} />
				</mask>
			</defs>
			<g className="tdf-rtdf-logo-orbit" data-logo-layer="react">
				<rect className="fill-dark dark:fill-primary" width="80" height="80" mask={`url(#${reactMaskId})`} />
			</g>
		</>
	);
};

const RtdfLogo = ({ className }: RtdfLogoProps) => (
	<svg className={className} viewBox="0 0 80 80" aria-hidden="true">
		<RtdfLogoMark />
	</svg>
);

export default RtdfLogo;
