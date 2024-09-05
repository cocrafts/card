import type { FC } from 'react';
import { useMemo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

import HeadingSection from './HeadingSection';
import QuestItem, { Platform } from './QuestItem';
import TabSelection from './TabSelection';

const QuestScreen: FC = () => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);

	const imageHeight = useMemo(
		() => (windowSize.width * 1362) / 1440,
		[windowSize],
	);

	const frameCharmStyle = useMemo(() => {
		return {
			width: (windowSize.width * 400) / 1440,
			height: (windowSize.height * 20) / 1362,
			marginTop: -(windowSize.height * 20) / 1362,
		};
	}, [windowSize]);

	const questContainerStyle = useMemo(() => {
		return {
			marginTop: (windowSize.height * 360) / 1362,
			width: windowSize.width - (windowSize.width * 120) / 720,
		};
	}, [windowSize]);

	return (
		<ScrollLayout style={styles.container}>
			<ImageBackground
				source={resources.quest.headingBackground}
				style={[
					styles.imageBackground,
					{
						height: imageHeight,
						paddingTop: (imageHeight * 140) / 1024,
						paddingHorizontal: (windowSize.width * 120) / 1440,
					},
				]}
			>
				<HeadingSection />

				<View style={[styles.questContainer, questContainerStyle]}>
					<Image
						style={[styles.frameCharm, frameCharmStyle]}
						source={resources.quest.charm}
					/>
					<View
						style={{
							paddingVertical: 20,
							alignItems: 'center',
							alignSelf: 'center',
						}}
					>
						<Text style={styles.questTitle}>Quest To Conquer</Text>
						<Image
							source={resources.quest.titleCharm}
							style={{
								position: 'absolute',
								width: (windowSize.width * 400) / 1440,
								height: (windowSize.height * 13) / 1024,
								bottom: -(windowSize.height * 13) / 1024,
							}}
						/>
					</View>

					<View
						style={{
							flexDirection: 'row',
							borderTopColor: '#2E2E2E',
							borderTopWidth: 1,
						}}
					>
						<TabSelection
							title="Social Quest"
							onChangeTab={() => {}}
							isActive={true}
						/>

						<TabSelection title="Referral" onChangeTab={() => {}} />
					</View>

					<View
						style={{
							alignSelf: 'stretch',
							alignItems: 'stretch',
							backgroundColor: 'red',
						}}
					>
						<QuestItem
							description="Connect Discord to unlock Tavern Guest quests"
							title="Connect Discord"
							platform={Platform.DISCORD}
							points={100}
						/>
					</View>
				</View>
			</ImageBackground>
		</ScrollLayout>
	);
};

export default QuestScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#190E0E',
	},
	frameCharm: {
		alignSelf: 'center',
	},
	imageBackground: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	questContainer: {
		borderColor: '#9F835F',
		borderWidth: 1,
		alignItems: 'center',
	},
	questTitle: {
		fontFamily: 'Volkhov',
		color: '#ffffff',
		fontSize: 22,
	},

	mapDescription: {
		marginBottom: 60,
		paddingHorizontal: 15,
	},
});
