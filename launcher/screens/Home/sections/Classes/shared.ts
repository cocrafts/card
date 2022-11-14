import { ImageSourcePropType } from 'react-native';
import resources from 'utils/resources';

export interface ClassItem {
	id: string;
	title: string;
	color: string;
	image: {
		backgroundActive: ImageSourcePropType;
		logoBackgroundActive: ImageSourcePropType;
		logo: ImageSourcePropType;
		logoActive: ImageSourcePropType;
	};
	description: string;
	specialty: string[];
	position: {
		x: number;
		y: number;
	};
}

export const classList: ClassItem[] = [
	{
		id: 'summoner',
		title: 'SUMMONER',
		color: '#3abd9d',
		image: {
			backgroundActive: resources.home.classes.summoner.backgroundActive,
			logoBackgroundActive:
				resources.home.classes.summoner.logoBackgroundActive,
			logo: resources.home.classes.summoner.logo,
			logoActive: resources.home.classes.summoner.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summon troop card', "Control enemy's card"],
		position: {
			x: 0,
			y: 0,
		},
	},
	{
		id: 'assassin',
		title: 'ASSASSIN',
		color: '#651318',
		image: {
			backgroundActive: resources.home.classes.assassin.backgroundActive,
			logoBackgroundActive:
				resources.home.classes.assassin.logoBackgroundActive,
			logo: resources.home.classes.assassin.logo,
			logoActive: resources.home.classes.assassin.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summon troop card', "Control enemy's card"],
		position: {
			x: 233,
			y: 0,
		},
	},
	{
		id: 'wizard',
		title: 'WIZARD',
		color: '#5295e7',
		image: {
			backgroundActive: resources.home.classes.wizard.backgroundActive,
			logoBackgroundActive: resources.home.classes.wizard.logoBackgroundActive,
			logo: resources.home.classes.wizard.logo,
			logoActive: resources.home.classes.wizard.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summon troop card', "Control enemy's card"],
		position: {
			x: 460,
			y: 0,
		},
	},
	{
		id: 'tanker',
		title: 'TANKER',
		color: '#be3126',
		image: {
			backgroundActive: resources.home.classes.tanker.backgroundActive,
			logoBackgroundActive: resources.home.classes.tanker.logoBackgroundActive,
			logo: resources.home.classes.tanker.logo,
			logoActive: resources.home.classes.tanker.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summon troop card', "Control enemy's card"],
		position: {
			x: 460,
			y: 324,
		},
	},
	{
		id: 'knight',
		title: 'KNIGHT',
		color: '#c67e44',
		image: {
			backgroundActive: resources.home.classes.knight.backgroundActive,
			logoBackgroundActive: resources.home.classes.knight.logoBackgroundActive,
			logo: resources.home.classes.knight.logo,
			logoActive: resources.home.classes.knight.logoActive,
		},
		description:
			'The Summoner Clan Chieftain is Indlovu the Beast, and his people are well-known for their extraordinary ability to communicate to wild beast and make them into reliable combat partners.',
		specialty: ['Summon troop card', "Control enemy's card"],
		position: {
			x: 0,
			y: 324,
		},
	},
];
