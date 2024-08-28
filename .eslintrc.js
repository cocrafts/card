module.exports = {
	root: true,
	extends: ['@walless/eslint-config'],
	ignorePatterns: [
		'node_modules',
		'launcher/utils/types/graphql.ts',
		'game/assets/scripts/util/graphql.ts',
	],
	env: {
		node: true,
	},
	globals: {
		module: true,
		require: true,
		document: true,
		ethereum: true,
	},
};
