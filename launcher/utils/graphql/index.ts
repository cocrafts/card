import type { DefaultOptions, Operation } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import configs from 'utils/config';
import { extractJwt } from 'utils/lib/auth';

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const uri = __DEV__
	? 'http://localhost:3005/graphql'
	: 'https://api.stormgate.io/graphql';

const basicLink = new HttpLink({ uri, fetch });
const authLink = setContext(async (_, { headers: originalHeaders }) => {
	const token = await extractJwt();
	const headers = {
		'client-key': configs.clientKey,
		...originalHeaders,
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return { headers };
});

const httpLink = authLink.concat(basicLink);
const socketLink = new WebSocketLink({
	uri: 'wss://94zbw8sdk9.execute-api.ap-northeast-1.amazonaws.com/prod',
	options: { reconnect: true },
});

const splitter = ({ query }: Operation) => {
	const definition = getMainDefinition(query);
	return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	);
};

export const memoryCache = new InMemoryCache();

export const graphQlClient = new ApolloClient({
	link: split(splitter, socketLink, httpLink),
	cache: memoryCache,
	defaultOptions,
});
