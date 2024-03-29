import { proxy } from 'valtio';
import { Profile } from 'utils/types/graphql';

export interface AccountState {
	profile: Profile;
	loading: boolean;
	forceConnect: boolean;
}

export const accountState = proxy<AccountState>({
	profile: {} as never,
	loading: true,
	forceConnect: false,
});
