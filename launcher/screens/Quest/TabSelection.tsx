import type { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface Props {
	onChangeTab?: () => void;
	title: string;
	isActive?: boolean;
}

const TabSelection: FC<Props> = ({ onChangeTab, title, isActive = false }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onChangeTab}>
			<Text
				style={[
					styles.title,
					isActive ? styles.activeTitle : styles.inactiveTitle,
				]}
			>
				{title}
			</Text>
			{isActive ? (
				<Image source={resources.quest.activeTab} style={styles.activeIcon} />
			) : (
				<Image
					source={resources.quest.inactiveTab}
					style={styles.inactiveIcon}
				/>
			)}
		</TouchableOpacity>
	);
};

export default TabSelection;

export const styles = StyleSheet.create({
	container: {
		width: 200,
		alignItems: 'center',
		gap: 12,
		paddingTop: 20,
		borderBottomColor: '#2E2E2E',
		borderBottomWidth: 1,
	},
	title: {
		fontFamily: 'Volkhov',
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 16,
	},
	activeTitle: {
		textShadowColor: '#FFF9A0',
		textShadowOffset: {
			height: 0,
			width: 0,
		},
		textShadowRadius: 6,
	},
	inactiveTitle: {
		opacity: 0.5,
	},
	activeIcon: {
		width: 16,
		height: 16,
		marginBottom: -8,
	},
	inactiveIcon: {
		width: 12,
		height: 12,
		marginBottom: -12,
	},
});
