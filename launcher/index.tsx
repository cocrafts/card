import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as MetacraftProvider } from '@metacraft/ui';
import type { WalletError } from '@solana/wallet-adapter-base';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import BrowserStack from 'stacks/Browser/Container';
import { graphQlClient } from 'utils/graphql';
import { clusterUrl } from 'utils/helper';
import { useAppInit, useSnapshot } from 'utils/hook';
import { stateActions } from 'utils/state';
import { accountState } from 'utils/state/account';
import { appState } from 'utils/state/app';
import { launcherTheme } from 'utils/theme';

export const App: FC = () => {
	const { network } = useSnapshot(appState);
	const endpoint = useMemo(() => clusterUrl(network), [network]);
	const { profile, loading, forceConnect } = useSnapshot(accountState);
	const autoConnect = forceConnect || (!loading && !profile.id);

	const useError = () => {
		return useCallback((error: WalletError) => {
			console.log(error);
		}, []);
	};

	useAppInit({
		withProfileFetch: true,
		onSignOut: () => {
			stateActions.clearAll();
		},
	});

	return (
		<ApolloProvider client={graphQlClient}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider
					autoConnect={autoConnect}
					wallets={[]}
					onError={useError}
				>
					<MetacraftProvider theme={launcherTheme}>
						<BrowserStack />
					</MetacraftProvider>
				</WalletProvider>
			</ConnectionProvider>
		</ApolloProvider>
	);
};

export default App;
