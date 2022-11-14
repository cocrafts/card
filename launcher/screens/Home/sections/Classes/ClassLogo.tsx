import React, { FC, Fragment } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import resources from 'utils/resources';

import { ClassItem } from './shared';

const AnimatedImageBackground =
	Animated.createAnimatedComponent(ImageBackground);

interface Props {
	classActive: SharedValue<string>;
	classInfo: ClassItem;
}

const ClassLogo: FC<Props> = ({ classActive, classInfo }) => {
	const logoAnimatedStyle = useAnimatedStyle(() => {
		const isActive = classActive.value === classInfo.id;
		return { opacity: withTiming(isActive ? 0 : 1) };
	});

	const logoActiveAnimatedStyle = useAnimatedStyle(() => {
		const isActive = classActive.value === classInfo.id;
		return { opacity: withTiming(isActive ? 1 : 0) };
	});

	return (
		<Fragment>
			<AnimatedImageBackground
				source={resources.home.classes.logoBackground}
				style={[styles.imageContainer, logoAnimatedStyle]}
			>
				<Image source={classInfo.image.logo} style={styles.image} />
			</AnimatedImageBackground>
			<AnimatedImageBackground
				source={classInfo.image.logoBackgroundActive}
				style={[styles.imageContainer, logoActiveAnimatedStyle]}
			>
				<Image source={classInfo.image.logoActive} style={styles.image} />
			</AnimatedImageBackground>
		</Fragment>
	);
};

export default ClassLogo;

const styles = StyleSheet.create({
	imageContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	image: {
		width: 100,
		height: 100,
	},
});
