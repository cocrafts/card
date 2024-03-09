const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');

const {
	swcOptions,
	copyAssets,
	injectEnvironments,
} = require('./tool/webpack');

// const extraPolyfills = (configs) => {
// 	configs.resolve.fallback['vm'] = require.resolve('vm-browserify');

// 	return configs;
// };

module.exports = {
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	swcOptions,
	buildId: () => 'app',
	webpackMiddlewares: [
		web3Polyfills,
		// extraPolyfills,
		injectEnvironments,
		copyAssets,
		// splitBundle,
	],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
			'react-native-inappbrowser-reborn': 'launcher/vendor/inAppBrowser',
		},
	},
};
