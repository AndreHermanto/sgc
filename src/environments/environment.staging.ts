export const environment = {
    version: 'STAGING',
    production: true,
    ci: false,
    ensemblDomain: 'grch37.rest.ensembl.org',
    ensemblDomain38: 'rest.ensembl.org',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: 'eS2HA6aSYnxCXFvo9bzHpV1DI6H1yw0l',
    auth0Domain: 'sgc.au.auth0.com',
    auth0Connection: 'Username-Password-Authentication',
    auth0MachineClientId: '9O0wRIq6yuPaUYp7YGskT0DwFQ3C6Bvj',
    beaconNetworkUrl: 'https://beacon-network.org/api',
    vsalUrlSummary37: 'https://vsal.garvan.org.au/ssvs',
    vsalUrlSummary38: 'https://vsal.garvan.org.au/ssvs/grch38',
    vsalUrlClinical37: 'https://vsal.garvan.org.au/vsal/core/find',
    vsalUrlClinical38: 'https://vsal.garvan.org.au/vsal/core/find',
    elasticUrl37: 'https://vsal.garvan.org.au/_elasticsearch_GRCH37',
    elasticUrl38: 'https://vsal.garvan.org.au/_elasticsearch_GRCH38',
    durlUrl: 'https://wt-ec1ac815dce38c76c2e7662693b82189-0.run.webtask.io/durl-dev',
    sentryUrl: 'https://0a67187927c24ee49ba301bb38c3ed2a@sentry.io/1471904',
    clinicalUrl: 'http://localhost:3000',
    vectisAnalyticsUrl: 'https://vectis-analytics.public.garvan.org.au/analytics',
    vectisDomain: 'https://sgc.garvan.org.au',
    mapd37: {
        protocol: 'https',
        host: 'vsal.garvan.org.au',
        port: '443',
        dbName: 'mapd',
        user: 'mapd',
        pwd: 'HyperInteractive',
    },
    mapd38: {
        protocol: 'https',
        host: 'vsal.garvan.org.au',
        port: '443',
        dbName: 'mapd',
        user: 'mapd',
        pwd: 'HyperInteractive',
    }
};
