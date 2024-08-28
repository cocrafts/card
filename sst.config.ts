import type { SSTConfig } from 'sst';

import Landing from './tool/stacks/landing';

export default {
	config() {
		return {
			name: 'under-realm',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Landing);
	},
} satisfies SSTConfig;
