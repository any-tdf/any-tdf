import { Link } from 'react-router-dom';
import { useAppContext } from '../store/appStore';

const NotFound = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="flex items-center gap-1">
					<div className="text-primary dark:text-dark mb-4 text-9xl font-bold">4</div>
					<div>
						<svg viewBox="0 0 100 100" className="svg-spin size-20">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M50 0V100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
								className="fill-dark"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M50 100V0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100Z"
								className="fill-primary"
							/>
							<circle cx="50" cy="25" r="25" className="fill-primary" />
							<circle cx="50" cy="75" r="25" className="fill-dark" />
							<circle cx="50.25" cy="25.25" r="6.25" className="fill-dark" />
							<circle cx="50.25" cy="75.25" r="6.25" className="fill-primary" />
						</svg>
					</div>
					<div className="text-primary dark:text-dark mb-4 text-9xl font-bold">4</div>
				</div>
				<p className="mb-8 text-black/60 dark:text-white/60">{isZh ? '抱歉，页面未找到' : 'Sorry, page not found'}</p>
				<Link to="/" className="bg-primary dark:bg-dark rounded px-6 py-2 text-white hover:opacity-90 dark:text-black">
					{isZh ? '返回首页' : 'Back to home'}
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
