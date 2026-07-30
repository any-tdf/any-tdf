import { Skeleton } from 'rtdf/components';

export default function SkeletonEnPage() {
	return (
		<div className="p-2">
			<div className="m-4 text-lg font-bold">Pulse Effect</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" effect="pulse" />
				<div className="grow">
					<Skeleton width="32" height="8" effect="pulse" />
					<Skeleton type="p" effect="pulse" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Wave Effect</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" effect="wave" />
				<div className="grow">
					<Skeleton width="32" height="8" effect="wave" />
					<Skeleton type="p" effect="wave" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">No Animation</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" effect="none" />
				<div className="grow">
					<Skeleton width="32" height="8" effect="none" />
					<Skeleton type="p" effect="none" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Breathe Effect</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" effect="breathe" />
				<div className="grow">
					<Skeleton width="32" height="8" effect="breathe" />
					<Skeleton type="p" effect="breathe" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Gray Background</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" bg="gray" />
				<div className="grow">
					<Skeleton width="32" height="8" bg="gray" />
					<Skeleton type="p" bg="gray" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Theme Background</div>
			<div className="flex">
				<Skeleton width="16" height="16" radius="4xl" bg="theme" />
				<div className="grow">
					<Skeleton width="32" height="8" bg="theme" />
					<Skeleton type="p" bg="theme" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Example 1</div>
			<div className="flex justify-between">
				<Skeleton width="16" height="16" />
				<Skeleton width="16" height="16" />
				<Skeleton width="16" height="16" />
				<Skeleton width="16" height="16" />
			</div>
			<Skeleton width="32" height="8" />
			<Skeleton type="p" lines={5} />

			<div className="m-4 text-lg font-bold">Example 3</div>
			<div className="flex">
				<Skeleton type="img" width="24" height="24" />
				<div className="grow">
					<Skeleton type="p" />
				</div>
			</div>

			<div className="m-4 text-lg font-bold">Example 4</div>
			<div className="flex">
				<div className="grow">
					<Skeleton width="32" height="8" />
					<Skeleton type="p" />
				</div>
				<Skeleton type="video" width="32" height="32" />
			</div>

			<div className="m-4 text-lg font-bold">Example 5</div>
			<div className="flex flex-col items-center">
				<Skeleton width="24" height="24" radius="4xl" />
				<Skeleton width="16" height="6" />
				<Skeleton width="32" height="4" />
				<Skeleton type="qrcode" width="64" height="64" />
			</div>

			<div className="m-4 text-lg font-bold">Example 6</div>
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index}>
					<div className="flex items-center justify-between">
						<div className="flex">
							<div className="flex">
								<Skeleton width="12" height="12" radius="4xl" />
								<div className="flex flex-col justify-between">
									<Skeleton width="16" height="6" />
									<Skeleton width="32" height="4" />
								</div>
							</div>
						</div>
						<Skeleton width="16" height="8" radius="4xl" />
					</div>
					<Skeleton width="full" height="1" />
				</div>
			))}
		</div>
	);
}
