import { ImageSourcePropType } from 'react-native';
import resources from 'utils/resources';

export interface CardTypeItem {
	title: string;
	content: string[];
	image: ImageSourcePropType;
}

export const cardTypeList: CardTypeItem[] = [
	{
		title: 'Hero',
		content: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos saepe nam, magni, quo error debitis molestiae commodi ea laborum ipsa est esse illum voluptatum illo. Deleniti iste neque ex blanditiis odit, fugiat quia sed quod. Vel suscipit officia ullam quisquam!',
		],
		image: resources.home.cardTypesSpellVisual,
	},
	{
		title: 'Spell',
		content: [
			'Spell cards do not have **a** set amount of attack/ defense/ health points on the card design.',
			'Spell cards can be used to cast potentially match-turning spells determined by their text. Use spell cards to reinforce your creatures and play style, from supportive to damaging spells. Once a spell card has been used, the card will be sent to the void.',
		],
		image: resources.home.cardTypesSpellVisual,
	},
	{
		title: 'Troop',
		content: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos saepe nam, magni, quo error debitis molestiae commodi ea laborum ipsa est esse illum voluptatum illo. Deleniti iste neque ex blanditiis odit, fugiat quia sed quod. Vel suscipit officia ullam quisquam!',
		],
		image: resources.home.cardTypesSpellVisual,
	},
];
