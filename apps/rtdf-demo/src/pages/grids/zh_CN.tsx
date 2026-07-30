import { useState, useEffect, useMemo } from 'react';
import { Grids, Grid, Placeholder, Switch, Icon, Button } from 'rtdf/components';

export default function GridsPage() {
	const devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
	const [curentIndex, setCurentIndex] = useState(0);
	const [color, setColor] = useState(false);

	const currentDevice = useMemo(() => devices[curentIndex], [curentIndex]);

	const changeDeviceFun = () => {
		setCurentIndex((prev) => (prev === devices.length - 1 ? 0 : prev + 1));
	};

	const changeColorFun = (active: boolean) => {
		setColor(active);
	};

	// 获取当前时间 - 使用 useMemo 优化性能
	const timeInfo = useMemo(() => {
		const date = new Date();
		const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const time = `${hour}:${minute}`;

		// 获取当前月份转为汉字
		const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		const monthIndex = date.getMonth();
		const month = monthArr[monthIndex];
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

		// 获取中文周几
		const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		const weekDay = week[date.getDay()];

		return { time, month, day, weekDay };
	}, []);

	// 使用定时器更新时间
	const [currentTime, setCurrentTime] = useState(timeInfo.time);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
			const minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
			setCurrentTime(`${hour}:${minute}`);
		};

		updateTime();
		const interval = setInterval(updateTime, 60000); // 每分钟更新一次
		return () => clearInterval(interval);
	}, []);

	const colorCss = color ? ' bg-gradient-to-tr from-extend0/70 to-extend2/70' : ' bg-gray-100 dark:bg-gray-700';

	return (
		<>
			<div className="mt-8 px-4 font-bold">使用占位符示例 3﹡4</div>
			<Grids cols="4">
				<Grid row="3">
					<Placeholder>3﹡1</Placeholder>
				</Grid>
				<Grid col="3">
					<Placeholder>1﹡3</Placeholder>
				</Grid>
				<Grid row="2">
					<Placeholder>2﹡1</Placeholder>
				</Grid>
				<Grid col="2">
					<Placeholder>1﹡2</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
			</Grids>

			<div className="mt-8 px-4 font-bold">使用占位符示例 4﹡6</div>
			<Grids>
				<Grid row="3" col="2">
					<Placeholder>3﹡2</Placeholder>
				</Grid>
				<Grid col="3">
					<Placeholder>1﹡3</Placeholder>
				</Grid>
				<Grid row="4">
					<Placeholder>4﹡1</Placeholder>
				</Grid>
				<Grid row="2">
					<Placeholder>2﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid col="4">
					<Placeholder>1﹡4</Placeholder>
				</Grid>
			</Grids>

			<div className="mt-8 px-4 font-bold">增加外边距与单元格间距</div>
			<Grids cols="4" gap="4" mx="8" my="8">
				<Grid row="3">
					<Placeholder>3﹡1</Placeholder>
				</Grid>
				<Grid col="3">
					<Placeholder>1﹡3</Placeholder>
				</Grid>
				<Grid row="2">
					<Placeholder>2﹡1</Placeholder>
				</Grid>
				<Grid col="2">
					<Placeholder>1﹡2</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
			</Grids>

			<div className="mt-8 px-4 font-bold">场景示例 6﹡5</div>
			<div className="pb-8 pt-2">
				<div className={`mx-2 rounded-xl p-2 shadow-sm transition duration-300${colorCss}`}>
					<Grids cols="5" mx="0" my="0">
						<Grid row="3">
							<div className="flex h-full flex-col justify-between rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div>{timeInfo.weekDay}</div>
								<div className="text-4xl">{timeInfo.day}</div>
								<div className="text-gray-600">{timeInfo.month}</div>
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col justify-center rounded-lg bg-white p-1 text-center text-xl font-bold shadow-sm dark:bg-black dark:shadow-white/10">
								{currentTime}
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div className="flex justify-center">
									<Switch
										radius="full"
										active={color}
										onChange={changeColorFun}
										falseChild={
											<div>
												<Icon name="ri-paint-brush-line" size={12} />
											</div>
										}
										trueChild={
											<div>
												<Icon name="ri-paint-brush-fill" size={12} theme />
											</div>
										}
									/>
								</div>
								<div>彩色</div>
							</div>
						</Grid>

						<Grid row="2" col="2">
							<div className="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<Button fill="lineState" radius="full" onClick={changeDeviceFun}>
									切换设备
								</Button>
							</div>
						</Grid>
						<Grid row="2" col="2">
							<div className="flex h-full justify-around rounded-lg bg-white p-1 py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div className="flex flex-col justify-center">
									{currentDevice === 'iOS' && <Icon name="ri-apple-fill" size={30} />}
									{currentDevice === 'Android' && <Icon name="ri-android-fill" size={30} />}
									{currentDevice === 'Windows' && <Icon name="ri-windows-fill" size={30} />}
									{currentDevice === 'macOS' && <Icon name="ri-command-fill" size={30} />}
									{currentDevice === 'Ubuntu' && <Icon name="ri-ubuntu-fill" size={30} />}
								</div>
								<div className="flex flex-col justify-around">
									<div className="text-sm">
										{currentDevice === 'iOS' && 'A15 Bionic'}
										{currentDevice === 'Android' && '骁龙 8 Gen1'}
										{currentDevice === 'Windows' && 'AMD YES'}
										{currentDevice === 'macOS' && 'M1 Ultra'}
										{currentDevice === 'Ubuntu' && 'Intel'}
									</div>
									<div>
										{currentDevice === 'iOS' && 'iPhone'}
										{currentDevice === 'Android' && 'Android'}
										{currentDevice === 'Windows' && 'Windows'}
										{currentDevice === 'macOS' && 'MacBook Pro'}
										{currentDevice === 'Ubuntu' && 'Ubuntu'}
									</div>
								</div>
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div className="flex justify-center">
									<Switch
										radius="full"
										falseChild={
											<div>
												<Icon name="ri-bluetooth-line" size={12} y={-1} />
											</div>
										}
										trueChild={
											<div>
												<Icon name="ri-bluetooth-connect-line" size={12} theme y={-1} />
											</div>
										}
									/>
								</div>
								<div>蓝 牙</div>
							</div>
						</Grid>
						<Grid row="4">
							<div className="flex h-full flex-col items-center justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div className="w-1/2 overflow-hidden">
									<img className="block dark:hidden" src="/assets/rtdf_512px.png" alt="" />
									<img className="hidden dark:block" src="/assets/rtdf_dark_512px.png" alt="" />
								</div>
								<div>RTDF</div>
							</div>
						</Grid>
						<Grid row="3">
							<div className="flex h-full flex-col justify-around rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div>92%</div>
								<div className="animate-pulse">
									<Icon name="ri-battery-2-charge-line" size={30} injClass="text-extend1" />
								</div>
								<div>充电中</div>
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col justify-center rounded-lg bg-white text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								{currentDevice === 'iOS' && <Icon name="ri-smartphone-line" size={30} />}
								{currentDevice === 'Android' && <Icon name="ri-tablet-line" size={30} />}
								{currentDevice === 'Windows' && <Icon name="ri-computer-line" size={30} />}
								{currentDevice === 'macOS' && <Icon name="ri-macbook-fill" size={30} />}
								{currentDevice === 'Ubuntu' && <Icon name="ri-ubuntu-line" size={30} />}
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col items-center justify-around rounded-lg bg-white py-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div>
									<Icon name="ri-sun-line" size={20} />
								</div>
								<div>
									<div>68%</div>
								</div>
							</div>
						</Grid>
						<Grid row="2">
							<div className="flex h-full flex-col justify-around rounded-lg bg-white p-1 text-center text-xs shadow-sm dark:bg-black dark:shadow-white/10">
								<div className="flex justify-center">
									<Switch
										radius="full"
										falseChild={
											<div>
												<Icon name="ri-wifi-off-line" size={12} />
											</div>
										}
										trueChild={
											<div>
												<Icon name="ri-wifi-line" size={12} theme />
											</div>
										}
									/>
								</div>
								<div>Wi-Fi</div>
							</div>
						</Grid>
					</Grids>
				</div>
			</div>
		</>
	);
}
