const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.ENV === 'production';

const copyAssets = (configs) => {
	configs.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');
						return !isTemplate;
					},
				},
			],
		}),
	);

	return configs;
};

const injectEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env();
	const gitBranch = process.env.gitBranch || 'dev';
	const isProduction = internal.configs.isProduction(env);

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		gitBranch: JSON.stringify(gitBranch),
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
	});

	return configs;
};

const splitBundle = (configs) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: ['rn-libs'],
		},
		'rn-libs': {
			import: [
				'react-native',
				'react-native-reanimated',
				'react-native-gesture-handler',
				'@react-native-async-storage/async-storage',
				'@react-navigation/native',
				'@react-navigation/stack',
			],
		},
	};

	return configs;
};

const swcOptions = () => ({
	jsc: {
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
		minify: isProd
			? {
					compress: true,
					mangle: true,
					format: {
						comments: false,
					},
			  }
			: {},
	},
	env: {
		targets: {
			chrome: '67',
			edge: '79',
			firefox: '68',
			opera: '54',
			safari: '14',
		},
	},
});

module.exports = {
	copyAssets,
	injectEnvironments,
	splitBundle,
	swcOptions,
};
