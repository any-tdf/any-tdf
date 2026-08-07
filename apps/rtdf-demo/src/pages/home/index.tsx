import { menuList, type MenuListChild } from '@any-tdf/site-common/data';
import { Link } from 'react-router-dom';
import { Cell, CellGroup } from 'rtdf/components';

type HomeProps = {
	lang: 'zh_CN' | 'en_US';
	onChangeLang: (lang: 'zh_CN' | 'en_US') => void;
};

function Home({ lang, onChangeLang }: HomeProps) {
	const menuListArr: MenuListChild[] = menuList.reduce((acc, cur) => {
		if (cur.childs) {
			acc.push(...cur.childs);
		}
		return acc;
	}, [] as MenuListChild[]);

	// 语言由 App 统一管理，切换时通过 onChangeLang 写 storage 并更新状态，不再整页刷新
	const isZh = lang === 'zh_CN';
	const changeLangFunc = () => {
		onChangeLang(isZh ? 'en_US' : 'zh_CN');
	};

	return (
		<div>
			<div className="mb-2 mt-8 flex h-14 flex-col items-center justify-center">
				<img className="size-14 object-contain dark:hidden" src="/rtdf.svg" alt="RTDF" />
				<img className="hidden size-14 object-contain dark:block" src="/rtdf_dark.svg" alt="RTDF" />
			</div>
			<a href="https://rtdf.dev" target="_blank" rel="noreferrer">
				<div className="text-center text-lg underline">rtdf.dev</div>
			</a>
			<div className="flex flex-col py-4">
				<div>
					{menuList.map((menu) => (
						<div key={menu.class}>
							<div className="mb-2 mt-8 px-4 text-sm text-gray-500">{isZh ? menu.class : menu.class_en}</div>
							<CellGroup>
								{menu.childs.map((child, i) => (
									<Link to={child.nav + (isZh ? '/zh_CN' : '/en_US')} key={child.nav}>
										<Cell
											title={isZh ? child.title : child.title_en}
											mx="0"
											my="0"
											shadow="none"
											radius="none"
											line={i !== menu.childs.length - 1}
										/>
									</Link>
								))}
							</CellGroup>
						</div>
					))}
				</div>
			</div>
			<div className="p-4">
				{isZh ? '当前组件总数：' : 'Current number of components: '}
				{menuListArr.length}
			</div>
			<div className="text-primary dark:text-dark flex justify-around p-4 text-xs underline">
				<button onClick={changeLangFunc} className="text-primary dark:text-dark">
					{isZh ? 'English' : '简体中文'}
				</button>
			</div>
		</div>
	);
}

export default Home;
