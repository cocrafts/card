import React, { FC } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { stormIcons } from '@metacraft/icons';
import { navigationHeight } from 'components/Navigation/shared';
import { iStyles } from 'utils/styles';

import AuthenticationBundle from '../AuthenticationBundle';
import { NavigationConfig, stormGateNav, stormNavigations } from '../shared';

import NavigationItem from './Item';

const { Dragon } = stormIcons;

export const StormNavigation: FC = () => {
	const onNavigate = async (item: NavigationConfig) => {
		await Linking.openURL(item.url as string);
	};

	return (
		<View style={styles.container}>
			<View style={[iStyles.contentContainer, styles.contentContainer]}>
				<TouchableOpacity
					style={styles.brandingIcon}
					onPress={() => onNavigate(stormGateNav)}
				>
					<Dragon size={18} />
				</TouchableOpacity>
				<View style={styles.navContainer}>
					{stormNavigations.map((item) => {
						return (
							<NavigationItem
								key={item.title}
								item={item}
								onNavigate={onNavigate}
							/>
						);
					})}
				</View>
				<AuthenticationBundle />
			</View>
		</View>
	);
};

export default StormNavigation;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0b0d12',
	},
	contentContainer: {
		flexDirection: 'row',
	},
	brandingIcon: {
		justifyContent: 'center',
		marginLeft: 62,
		marginRight: 24,
		paddingHorizontal: 8,
		height: navigationHeight.storm,
	},
	navContainer: {
		flex: 1,
		flexDirection: 'row',
	},
});
