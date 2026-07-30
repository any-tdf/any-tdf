import { Placeholder, Grids, Grid } from 'rtdf/components';

function PlaceholderEn() {
	return (
		<>
			<div className="m-4 text-lg font-bold">Basic usage</div>
			<Placeholder>Basic usage</Placeholder>

			<div className="m-4 text-lg font-bold">Set height</div>
			<Placeholder height="32">High for 32</Placeholder>

			<div className="m-4 text-lg font-bold">Different fillet</div>
			<div className="flex flex-col space-y-4">
				<Placeholder radius="none">unfillet</Placeholder>
				<Placeholder radius="xl">XL Rounded corner</Placeholder>
				<Placeholder radius="4xl">Full fillet</Placeholder>
			</div>

			<div className="m-4 text-lg font-bold">shaded</div>
			<Placeholder shadow="md">shadow</Placeholder>

			<div className="m-4 text-lg font-bold">customize injClass</div>
			<Placeholder height="24" injClass="rtdf-demo-gradient-primary !text-white">
				Gradient background
			</Placeholder>

			<div className="m-4 text-lg font-bold">Combined with Grids</div>
			<Grids>
				<Grid row="3" col="2">
					<Placeholder>3﹡2</Placeholder>
				</Grid>
				<Grid col="3">
					<Placeholder>1﹡3</Placeholder>
				</Grid>
				<Grid row="3">
					<Placeholder>3﹡1</Placeholder>
				</Grid>
				<Grid row="2" col="2">
					<Placeholder>2﹡2</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
				<Grid>
					<Placeholder>1﹡1</Placeholder>
				</Grid>
			</Grids>
			<div className="pb-4" />
		</>
	);
}

export default PlaceholderEn;
