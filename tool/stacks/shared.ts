import dotenv from 'dotenv';

const landingAlias = {
	production: 'underrealm.',
	staging: 'staging.underrealm.',
	development: 'dev.underrealm.',
};

export const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/2fc55c46-3c09-4d58-a754-56583bc42053';

export const landingDomainFromStage = (stage: string): string => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}stormgate.io`;
};

export const loadEnvsFromStage = (stage: string): void => {
	dotenv.config({ path: `.env.${stage}` });
};
