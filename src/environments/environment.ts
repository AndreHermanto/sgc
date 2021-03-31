// The file for the current environment will overwrite this one during build.
// Different environments can be found in ./environment.{dev|prod}.ts, and
// you can create your own and use it with the --env flag.
// The build system defaults to the dev environment.

export class MapDSettings {
    protocol = '';
    host = '';
    port = '';
    dbName = '';
    user = '';
    pwd = '';
}

export const environment = {
    version: '',
    production: false,
    ci: false,
    ensemblDomain: '',
    ensemblDomain38: 'rest.ensembl.org',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: '',
    auth0Domain: '',
    auth0Connection: '',
    auth0MachineClientId: '',
    beaconNetworkUrl: '',
    vsalUrlSummary37: '',
    vsalUrlSummary38: '',
    vsalUrlClinical37: '',
    vsalUrlClinical38: '',
    elasticUrl37: '',
    elasticUrl38: '',
    durlUrl: '',
    sentryUrl: '',
    clinicalUrl: '',
    vectisAnalyticsUrl: '',
    mapd37: new MapDSettings(),
    mapd38: new MapDSettings(),
};
