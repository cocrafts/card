import { WalletAdapterNetwork as Network } from '@solana/wallet-adapter-base';

const isDevBranch = gitBranch === 'dev';

const Mainnet =
	'https://solana-mainnet.g.alchemy.com/v2/bR8GpIKSKAKyUqb9hNV0HRRNgyjh9eIg';

interface Configs {
	clientKey: string;
	defaultNetwork: Network | string;
}

export default {
	clientKey:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhvbWUiLCJpYXQiOjE2NTA0MDQ2MzV9.wBHZOC5odvk9u7Izi6Z-pEzIv8IJjafH94vYpCuWUy0',
	defaultNetwork: isDevBranch ? Network.Devnet : Mainnet,
} as Configs;
