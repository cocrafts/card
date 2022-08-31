import { FC, useRef, useState } from 'react';
import {
	LayoutChangeEvent,
	LayoutRectangle,
	StyleSheet,
	View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CardParamList } from 'stacks/Browser/shared';
import { useSnapshot } from 'utils/hook';
import { AccountState, accountState } from 'utils/state/account';

import { useBridge } from './bridge';

const initialLayout: LayoutRectangle = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

const iFrameSrc = 'http://localhost:7456';
// const iFrameSrc = '/cg/index.html';

export const CardGame: FC = (props) => {
	const { profile } = useSnapshot<AccountState>(accountState);
	const route = useRoute();
	const params: CardParamList = route.params as never;
	const iFrameRef = useRef<HTMLIFrameElement>(null);
	const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);
	const frameStyle = {
		width: layout.width,
		height: layout.height,
	};
	const onContainerLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	useBridge(params?.id, iFrameRef);

	return (
		<View style={styles.container} onLayout={onContainerLayout}>
			{layout.width > 0 && (
				<iframe ref={iFrameRef} style={frameStyle} src={iFrameSrc}></iframe>
			)}
		</View>
	);
};

export default CardGame;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'red',
	},
});