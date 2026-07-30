const linkageData = [
	{
		label: 'California',
		children: [
			{
				label: 'Los Angeles',
				children: [
					{ label: 'Downtown' },
					{ label: 'Hollywood' },
					{ label: 'Venice' },
					{ label: 'Santa Monica' },
					{ label: 'Beverly Hills' }
				]
			},
			{
				label: 'San Francisco',
				children: [
					{ label: 'Downtown' },
					{ label: 'Mission District' },
					{ label: 'North Beach' },
					{ label: 'Chinatown' },
					{ label: 'Haight-Ashbury' }
				]
			},
			{
				label: 'San Diego',
				children: [
					{ label: 'Downtown' },
					{ label: 'La Jolla' },
					{ label: 'Pacific Beach' },
					{ label: 'Mission Beach' },
					{ label: 'Coronado' }
				]
			}
		]
	},
	{
		label: 'New York',
		children: [
			{
				label: 'New York City',
				children: [{ label: 'Manhattan' }, { label: 'Brooklyn' }, { label: 'Queens' }, { label: 'The Bronx' }, { label: 'Staten Island' }]
			},
			{
				label: 'Buffalo',
				children: [
					{ label: 'Downtown' },
					{ label: 'North Buffalo' },
					{ label: 'South Buffalo' },
					{ label: 'East Side' },
					{ label: 'West Side' }
				]
			}
		]
	},
	{
		label: 'Texas',
		children: [
			{
				label: 'Houston',
				children: [{ label: 'Downtown' }, { label: 'Midtown' }, { label: 'The Heights' }, { label: 'River Oaks' }, { label: 'Memorial' }]
			},
			{
				label: 'Dallas',
				children: [{ label: 'Downtown' }, { label: 'Uptown' }, { label: 'Deep Ellum' }, { label: 'Oak Lawn' }, { label: 'Highland Park' }]
			},
			{
				label: 'Austin',
				children: [
					{ label: 'Downtown' },
					{ label: 'South Congress' },
					{ label: 'East Austin' },
					{ label: 'West Lake Hills' },
					{ label: 'North Loop' }
				]
			}
		]
	},
	{
		label: 'Florida',
		children: [
			{
				label: 'Miami',
				children: [
					{ label: 'Downtown' },
					{ label: 'South Beach' },
					{ label: 'Brickell' },
					{ label: 'Coconut Grove' },
					{ label: 'Little Havana' }
				]
			},
			{
				label: 'Orlando',
				children: [
					{ label: 'Downtown' },
					{ label: 'Winter Park' },
					{ label: 'Lake Nona' },
					{ label: 'College Park' },
					{ label: 'Baldwin Park' }
				]
			}
		]
	},
	{
		label: 'Illinois',
		children: [
			{
				label: 'Chicago',
				children: [
					{ label: 'The Loop' },
					{ label: 'River North' },
					{ label: 'Lincoln Park' },
					{ label: 'Wicker Park' },
					{ label: 'Gold Coast' }
				]
			},
			{
				label: 'Springfield',
				children: [{ label: 'Downtown' }, { label: 'West Side' }, { label: 'East Side' }, { label: 'North End' }, { label: 'South Side' }]
			}
		]
	}
];

const linkageDiffLabeData = [
	{
		province: 'California',
		children: [
			{
				city: 'Los Angeles',
				children: [
					{ region: 'Downtown' },
					{ region: 'Hollywood' },
					{ region: 'Venice' },
					{ region: 'Santa Monica' },
					{ region: 'Beverly Hills' },
					{ region: 'Pasadena' },
					{ region: 'Long Beach' }
				]
			},
			{
				city: 'San Francisco',
				children: [
					{ region: 'Downtown' },
					{ region: 'Mission District' },
					{ region: 'North Beach' },
					{ region: 'Chinatown' },
					{ region: 'Haight-Ashbury' },
					{ region: 'Castro' },
					{ region: 'Pacific Heights' }
				]
			},
			{
				city: 'San Diego',
				children: [
					{ region: 'Downtown' },
					{ region: 'La Jolla' },
					{ region: 'Pacific Beach' },
					{ region: 'Mission Beach' },
					{ region: 'Coronado' },
					{ region: 'North Park' },
					{ region: 'Hillcrest' }
				]
			}
		]
	},
	{
		province: 'New York',
		children: [
			{
				city: 'New York City',
				children: [
					{ region: 'Manhattan' },
					{ region: 'Brooklyn' },
					{ region: 'Queens' },
					{ region: 'The Bronx' },
					{ region: 'Staten Island' },
					{ region: 'Upper East Side' },
					{ region: 'Upper West Side' },
					{ region: 'Greenwich Village' }
				]
			},
			{
				city: 'Buffalo',
				children: [
					{ region: 'Downtown' },
					{ region: 'North Buffalo' },
					{ region: 'South Buffalo' },
					{ region: 'East Side' },
					{ region: 'West Side' },
					{ region: 'Elmwood Village' }
				]
			}
		]
	}
];

export { linkageData, linkageDiffLabeData };
