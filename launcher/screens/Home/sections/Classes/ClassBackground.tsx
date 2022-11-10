import React, { FC, Fragment } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
	id: string;
	imageBackground: ImageSourcePropType;
	classActive: SharedValue<string>;
}

export const ClassBackground: FC<Props> = ({
	id,
	imageBackground,
	classActive,
}) => {
	const backgroundAnimated = useAnimatedStyle(() => {
		const isActive = classActive.value === id;
		return { opacity: withTiming(isActive ? 1 : 0) };
	});

	return (
		<Fragment>
			<AnimatedImage
				style={[styles.classBackgroundActive, backgroundAnimated]}
				source={imageBackground}
				resizeMode="contain"
			/>
		</Fragment>
	);
};

export default ClassBackground;

const styles = StyleSheet.create({
	classBackgroundActive: {
		position: 'absolute',
		top: 80,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
