import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { landingDomainFromStage, loadEnvsFromStage } from './shared';

export const Landing = ({ stack, app }: StackContext): void => {
	loadEnvsFromStage(app.stage);
	const domainName = landingDomainFromStage(app.stage);
	const hostedZone = 'underrealm.io';

	const site = new StaticSite(stack, 'site', {
		buildCommand: 'metacraft bundle',
		buildOutput: 'metacraft',
		customDomain: { domainName, hostedZone },
	});

	stack.addOutputs({
		siteUrl: site.url,
		siteDomain: domainName,
	});
};

export default Landing;
