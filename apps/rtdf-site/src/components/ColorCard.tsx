type ColorCardProps = {
	colorList?: { key: string; color: string }[];
};

const ColorCard = ({ colorList = [] }: ColorCardProps) => {
	return (
		<>
			{colorList.map((color, index) => (
				<div
					className={`flex w-full flex-1 justify-between self-center px-4 transition hover:scale-105 hover:rounded-sm md:py-0 ${
						index > 5 ? 'text-white' : 'text-black'
					}`}
					style={{ backgroundColor: color.color }}
					key={color.key}
				>
					<div className="flex flex-col justify-center text-sm">{color.key}</div>
					<div className="mt-2 flex flex-col justify-center py-1 text-right">
						<div>{color.color || ''}</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ColorCard;
