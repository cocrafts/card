import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import {
	ClassType,
	ElementalType,
	getCardList,
	TemplateFragment,
} from '@metacraft/murg-engine';
import { CardType } from '@metacraft/murg-engine/dist/utils/type';
import { Text } from '@metacraft/ui';
import { useRoute } from '@react-navigation/native';
import CardInDetail from 'components/Card/CardInDetail';
import CardInRarity from 'components/Card/CardInRarity';
import ScrollLayout from 'components/layouts/Scroll';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const RARITY_LEVEL = [3, 6, 9, 12, 15];

const DetailCard: React.FC = () => {
	const route = useRoute();
	const { id } = route.params as { id: string };

	const card = getCardList().find((val) => val.id === id);

	if (!card) return null;

	const keyword =
		typeof card.skill?.template === 'object' &&
		card.skill.template?.find((value) => value.type === 'keyword')?.text;
	const type =
		Object.keys(CardType)[Object.values(CardType).indexOf(card.kind)];
	const className =
		Object.keys(ClassType)[Object.values(ClassType).indexOf(card.class)];
	// const element =
	// 	card?.elemental &&
	// 	Object.keys(ElementalType)[
	// 		Object.values(ElementalType).indexOf(card.elemental)
	// 	];
	const sourceClass = resources.cardLibrary[`detail${className}Icon`];
	// const sourceElement = resources.cardLibrary[`${element?.toLowerCase()}Icon`];

	console.log('selected card', card);

	const fragments = card.skill?.template as TemplateFragment[];

	const renderBreadCrumb = () => {
		return (
			<View style={styles.breadCrumb}>
				<Text style={styles.breadCrumbLabel} responsiveSizes={[16]}>
					{'Card Library'}
				</Text>
				<Image
					source={resources.cardLibrary.rightArrow}
					style={styles.breadCrumbIcon}
				/>
				<Text responsiveSizes={[16]}>{card.name}</Text>
			</View>
		);
	};

	return (
		<ScrollLayout contentContainerStyle={{ backgroundColor: '#251515' }}>
			{renderBreadCrumb()}
			<View style={[styles.rowContainer, iStyles.contentContainer]}>
				<View style={styles.innerContainer}>
					<CardInDetail data={card} />
				</View>
				<View style={styles.innerContainer}>
					<ImageBackground
						source={resources.marketplace.titleSeparator}
						style={styles.nameContainer}
					>
						<Text responsiveSizes={[20]} style={styles.name}>
							{card.name}
						</Text>
					</ImageBackground>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Skill</Text>
						<Text>
							{fragments.map((fragment, i) => {
								return <Text key={i}>{fragment.text}</Text>;
							})}
						</Text>
					</View>
					{keyword && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Keyword</Text>
							<Text>{keyword}</Text>
						</View>
					)}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Properties</Text>
						<View style={{ flexDirection: 'row' }}>
							<View>
								<Text style={styles.propertyKey}>Type</Text>
								<Text>{type}</Text>
							</View>
							<View>
								<Text style={styles.propertyKey}>Class</Text>
								<View style={styles.propertyValue}>
									<Image source={sourceClass} style={styles.iconClass} />
									<Text>{className}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Rarity</Text>
						<Text>Common</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Attribute</Text>
						<View style={styles.attribute}>
							<Image
								source={resources.cardLibrary.attackIcon}
								style={styles.attributeIcon}
							/>
							<Text style={styles.attributeLabel}>Attack</Text>
							<Text>{card.attribute?.attack}</Text>
						</View>
						<View style={styles.attribute}>
							<Image
								source={resources.cardLibrary.defenseIcon}
								style={styles.attributeIcon}
							/>
							<Text style={styles.attributeLabel}>Defense</Text>
							<Text>{card.attribute?.defense}</Text>
						</View>
						<View style={styles.attribute}>
							<Image
								source={resources.cardLibrary.hpIcon}
								style={styles.attributeIcon}
							/>
							<Text style={styles.attributeLabel}>HP</Text>
							<Text>{card.attribute?.health}</Text>
						</View>
					</View>
					<View style={[styles.section, { borderBottomWidth: 0 }]}>
						<Text style={styles.sectionTitle}>Elemental</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
							}}
						>
							{Object.keys(ElementalType).map((elemental) => {
								if (elemental === 'Dark' || elemental === 'Light') return null;
								const source =
									resources.cardLibrary[`${elemental.toLowerCase()}Icon`];
								return (
									<View key={elemental} style={{ flexDirection: 'row' }}>
										<Image source={source} style={styles.iconElement} />
										<Text>{elemental}</Text>
									</View>
								);
							})}
						</View>
					</View>
					<View>
						<Text style={styles.rarityTitle} responsiveSizes={[16]}>
							Rarity Level
						</Text>
						<View style={styles.rarityContainer}>
							{RARITY_LEVEL.map((value) => {
								const newCard = { ...card, rarity: value };
								return <CardInRarity data={newCard} key={value} />;
							})}
						</View>
					</View>
				</View>
			</View>
		</ScrollLayout>
	);
};

export default DetailCard;

const styles = StyleSheet.create({
	imageBg: {
		width: '100%',
		aspectRatio: 864 / 339,
		position: 'absolute',
		top: 0,
	},
	breadCrumb: {
		flexDirection: 'row',
		marginVertical: 80,
		marginLeft: 80,
		alignItems: 'center',
	},
	breadCrumbIcon: {
		width: 8,
		height: 14,
		marginHorizontal: 15,
	},
	breadCrumbLabel: {
		color: '#564d47',
	},
	heading: {
		fontWeight: '600',
		textAlign: 'center',
		marginVertical: 300,
		zIndex: 1,
	},
	rowContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	innerContainer: {
		marginHorizontal: 40,
		marginBottom: 20,
		width: 450,
	},
	nameContainer: {
		width: '100%',
		paddingVertical: 15,
		aspectRatio: 420 / 89,
		justifyContent: 'center',
	},
	name: {
		color: '#cdc8b5',
		paddingVertical: 10,
		fontWeight: '500',
		textAlign: 'center',
	},
	section: {
		paddingVertical: 10,
		borderBottomColor: '#3e2c26',
		borderBottomWidth: 1,
	},
	sectionTitle: {
		color: '#4b423b',
		fontWeight: '600',
	},
	propertyKey: {
		color: '#4d4c4c',
		marginTop: 8,
		marginRight: 80,
	},
	propertyValue: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconClass: {
		aspectRatio: 16 / 27,
		marginRight: 4,
		height: 18,
	},
	iconElement: {
		width: 18,
		height: 18,
		marginRight: 8,
	},
	attribute: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
	},
	attributeLabel: {
		flex: 1,
		marginLeft: 8,
	},
	attributeIcon: {
		aspectRatio: 361 / 423,
		height: 30,
	},
	rarityTitle: {
		fontWeight: '600',
		color: '#cdc8b5',
		marginTop: 20,
		marginBottom: 10,
	},
	rarityContainer: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: '#3e2c26',
		borderTopWidth: 1,
	},
});
