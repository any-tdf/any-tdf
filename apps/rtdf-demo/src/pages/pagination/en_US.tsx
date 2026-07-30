import { useState, useEffect } from 'react';
import { Pagination, Loading } from 'rtdf/components';
import { aphorisms } from '@any-tdf/site-common/data';

function PaginationEn() {
	// Total count, usually from backend API
	const total = 200;

	// Current page, for event listening demo
	const [current, setCurrent] = useState(1);

	// Simulate data request
	const [data, setData] = useState<{ text: string; from: string; fromItalic?: boolean }[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 4;
	const [totalData, setTotalData] = useState(0);
	const [loading, setLoading] = useState(false);

	const getData = () => {
		setLoading(true);
		// Use setTimeout to simulate request
		setTimeout(() => {
			setLoading(false);
			// Randomly pick pageSize items from aphorisms
			const randomData = [...aphorisms].sort(() => Math.random() - 0.5).slice(0, pageSize);
			setData(randomData);
			setTotalData(64);
		}, 2000);
	};

	const changePageFunc = (c: number) => {
		setCurrentPage(c);
		getData();
	};

	// Initial request for first page
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="m-4 mt-24 text-lg font-bold">Basic usage</div>
			<Pagination total={total} />

			<div className="mx-4 mt-8 text-lg font-bold">Event listening</div>
			<div className="mx-4 mb-2 text-sm">Current page: {current}</div>
			<Pagination total={total} onPre={(c) => setCurrent(c)} onNext={(c) => setCurrent(c)} onChange={(c) => setCurrent(c)} />

			<div className="mx-4 mt-24 text-lg font-bold">Initial display omitted page</div>
			<div className="mx-4 mb-4 text-xs">Can be used to guide users</div>
			<Pagination total={total} showNextOmitPage />

			<div className="m-4 mt-8 text-lg font-bold">Set initial page</div>
			<Pagination total={total} current={10} />

			<div className="mx-4 mt-8 text-lg font-bold">Max display 11 pages</div>
			<div className="mx-4 mb-4 text-xs">Display more pages but the page number is small</div>
			<Pagination maxShowPage={11} total={total} />

			<div className="mx-4 mt-8 text-lg font-bold">Max display 5 pages</div>
			<div className="mx-4 mb-4 text-xs">Suitable for scenes with a small paging area</div>
			<div className="flex items-center">
				<div className="px-4">This is my territory</div>
				<div className="flex-1">
					<Pagination maxShowPage={5} total={total} />
				</div>
			</div>

			<div className="m-4 mt-8 text-lg font-bold">No data</div>
			<Pagination total={0} />

			<div className="m-4 mt-8 text-lg font-bold">Only one page</div>
			<Pagination total={8} />

			<div className="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
			<div className="mx-4 mb-4 text-xs">No omitted page</div>
			<Pagination total={70} />

			<div className="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
			<div className="mx-4 mb-4 text-xs">No omitted page</div>
			<Pagination total={90} maxShowPage={7} />

			<div className="mx-4 mt-8 text-lg font-bold">Total pages are many</div>
			<div className="mx-4 mb-4 text-xs">Will exist two omitted pages</div>
			<Pagination total={total} />

			<div className="m-4 mt-8 text-lg font-bold">Each page is only 3 items</div>
			<Pagination total={50} pageSize={3} />

			<div className="m-4 mt-8 text-lg font-bold">Highlighted page is border</div>
			<Pagination total={total} type="border" />

			<div className="m-4 mt-8 text-lg font-bold">Highlighted page is block</div>
			<Pagination total={total} type="block" />

			<div className="m-4 mt-8 text-lg font-bold">Increase the radius of the highlighted page</div>
			<Pagination total={total} type="block" radius="xl" />

			<div className="m-4 mt-8 text-lg font-bold">Omitted page column is 2</div>
			<Pagination total={total} pageCol={2} />

			<div className="m-4 mt-8 text-lg font-bold">White background</div>
			<Pagination total={total} bg="white" />

			<div className="m-4 mt-8 text-lg font-bold">Theme background</div>
			<Pagination total={total} bg="theme" />

			<div className="m-4 mt-8 text-lg font-bold">Inject injClass</div>
			<Pagination total={total} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />

			<div className="m-4 mt-8 text-lg font-bold">Simulate request</div>
			<div className="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
				{data.map((item, index) => (
					<div key={index} className={pageSize > 1 ? 'py-6' : ''}>
						<div className="text-justify text-sm">{item.text}</div>
						<div className={`mt-1 text-right${item.fromItalic ? ' italic' : ''}`}>{item.from}</div>
					</div>
				))}
				{loading && (
					<div className="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
						<div>Querying the {currentPage} page data...</div>
						<Loading />
					</div>
				)}
			</div>
			<Pagination pageSize={pageSize} total={totalData} onChange={changePageFunc} />

			<div className="mx-4 mt-8 text-lg font-bold">Continuous mode</div>
			<div className="mx-4 mb-4 text-xs">Only allow clicking on the previous and next pages</div>
			<Pagination total={total} continuous />

			<div className="pb-10"></div>
		</>
	);
}

export default PaginationEn;
