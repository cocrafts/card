import { navigate } from 'stacks/Browser/shared';

export interface ButtonText {
	title: string;
	isAvailable: boolean;
	onPress?: () => void;
}

export const buttonList: ButtonText[] = [
	{
		title: 'Play on Web',
		isAvailable: true,
		onPress: () => navigate('Game'),
	},
	{
		title: 'Mobile App',
		isAvailable: false,
	},
	{
		title: 'Desktop App',
		isAvailable: false,
	},
];

export const socialLinkList: SocialLink[] = [
	{
		href: 'https://discord.gg/sXcz9Em4AR',
		Component: DiscordIcon,
		props: {
			size: 42,
		},
	},
	{
		href: 'https://twitter.com/PlayUnderRealm',
		Component: TwitterIcon,
		props: {
			size: 40,
		},
	},
	{
		href: 'https://www.facebook.com/playunderrealm/',
		Component: FacebookIcon,
		props: {
			size: 21,
		},
	},
	{
		href: 'https://www.instagram.com/playunderrealm/',
		Component: InstagramIcon,
		props: {
			size: 32,
		},
	},
	{
		href: 'https://underrealm.substack.com/',
		Component: SubstackIcon,
		props: {
			size: 28,
		},
	},
	{
		href: 'https://github.com/cocrafts',
		Component: GithubIcon,
		props: {
			size: 32,
		},
	},
];
