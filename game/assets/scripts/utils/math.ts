import { Node, Vec3 } from 'cc';

import { AngledPosition } from '../lib/types';

export interface CardCurve {
	angle: number;
	height: number;
}

export const getCardCurve = (
	length: number,
	heightRange = 20,
	angleRange = 12,
	maxLength = 9,
): CardCurve[] => {
	const result: CardCurve[] = [];
	const radius = (maxLength - 1) / 2;
	const startingIndex = Math.floor((maxLength - length) / 2);

	for (let i = startingIndex; i < startingIndex + length; i += 1) {
		const distance = distanceFromCentral(radius, i);
		const height = heightRange * (Math.abs(distance) / radius);
		const angle = angleRange * (distance / radius);

		result.push({ height, angle });
	}

	return result;
};

export const relativePosition = (first: Node, second: Node): Vec3 => {
	const firstPos = first.getWorldPosition();
	const secondPos = second.getWorldPosition();

	return new Vec3(
		firstPos.x - secondPos.x,
		firstPos.y - secondPos.y,
		firstPos.z - secondPos.z,
	);
};

const distanceFromCentral = (radius: number, currentIndex: number): number => {
	if (currentIndex == radius) {
		return 0;
	} else if (currentIndex >= radius * 2) {
		return radius;
	} else if (currentIndex > radius) {
		return currentIndex % radius;
	} else {
		return (currentIndex % radius) - radius;
	}
};

export const linearDistribute = (
	central: Vec3,
	amount: number,
	spacing: number,
): Vec3[] => {
	const result: Vec3[] = [];
	const size = amount * spacing;
	const radius = size / 2;
	const leftMost = central.x - radius + spacing / 2;

	for (let i = 0; i < amount; i += 1) {
		result.push(new Vec3(leftMost + i * spacing, central.y, central.z));
	}

	return result;
};

interface LinearSeatProps {
	central?: Vec3;
	spacing?: number;
	heightRange?: number;
	angleRange?: number;
	length: number;
	at: number;
}

export const linearSeat = ({
	central = new Vec3(0, 0, 0),
	spacing = 100,
	heightRange = 0,
	angleRange = 0,
	length,
	at,
}: LinearSeatProps): AngledPosition => {
	const size = length * spacing;
	const radius = length / 2;
	const halfSize = size / 2;
	const leftMost = central.x - halfSize + spacing / 2;
	const distance = distanceFromCentral(radius, at);

	return {
		position: new Vec3(
			leftMost + at * spacing,
			central.y + heightRange * (Math.abs(distance) / radius),
			central.z,
		),
		angle: angleRange * (distance / radius),
	};
};