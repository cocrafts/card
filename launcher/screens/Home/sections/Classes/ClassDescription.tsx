import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';

import { ClassItem } from './shared';

interface Props {
	style: ViewStyle;
	classActive: SharedValue<string>;
	classInfo: ClassItem;
}

const ClassDescription: FC<Props> = ({ style, classActive, classInfo }) => {
	const contentAnimatedStyle = useAnimatedStyle(() => {
		const isActive = classActive.value === classInfo.id;
		return { opacity: withTiming(isActive ? 1 : 0) };
	});

	return (
		<Animated.View style={[style, contentAnimatedStyle]}>
			<Text style={[styles.classTitle, { color: classInfo.color }]}>
				{classInfo.title}
			</Text>
			<Text style={styles.text}>{classInfo.description}</Text>
			<Text style={styles.boldText}>Specialty:</Text>
			{classInfo.specialty.map((item, index) => (
				<Text style={styles.text} key={index}>
					{item}
				</Text>
			))}
		</Animated.View>
	);
};

export default ClassDescription;

const styles = StyleSheet.create({
	classTitle: {
		marginBottom: 10,
		fontSize: 18,
		fontWeight: '500',
		fontFamily: 'Volkhov',
	},
	text: {
		textAlign: 'center',
		fontSize: 13,
		fontWeight: '300',
	},
	boldText: {
		fontWeight: '600',
		fontSize: 13,
	},
});
