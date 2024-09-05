import type { FC } from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Refresh from 'components/icons/Refresh';
import UnderRealmButton from 'components/Marketplace/Button';
import resources from 'utils/resources';

export enum Platform {
	DISCORD = 'Discord',
	X = 'X',
}

interface Props {
	platform: Platform;
	title: string;
	description: string;
	points: number;
}

const getIconByPlatform = (platform: Platform) => {
	if (platform === Platform.DISCORD) return resources.quest.discord;

	return resources.quest.twitter;
};

const QuestItem: FC<Props> = ({ platform, title, description, points }) => {
	const iconUri = getIconByPlatform(platform);

	return (
		<View style={styles.container}>
			<Image source={iconUri} style={styles.icon} />

			<View>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<View>
					<TouchableOpacity>
						<ImageBackground
							source={resources.quest.refreshButton}
							style={styles.refreshButton}
						>
							<Refresh size={20} />
						</ImageBackground>
					</TouchableOpacity>
					<Text>Verify</Text>
				</View>

				<UnderRealmButton>
					<Text>Go</Text>
				</UnderRealmButton>
			</View>

			<Text>+{points} pts</Text>
		</View>
	);
};

export default QuestItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexBasis: 'auto',
		gap: 20,
	},
	icon: {
		width: 24,
		height: 24,
	},
	refreshButton: {
		width: 39,
		height: 44,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 40,
	},
});
