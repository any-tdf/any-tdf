import { useState, useEffect } from 'react';
import { Pagination, Loading } from 'rtdf/components';
import { aphorisms } from '@any-tdf/site-common/data';

function PaginationZh() {
	// 总数，一般是后端接口返回
	const total = 200;

	// 当前页码，演示事件监听
	const [current, setCurrent] = useState(1);

	// 模拟请求数据
	const [data, setData] = useState<{ text: string; from: string; fromItalic?: boolean }[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 4;
	const [totalData, setTotalData] = useState(0);
	const [loading, setLoading] = useState(false);

	const getData = () => {
		setLoading(true);
		// 使用 setTimeout 模拟请求
		setTimeout(() => {
			setLoading(false);
			// 从 aphorisms 随机取出 pageSize 条数据
			const randomData = [...aphorisms].sort(() => Math.random() - 0.5).slice(0, pageSize);
			setData(randomData);
			setTotalData(64);
		}, 2000);
	};

	const changePageFunc = (c: number) => {
		setCurrentPage(c);
		getData();
	};

	// 初始请求第一页
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="m-4 mt-24 text-lg font-bold">基础用法</div>
			<Pagination total={total} />

			<div className="mx-4 mt-8 text-lg font-bold">事件监听</div>
			<div className="mx-4 mb-2 text-sm">当前页码：{current}</div>
			<Pagination total={total} onPre={(c) => setCurrent(c)} onNext={(c) => setCurrent(c)} onChange={(c) => setCurrent(c)} />

			<div className="mx-4 mt-24 text-lg font-bold">初始展示省略页码</div>
			<div className="mx-4 mb-4 text-xs">可用于引导用户</div>
			<Pagination total={total} showNextOmitPage />

			<div className="m-4 mt-8 text-lg font-bold">设置初始页</div>
			<Pagination total={total} current={10} />

			<div className="mx-4 mt-8 text-lg font-bold">最大显示 11 页</div>
			<div className="mx-4 mb-4 text-xs">同时显示较多页但页码较小</div>
			<Pagination maxShowPage={11} total={total} />

			<div className="mx-4 mt-8 text-lg font-bold">最大显示 5 页</div>
			<div className="mx-4 mb-4 text-xs">适合分页区域较小的场景</div>
			<div className="flex items-center">
				<div className="px-4">这是我的地盘</div>
				<div className="flex-1">
					<Pagination maxShowPage={5} total={total} />
				</div>
			</div>

			<div className="m-4 mt-8 text-lg font-bold">无数据</div>
			<Pagination total={0} />

			<div className="m-4 mt-8 text-lg font-bold">仅一页</div>
			<Pagination total={8} />

			<div className="mx-4 mt-8 text-lg font-bold">总页数未超过最大显示页数</div>
			<div className="mx-4 mb-4 text-xs">不会存在省略页码</div>
			<Pagination total={70} />

			<div className="mx-4 mt-8 text-lg font-bold">总页数超过最大显示页数但不算多</div>
			<div className="mx-4 mb-4 text-xs">不会同时存在前后两个省略页码</div>
			<Pagination total={90} maxShowPage={7} />

			<div className="mx-4 mt-8 text-lg font-bold">总页数很多</div>
			<div className="mx-4 mb-4 text-xs">会同时存在前后两个省略页码</div>
			<Pagination total={total} />

			<div className="m-4 mt-8 text-lg font-bold">每页仅 3 项</div>
			<Pagination total={50} pageSize={3} />

			<div className="m-4 mt-8 text-lg font-bold">高亮页码为边框</div>
			<Pagination total={total} type="border" />

			<div className="m-4 mt-8 text-lg font-bold">高亮页码为块状</div>
			<Pagination total={total} type="block" />

			<div className="m-4 mt-8 text-lg font-bold">增加高亮页码圆角</div>
			<Pagination total={total} type="block" radius="xl" />

			<div className="m-4 mt-8 text-lg font-bold">省略页码列数为 2</div>
			<Pagination total={total} pageCol={2} />

			<div className="m-4 mt-8 text-lg font-bold">白色背景</div>
			<Pagination total={total} bg="white" />

			<div className="m-4 mt-8 text-lg font-bold">主题色背景</div>
			<Pagination total={total} bg="theme" />

			<div className="m-4 mt-8 text-lg font-bold">注入 injClass</div>
			<Pagination total={total} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />

			<div className="m-4 mt-8 text-lg font-bold">模拟请求</div>
			<div className="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
				{data.map((item, index) => (
					<div key={index} className={pageSize > 1 ? 'py-6' : ''}>
						<div className="text-justify text-sm">{item.text}</div>
						<div className={`mt-1 text-right${item.fromItalic ? ' italic' : ''}`}>{item.from}</div>
					</div>
				))}
				{loading && (
					<div className="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
						<div>查询第 {currentPage} 页数据...</div>
						<Loading />
					</div>
				)}
			</div>
			<Pagination pageSize={pageSize} total={totalData} onChange={changePageFunc} />

			<div className="mx-4 mt-8 text-lg font-bold">连续模式</div>
			<div className="mx-4 mb-4 text-xs">只允许点击上下页</div>
			<Pagination total={total} continuous />

			<div className="pb-10"></div>
		</>
	);
}

export default PaginationZh;
