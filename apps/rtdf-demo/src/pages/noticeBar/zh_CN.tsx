import { useState } from 'react';
import { NoticeBar, Toast } from 'rtdf/components';

function NoticeBarZh() {
	const textList = ['1. 这是第一条通告内容！', '2. 这是第二条通告内容！'];
	const textLongList = ['1. 这条通告超长长长长长长长长长长长长长长长长长长长长长！', '2. 这是第二条通告内容！'];

	const [visible, setVisible] = useState(false);

	return (
		<>
			<div className="m-4 mt-8 text-lg font-bold">基础用法</div>
			<NoticeBar textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">通告内容较短不滚动</div>
			<NoticeBar textList={['1. 短通告！', '2. 短通告！']}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">设定通告间距</div>
			<NoticeBar space={200} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">设定滚动速度</div>
			<NoticeBar speed={100} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">右侧箭头（监听点击事件）</div>
			<NoticeBar rightIcon="arrow" textList={textList} onClickRight={() => setVisible(true)}></NoticeBar>
			<Toast visible={visible} message="点击了右侧箭头！" onClose={() => setVisible(false)}></Toast>

			<div className="m-4 mt-8 text-lg font-bold">右侧无内容</div>
			<NoticeBar rightIcon={null} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">左侧无内容</div>
			<NoticeBar leftIcon={null} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">自定义左侧</div>
			<NoticeBar leftIcon={{ name: 'ri-notification-2-line', size: 16, y: -1 }} textList={textList}></NoticeBar>
			<div className="my-4"></div>
			<NoticeBar leftIcon={{ name: 'ri-wireless-charging-line', size: 16, y: -1 }} textList={textList}></NoticeBar>
			<div className="my-4"></div>
			<NoticeBar textList={textList} leftChild={<>🥳</>}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">自定义右侧</div>
			<NoticeBar textList={textList} rightChild={<>🥳</>}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">垂直滚动</div>
			<NoticeBar vertical textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">滚动过渡为 1 秒</div>
			<NoticeBar vertical duration={1000} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">滚动间隔为 8 秒</div>
			<NoticeBar vertical interval={8} textList={textList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">文字过长</div>
			<NoticeBar vertical textList={textLongList}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">单条不滚动</div>
			<NoticeBar vertical textList={[textLongList[0]]}></NoticeBar>

			<div className="m-4 mt-8 text-lg font-bold">自定义样式</div>
			<NoticeBar injClass="!text-error !bg-error/10" textList={textList}></NoticeBar>
			<div className="my-4"></div>
			<NoticeBar
				leftIcon={{ name: 'ri-check-line', size: 16, y: -1 }}
				injClass="!text-success !bg-success/10"
				textList={textList}
			></NoticeBar>
			<div className="my-4"></div>
			<NoticeBar injClass="!text-blue !bg-purple/10" textList={textList}></NoticeBar>
			<div className="pb-8"></div>
		</>
	);
}

export default NoticeBarZh;
