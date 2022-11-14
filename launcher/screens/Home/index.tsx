import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { DimensionState, dimensionState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { useSnapshot } from 'utils/hook';

import BattlefieldSetupSection from './sections/BattlefieldSetup';
import CardExplainSection from './sections/CardExplain';
import CardTypeSection from './sections/CardTypes';
import ClassessSection from './sections/Classes';
import ElementalInteractionSection from './sections/ElementalInteraction';
import FooterSection from './sections/Footer';
import GameIntroSection from './sections/GameIntro';
import HeadingSection from './sections/Heading';

export const HomeScreen: FC = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);

	return (
		<ScrollLayout contentContainerStyle={styles.container}>
			<HeadingSection />
			<GameIntroSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<BattlefieldSetupSection dimension={windowSize} />
			<CardTypeSection responsiveLevel={responsiveLevel} />
			<CardExplainSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<ElementalInteractionSection responsiveLevel={responsiveLevel} />
			<ClassessSection
				dimension={windowSize}
				responsiveLevel={responsiveLevel}
			/>
			<FooterSection />
		</ScrollLayout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
	},
});
