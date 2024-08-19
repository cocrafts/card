const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');

const setEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env;
	const gitBranch = process.env.gitBranch || 'dev';
	const isProduction = internal.configs.isProduction;

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		gitBranch: JSON.stringify(gitBranch),
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
	});

	return configs;
};

const copyAssets = (configs) => {
	configs.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						return !(uri.endsWith('.ejs') || uri.endsWith('.sass'));
					},
				},
			],
		}),
	);

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

const babelLoaderAsFallback = (configs) => {
	configs.module.rules.push({
		test: /\.js$/,
		include: /node_modules\/react-native-inappbrowser-reborn/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	});

	return configs;
};

module.exports = {
	// this flag is not valid by latest metacraft cli
	// useBabel: true,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [
		web3Polyfills,
		setEnvironments,
		copyAssets,
		splitBundle,
		babelLoaderAsFallback,
	],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
