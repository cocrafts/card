import { Node, Quat, Tween, tween, Vec3 } from 'cc';

export interface PlayerCardOption {
	node: Node;
	delay?: number;
	from?: Vec3;
	dest?: Vec3;
	expoDest?: Vec3;
	speed?: number;
}

const defaultExpoDest = new Vec3(440, -15, 0);
const defaultFrom = new Vec3(425, -232, 0);

export const animateExpoCard = ({
	node,
	from = defaultFrom,
	dest = defaultExpoDest,
	delay = 0,
	speed = 1,
}: PlayerCardOption): Tween<Node> => {
	let flipped = false;
	const r1 = Quat.fromEuler(new Quat(), 90, 90, 91);
	const r2 = Quat.fromEuler(new Quat(), 12, 0, 0);
	const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);
	const translate = tween(node)
		.set({ position: from })
		.to(0.5 / speed, { position: dest }, { easing: 'cubicIn' })
		.by(1 / speed, { position: new Vec3(0, 15, 0) }, { easing: 'quadOut' });

	const rotate = tween(node)
		.set({ rotation: r1, active: true })
		.to(
			0.5 / speed,
			{ rotation: r2 },
			{
				easing: 'cubicIn',
				onUpdate: (node: Node) => {
					if (flipped) return;
					const angle = new Vec3(0, 0, 0);
					node.rotation.getEulerAngles(angle);
					if (angle.z < 30) {
						node.getChildByPath('back').active = false;
						flipped = true;
					}
				},
			},
		)
		.to(1.5 / speed, { rotation: r3 }, { easing: 'quadIn' });

	const scale = tween(node)
		.set({ scale: new Vec3(0.18, 0.18, 1) })
		.to(0.5 / speed, { scale: new Vec3(0.48, 0.48, 1) }, { easing: 'quadIn' })
		.to(1 / speed, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'quadOut' });

	return tween(node).delay(delay).parallel(translate, rotate, scale);
};

const defaultRevealDest = new Vec3(0, -360, 0);

export const animateDrawPlayerCard = ({
	node,
	from = defaultFrom,
	expoDest = defaultExpoDest,
	dest = defaultRevealDest,
	delay = 0,
	speed = 1,
}: PlayerCardOption): Promise<void> => {
	return new Promise((resolve) => {
		animateExpoCard({ node, from, dest: expoDest, delay, speed })
			.to(
				1,
				{ position: dest, scale: new Vec3(0.4, 0.4, 1) },
				{ easing: 'expoOut' },
			)
			.call(() => resolve())
			.start();
	});
};

export interface EnemyCardOption {
	node: Node;
	from: Vec3;
	dest: Vec3;
	delay: number;
}

export const animateDrawEnemyCard = ({
	node,
	from,
	dest,
	delay = 0,
}: EnemyCardOption): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 0, 0, 90);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 180);

		tween(node)
			.delay(delay)
			.set({ position: from, rotation: r1, scale: new Vec3(0.18, 0.18, 1) })
			.to(
				1,
				{ position: dest, rotation: r2, scale: new Vec3(0.22, 0.22, 1) },
				{ easing: 'expoInOut' },
			)
			.call(() => resolve())
			.start();
	});
};

export const animateRaiseCard = async (
	node: Node,
	to = 100,
	duration = 0.1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath('front'))
			.to(duration, { position: new Vec3(0, to, 0) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animatePreviewRaise = async (
	node: Node,
	from = -8,
	duration = 0.1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath('Card'))
			.set({ position: new Vec3(0, from, 0) })
			.to(duration, { position: new Vec3(0, 0, 0) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animatePreviewZoom = async (
	node: Node,
	targetNode: Node,
): Promise<void> => {
	const at = targetNode.getPosition();
	const xOffset = at.x >= 0 ? -170 : 170;
	const yOffset = at.y > 0 ? -38 : 38;

	return new Promise((resolve) => {
		node.setPosition(at.x + xOffset, at.y + yOffset);
		tween(node.getChildByPath('Card'))
			.set({ scale: new Vec3(0.5, 0.5, 1) })
			.to(0.1, { scale: new Vec3(0.6, 0.6, 1) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animatePreviewZoomOut = async (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		node.setPosition(190, 740);
		tween(node.getChildByPath('Card'))
			.to(0.1, { scale: new Vec3(0, 0, 1) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};

export const simpleMove = async (
	node: Node,
	to: Vec3,
	duration = 0.2,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.to(duration, { position: to }, { easing: 'expoInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animateFromEnemyHandToGround = (
	node: Node,
	from: Vec3,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);
		const translate = tween(node)
			.set({ position: from })
			.to(1, { position: to }, { easing: 'expoInOut' });
		const scale = tween(node)
			.to(0.2, { scale: new Vec3(0.3, 0.3, 1) }, { easing: 'expoInOut' })
			.to(0.8, { scale: new Vec3(0.23, 0.23, 1) }, { easing: 'expoInOut' });
		const rotate = tween(node)
			.set({ rotation: r1 })
			.to(1, { rotation: r2 }, { easing: 'expoInOut' });

		tween(node).parallel(translate, rotate, scale).call(resolve).start();
	});
};

export const animateFromDragToGround = (
	node: Node,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.to(0.1, { scale: new Vec3(0.52, 0.52, 1) }, { easing: 'expoOut' })
			.to(
				0.5,
				{ position: to, scale: new Vec3(0.23, 0.23, 1) },
				{ easing: 'expoInOut' },
			)
			.call(() => resolve())
			.start();
	});
};

export const animateGroundAppear = (node: Node, from: Vec3): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.set({ scale: new Vec3(0.25, 0.25, 1), position: from })
			.to(0.5, { scale: new Vec3(0.24, 0.24, 1) })
			.call(() => resolve())
			.start();
	});
};

export const animateGroundReveal = (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 0, 180, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 90, 0);
		const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);

		tween(node)
			.set({ rotation: r1 })
			.to(0.25, { rotation: r2, scale: new Vec3(0.26, 0.26, 1) })
			.call(() => (node.getChildByPath('back').active = false))
			.to(0.25, { rotation: r3, scale: new Vec3(0.24, 0.24, 1) })
			.call(resolve)
			.start();
	});
};
