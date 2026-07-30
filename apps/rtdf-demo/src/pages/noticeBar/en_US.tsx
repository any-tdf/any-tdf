import { useState } from 'react';
import { NoticeBar, Toast } from 'rtdf/components';

const NoticeBarEn = () => {
	const textList = ['1. This is the first announcement!', '2. This is the second notice!'];
	const textLongList = [
		'1. This message long, long, long, long, long, long, long, long, long, long, long, long, long!',
		'2. This is the second notice!'
	];

	const [visible, setVisible] = useState(false);

	return (
		<>
			<div className="m-4 mt-8 text-lg font-bold">Basic usage</div>
			<NoticeBar textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">The announcements are short and do not scroll</div>
			<NoticeBar textList={['1. Short notice!', '2. Short notice!']} />

			<div className="m-4 mt-8 text-lg font-bold">Set notification spacing</div>
			<NoticeBar space={200} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Set rolling speed</div>
			<NoticeBar speed={100} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Right arrow (listen for click events)</div>
			<NoticeBar rightIcon="arrow" textList={textList} onClickRight={() => setVisible(true)} />
			<Toast visible={visible} message="Click the right arrow!" onClose={() => setVisible(false)} />

			<div className="m-4 mt-8 text-lg font-bold">No content on the right</div>
			<NoticeBar rightIcon={null} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Nothing on the left</div>
			<NoticeBar leftIcon={null} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Custom left</div>
			<NoticeBar leftIcon={{ name: 'ri-notification-2-line', size: 16, y: -1 }} textList={textList} />
			<div className="my-4" />
			<NoticeBar leftIcon={{ name: 'ri-wireless-charging-line', size: 16, y: -1 }} textList={textList} />
			<div className="my-4" />
			<NoticeBar textList={textList} leftChild={<>🥳</>} />

			<div className="m-4 mt-8 text-lg font-bold">Custom right</div>
			<NoticeBar textList={textList} rightChild={<>🥳</>} />

			<div className="m-4 mt-8 text-lg font-bold">Vertical rolling</div>
			<NoticeBar vertical textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Scroll transition to 1 second</div>
			<NoticeBar vertical duration={1000} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">The scrolling interval is 8 seconds</div>
			<NoticeBar vertical interval={8} textList={textList} />

			<div className="m-4 mt-8 text-lg font-bold">Excessively long text</div>
			<NoticeBar vertical textList={textLongList} />

			<div className="m-4 mt-8 text-lg font-bold">Single bar does not roll</div>
			<NoticeBar vertical textList={[textLongList[0]]} />

			<div className="m-4 mt-8 text-lg font-bold">Custom style</div>
			<NoticeBar injClass="!text-error !bg-error/10" textList={textList} />
			<div className="my-4" />
			<NoticeBar leftIcon={{ name: 'ri-check-line', size: 16, y: -1 }} injClass="!text-success !bg-success/10" textList={textList} />
			<div className="my-4" />
			<NoticeBar injClass="!text-blue !bg-purple/10" textList={textList} />
			<div className="pb-8" />
		</>
	);
};

export default NoticeBarEn;
