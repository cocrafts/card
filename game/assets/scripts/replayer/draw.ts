import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { reArrangeHand } from '../replayer/util';
import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween/card';
import { selectDeckNode, selectHandNode } from '../util/helper';
import { getCenterExpos, getHandExpos, getRightExpos } from '../util/layout';
import { system } from '../util/system';

const { getCard, selectHand } = Engine;

export const animateInitialDraw = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	return new Promise((resolve) => {
		let completeCount = 0;
		const fromPosition = selectDeckNode(
			system.duel.phaseOf,
		).parent.getPosition();
		const expoPositions = getCenterExpos(commands.length);
		const handPositions = getHandExpos(
			selectHandNode(system.duel.phaseOf),
			commands.length,
		);

		const onAnimateComplete = () => {
			completeCount += 1;
			if (completeCount >= commands.length) {
				resolve();
			}
		};

		for (let i = 0; i < commands.length; i += 1) {
			const command = commands[i];
			const { owner, id: cardId } = command.target.from;
			const expoPosition = expoPositions[i];
			const handPosition = handPositions[i];
			const cardNode = instantiate(system.globalNodes.cardTemplate);

			cardNode.parent = system.globalNodes.board;
			system.cardRefs[cardId] = cardNode;

			const card = getCard(system.duel.cardMap, cardId); // system.duel.map[cardId.substring(0, 9)];
			setTimeout(() => cardNode.emit('data', { cardId, owner, card }), 0);

			if (system.duel.phaseOf === system.playerIds.me) {
				animateDrawPlayerCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				}).then(onAnimateComplete);
			} else {
				animateDrawEnemyCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				}).then(onAnimateComplete);
			}
		}
	});
};

export const animateTurnDraw = ({
	phaseOf,
	commands,
}: DuelCommandBundle): Promise<void> => {
	return new Promise((resolve) => {
		let completeCount = 0;
		const deckNode = selectDeckNode(system.duel.phaseOf).parent;
		const fromPosition = deckNode.getPosition();
		const currentHand = selectHand(system.duel, system.duel.phaseOf);
		const expoPositions = getRightExpos(commands.length);
		const handPositions = getHandExpos(
			selectHandNode(phaseOf),
			currentHand.length,
		);

		const onAnimateComplete = () => {
			completeCount += 1;
			if (completeCount >= commands.length) {
				resolve();
			}
		};

		reArrangeHand(phaseOf);

		for (let i = 0; i < commands.length; i += 1) {
			const command = commands[i];
			const { owner } = command.target.from;
			const handIndex = currentHand.length - commands.length + i;
			const cardId = currentHand[handIndex];
			const expoPosition = expoPositions[i];
			const handPosition = handPositions[handIndex];
			const cardNode = instantiate(system.globalNodes.cardTemplate);

			cardNode.parent = system.globalNodes.board;
			system.cardRefs[cardId] = cardNode;

			const card = getCard(system.duel.cardMap, cardId);
			setTimeout(() => cardNode.emit('data', { cardId, owner, card }), 0);

			if (system.duel.phaseOf === system.playerIds.me) {
				animateDrawPlayerCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				}).then(onAnimateComplete);
			} else {
				animateDrawEnemyCard({
					node: cardNode,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				}).then(onAnimateComplete);
			}
		}
	});
};
