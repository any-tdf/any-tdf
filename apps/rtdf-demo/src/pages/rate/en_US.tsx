import { useState } from 'react';
import { Icon, Rate } from 'rtdf/components';

const RateEn = () => {
	const [value, setValue] = useState(2.5);

	return (
		<div className="pb-8">
			<div className="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
			<div className="p-4">
				<Rate />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Set Initial Score</div>
			<div className="p-4">
				<Rate value={1} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Allow Zero Score</div>
			<div className="p-4">
				<Rate zero />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Custom Total Score</div>
			<div className="p-4">
				<Rate total={12} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Set Unselected Opacity</div>
			<div className="p-4">
				<Rate opacity="0.8" />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Allow Half Selection</div>
			<div className="p-4">
				<Rate half />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Vertical Half Selection</div>
			<div className="p-4">
				<Rate half vertical />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Half Selection with Zero Score</div>
			<div className="p-4">
				<Rate half zero />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Increase Spacing</div>
			<div className="p-4">
				<Rate space="8" />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Disabled</div>
			<div className="p-4">
				<Rate disabled />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Read Only</div>
			<div className="p-4">
				<Rate readonly />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Different Sizes</div>
			<div className="p-4">
				<Rate width={20} height={20} />
			</div>
			<div className="p-4">
				<Rate width={28} height={28} />
			</div>
			<div className="p-4">
				<Rate width={36} height={36} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Custom Icons</div>
			<div className="p-4">
				<Rate opacity="0.6">
					<Icon name="ri-star-fill" injClass="text-warning" />
				</Rate>
			</div>
			<div className="p-4">
				<Rate>
					<Icon name="ri-heart-3-fill" injClass="text-error" />
				</Rate>
			</div>
			<div className="p-4">
				<Rate half>
					<Icon name="ri-heart-3-fill" injClass="text-error" />
				</Rate>
			</div>
			<div className="p-4">
				<Rate half opacity="0.5" width={30} height={36}>
					<div className="text-3xl">👍</div>
				</Rate>
			</div>
			<div className="p-4">
				<Rate half opacity="0.5" width={30} height={36} vertical>
					<div className="text-3xl">🍺</div>
				</Rate>
			</div>
			<div className="p-4">
				<Rate half opacity="0.5" width={30} height={36}>
					<div className="text-3xl text-primary dark:text-dark">M</div>
				</Rate>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Event Listening</div>
			<div className="p-4">
				<Rate half value={value} onClick={(nextValue) => setValue(nextValue)} />
				<p className="mt-2">Rating: {value} stars</p>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Click Animation for All Active Icons</div>
			<div className="p-4">
				<Rate animation="active" />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Disable Click Animation</div>
			<div className="p-4">
				<Rate animation={null} />
			</div>
		</div>
	);
};

export default RateEn;
