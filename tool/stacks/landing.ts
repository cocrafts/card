import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { landingDomainFromStage, sslArn } from './shared';

export const Landing = ({ stack, app }: StackContext): void => {
	const domain = landingDomainFromStage(app.stage);
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'stormgate.io',
	});

	const site = new StaticSite(stack, 'site', {
		buildCommand: 'metacraft bundle',
		buildOutput: 'metacraft',
		customDomain: {
			domainName: domain,
			cdk: { hostedZone, certificate },
		},
	});

	stack.addOutputs({
		siteUrl: site.url || 'localhost',
		siteDomain: domain,
	});
};

export default Landing;
