import { Divider } from 'rtdf/components';

function DividerZh() {
	return (
		<div className="flex flex-col space-y-8 py-8">
			<div>
				<div className="p-4 font-bold">不同长度</div>
				<Divider />
				<Divider px="4" />
				<Divider px="8" />
				<Divider px="16" />
				<Divider px="36" />
			</div>
			<div>
				<div className="p-4 font-bold">包含文字</div>
				<Divider text="古筝计划" />
				<Divider px="4" text="红岸基地" />
			</div>
			<div>
				<div className="p-4 font-bold">不同高度</div>
				<div className="px-4 text-sm">开始</div>
				<Divider py="0" />
				<div className="px-4 text-sm">高度为 0</div>
				<Divider />
				<div className="px-4 text-sm">高度为 4</div>
				<Divider py="8" />
				<div className="px-4 text-sm">高度为 8</div>
			</div>

			<div>
				<div className="p-4 font-bold">文字位置</div>
				<Divider text="左侧" align="left" />
				<Divider text="居中" />
				<Divider text="右侧" align="right" />
			</div>
			<div>
				<div className="p-4 font-bold">线条风格</div>
				<Divider text="实线" />
				<Divider line="dashed" text="虚线" />
				<Divider line="dotted" text="点线" />
			</div>
			<div>
				<div className="p-4 font-bold">自定义颜色</div>
				<Divider injClass="!border-primary dark:!border-warning" />
				<Divider text="自定义线条" injClass="!border-error dark:!border-info" />
				<Divider text="自定义文字" injClass="!text-error" />
				<Divider text="自定义线条与文字" injClass="!border-error !text-primary dark:!text-info" />
				<Divider line="dashed" text="自定义虚线" injClass="!border-warning" />
			</div>
			<div className="px-4">
				<div className="py-4 font-bold">垂直分割线</div>
				<div className="text-sm">
					三日凌空
					<Divider layout="v" />
					三日连珠
					<Divider layout="v" />
					人列计算机
				</div>
			</div>
			<div>
				<div className="p-4 font-bold">不同粗细</div>
				<Divider />
				<Divider weight="2" />
				<Divider weight="4" />
				<div className="px-4 text-sm">
					执剑人
					<Divider layout="v" />
					三日凌空
					<Divider layout="v" weight="2" />
					三日连珠
					<Divider layout="v" weight="4" />
					人列计算机
				</div>
			</div>
			<div className="px-4">
				<div className="py-4 font-bold">自定义垂直分割线</div>
				<div className="text-sm">
					加大间距
					<Divider layout="v" mx="4" />
					自定义
					<Divider layout="v" mx="4" injClass="!border-error dark:!border-info" />
					颜色
					<Divider line="dashed" layout="v" mx="4" injClass="!border-error dark:!border-info" />
					与线条风格
				</div>
			</div>
		</div>
	);
}

export default DividerZh;
