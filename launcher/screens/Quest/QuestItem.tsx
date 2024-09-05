import type { FC } from 'react';
import { useState } from 'react';
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Refresh from 'components/icons/Refresh';
import UnderRealmButton from 'components/Marketplace/Button';
import resources from 'utils/resources';

export enum Platform {
	DISCORD = 'Discord',
	X = 'X',
}

export interface QuestProps {
	platform: Platform;
	title: string;
	description: string;
	points: number;
	url?: string;
	onVerify?: () => void;
}

const getIconByPlatform = (platform: Platform) => {
	if (platform === Platform.DISCORD) return resources.quest.discord;

	return resources.quest.twitter;
};

const QuestItem: FC<QuestProps> = ({
	platform,
	title,
	description,
	points,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isRefreshHovered, setIsRefreshHovered] = useState(false);
	const iconUri = getIconByPlatform(platform);

	return (
		<Pressable
			style={[styles.container, isHovered ? styles.hovered : {}]}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
		>
			<View style={styles.contentPart}>
				<Image source={iconUri} style={styles.icon} />

				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>

			<View style={styles.contentPart}>
				<View style={styles.buttonsContainer}>
					<View style={styles.refreshButtonContainer}>
						<Pressable
							onHoverIn={() => {
								setIsHovered(true);
								setIsRefreshHovered(true);
							}}
							onHoverOut={() => {
								setIsHovered(false);
								setIsRefreshHovered(false);
							}}
							style={[
								styles.refreshButton,
								isRefreshHovered ? styles.hovered : {},
							]}
						>
							<ImageBackground
								source={resources.quest.refreshButton}
								style={styles.refreshButtonImage}
							>
								<Refresh size={20} />
							</ImageBackground>
						</Pressable>

						<Text style={styles.buttonText}>Verify</Text>
					</View>

					<UnderRealmButton style={styles.goButton}>
						<Text style={styles.buttonText}>Go</Text>
					</UnderRealmButton>
				</View>

				<Text style={styles.pointText}>+{points} pts</Text>
			</View>
		</Pressable>
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
		justifyContent: 'space-between',
		borderColor: '#5A5A5A',
		borderWidth: 1,
	},
	icon: {
		width: 24,
		height: 24,
	},
	refreshButton: {
		width: 36,
		height: 36,
		borderRadius: 20,
		overflow: 'visible',
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonImage: {
		width: 39,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
	},
	refreshButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: 40,
	},
	title: {
		fontFamily: 'Volkhov',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 28,
		color: '#ffffff',
	},
	description: {
		color: '#929292',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 28,
	},
	textContainer: {
		gap: 8,
	},
	contentPart: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	goButton: {
		width: 135,
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	pointText: {
		color: '#F2E0C3',
		fontFamily: 'Volkhov',
		fontWeight: '600',
		fontSize: 16,
	},
	hovered: {
		shadowColor: '#FFF9A0',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 12,
	},
});
