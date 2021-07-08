

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/delay';

import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProgramCardComponent } from './components/parts/program-card/program-card.component';
import { CohortCardComponent } from './components/parts/cohort-card/cohort-card.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ColumnChartComponent } from './components/parts/charts/column-chart.component';
import { PieChartComponent } from './components/parts/charts/pie-chart.component';
import { CohortListComponent } from './components/parts/cohort-list/cohort-list.component';
import { InitiativeService } from './services/project-data/initiative-service';
import { CohortService } from './services/project-data/cohort-service';
import { GenomicsEnglandService } from './services/genomics-england.service';
import { VecticAnalyticsService } from './services/analytics-service';
import { SearchComponent } from './components/pages/search/search.component';
import { SearchResultsComponent } from './components/parts/search-results/search-results.component';
import { AlleleFreqComponent } from './components/parts/allele-freq/allele-freq.component';
import { VsalService } from './services/vsal-service';
import { Auth } from './services/auth-service';
import { RegionService } from './services/autocomplete/region-service';
import { SearchBarComponent } from './components/parts/search-bar/search-bar.component';
import { SearchOptionComponent } from './components/parts/search-option/search-option.component';
import { BeaconComponent } from './components/pages/beacon/beacon.component';
import { SearchBarWithOptionsComponent } from './components/parts/search-bar-with-options/search-bar-with-options.component';
import { HeaderNavComponent } from './components/parts/header-nav/header-nav.component';
import { ScrollService } from './services/scroll-service';
import { SideNavComponent } from './components/parts/side-nav/side-nav.component';
import { EnsemblService } from './services/ensembl-service';
import { GeneInformationComponent } from './components/parts/gene-information/gene-information.component';
import { BeaconNetworkService } from './services/beacon/beacon-network-service';
import { PrivacyFooterComponent } from './components/parts/privacy-footer/privacy-footer.component';
import { ElasticGeneSearch } from './services/autocomplete/elastic-gene-search-service';
import { VariantsTableComponent } from './components/parts/variants-table/variants-table.component';
import { PositionService } from './services/autocomplete/position-service';
import { TableService } from './services/table-service';
import { TableFamilyService } from './services/table-family-service';
import { TableSummaryService } from './services/table-summary-service';
import { TableSummaryNewService } from './services/table-summary-new-service';
import { FilterAutoComponent } from './components/parts/filter-auto/filter-auto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from './components/parts/page-container/page-container.component';
import { RegionInformationComponent } from './components/parts/region-information/region-information.component';
import { LocalStorageService } from './services/local-storage.service';
import { environment } from '../environments/environment';
import { VariantComponent } from './components/pages/variant/variant.component';
import { BeaconTableComponent } from './components/parts/beacon-table/beacon-table.component';
import * as Raven from 'raven-js';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorComponent } from './components/pages/error/error.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { DashboardComponent } from './components/parts/dashboard/dashboard.component';
import { VariantsTablePaginatedComponent } from './components/parts/variants-table-paginated/variants-table-paginated.component';
import { ErrorDialogComponent } from './components/parts/error-dialog/error-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarDemoComponent } from './components/parts/snackbar-demo/snackbar-demo.component';
import { MaterialModule } from './app.material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MapdRowChartComponent } from './components/parts/mapd-row-chart/mapd-row-chart.component';
import { MapdPieChartComponent } from './components/parts/mapd-pie-chart/mapd-pie-chart.component';
import { MapdAvgAfChartComponent } from './components/parts/mapd-avg-af-chart/mapd-avg-af-chart.component';
import { HelpIconComponent } from './components/parts/help-icon/help-icon.component';
import { SnackbarHelpComponent } from './components/parts/snackbar-help/snackbar-help.component';
import { LoadingComponent } from './components/pages/loading/loading.component';
import { SignUpComponent } from './components/parts/sign-up/sign-up.component';
import { AuthGuardComponent } from './components/parts/auth-guard/auth-guard.component';
import { ClinicalFilteringService } from './services/clinical-filtering.service';
import { SavedSearchesComponent } from './components/parts/saved-searches/saved-searches.component';
import { ClinicalCohortChartComponent } from './components/parts/clinical-cohort-chart/clinical-cohort-chart.component';
import { SearchBarService } from './services/search-bar-service';
import { VariantsSummaryTableComponent } from './components/parts/variants-summary-table/variants-summary-table.component';
import { GenomeBrowserSummaryComponent } from './components/parts/genome-browser-summary/genome-browser-summary.component';
import { GenomeBrowserSummaryResizableComponent } from './components/parts/genome-browser-summary-resizable/genome-browser-summary-resizable.component';
import { OverlayMenuSummaryComponent } from './components/parts/overlay-menu-summary/overlay-menu-summary.component';
import { FilterAutoSummaryComponent } from './components/parts/filter-auto-summary/filter-auto-summary.component';
import { ClinicalComponent } from './components/pages/clinical/clinical.component';
import { ClinicalFilteringComponent } from './components/parts/clinical-filtering/clinical-filtering.component';
import { GeneSearchComponent } from './components/parts/gene-search/gene-search.component';
import { SearchBarClinicalComponent } from './components/parts/search-bar-clinical/search-bar-clinical.component';
import { GenePanelsComponent } from './components/parts/gene-panels/gene-panels.component';
import { GenePanelsFixedComponent } from './components/parts/gene-panels-fixed/gene-panels-fixed.component';
import { SamplesTextComponent } from './components/parts/samples-text/samples-text.component';
import { VariantSummaryComponent } from './components/pages/variant-summary/variant-summary.component';
import { SamplesListComponent } from './components/parts/samples-list/samples-list.component';
import { CohortInformationComponent } from './components/parts/cohort-information/cohort-information.component';
import { AlleleFreqSummaryComponent } from './components/parts/allele-freq-summary/allele-freq-summary.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent, ChangePasswordDialog } from './components/pages/profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AutocompleteOptionComponent } from './components/parts/autocomplete-option/autocomplete-option.component';
import { FamilyTabComponent } from './components/parts/family-tab/family-tab.component';
import { VariantsFamilyTableComponent } from './components/parts/variants-family-table/variants-family-table.component';
import { FilterAutoFamilyComponent } from './components/parts/filter-auto-family/filter-auto-family.component';
import { DemoInformationComponent } from './components/parts/demo-information/demo-information.component';
import { FamilyTabNewComponent } from './components/parts/family-tab-new/family-tab-new.component';
import { RelationshipInformationComponent } from './components/parts/relationship-information/relationship-information.component';
import { FamilialFiltersComponent } from './components/parts/familial-filters/familial-filters.component';
import { MgrbTermsComponent } from './components/pages/mgrb-terms/mgrb-terms.component';
import { GcmpComponent } from './components/pages/programmes/gcmp/gcmp.component';
import { MgrbComponent } from './components/pages/programmes/mgrb/mgrb.component';
import { NswgpComponent } from './components/pages/programmes/nswgp/nswgp.component';
import { GraphsWidgetComponent } from './components/parts/graphs-widget/graphs-widget.component';
import { PcaPlotComponent } from './components/parts/pca-plot/pca-plot.component';
import { MgrbInformationComponent } from './components/parts/mgrb-information/mgrb-information.component';
import { AboutVaComponent } from './components/pages/about-va/about-va.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { GridsterModule } from 'angular-gridster2';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ClipboardModule } from '@angular/cdk/clipboard'

import {keys } from './keys/keys';
import { MultiselectChipsComponent } from './components/parts/multiselect-chips/multiselect-chips.component';
import { SearchResultsNewComponent } from './components/parts/search-results-new/search-results-new.component';
import { GeneInformationNewComponent } from './components/parts/gene-information-new/gene-information-new.component';
import { RegionInformationNewComponent } from './components/parts/region-information-new/region-information-new.component';
import { GenomeBrowserSummaryResizableNewComponent } from './components/parts/genome-browser-summary-resizable-new/genome-browser-summary-resizable-new.component';
import { VariantsSummaryTableNewComponent } from './components/parts/variants-summary-table-new/variants-summary-table-new.component';
import { GenomeBrowserSummaryNewComponent } from './components/parts/genome-browser-summary-new/genome-browser-summary-new.component';
import { FilterAutoSummaryNewComponent } from './components/parts/filter-auto-summary-new/filter-auto-summary-new.component';
import { VariantSummaryNewComponent } from './components/pages/variant-summary-new/variant-summary-new.component';
import { VariantsTablePaginatedNewComponent } from './components/parts/variants-table-paginated-new/variants-table-paginated-new.component';
import { SearchUserPermissionsComponent, OverviewDialog } from './components/parts/search-user-permissions/search-user-permissions.component';
import { PaginatedTableComponent } from './components/parts/paginated-table/paginated-table.component';

const CRITICAL_ERROR_WAIT_DURATION = 1000;

Raven
    .config(environment.sentryUrl)
    .install();

Raven.setDataCallback(function (data) {
    return data;
});

@Injectable()
export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        if (!environment.production) {
            console.error(err);
        } else {
            Raven.captureException(err);
            window.setTimeout(() => {
                window.location.href = 'error';
            }, CRITICAL_ERROR_WAIT_DURATION);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule,
        NgxPaginationModule,
        NgxDatatableModule,
        MaterialModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        GoogleChartsModule.forRoot({
            version: '49',
            mapsApiKey: keys.gmapApiKey
        }),
        GridsterModule,
        AngularResizedEventModule,
        ClipboardModule
    ],
    declarations: [
        AppComponent,
        SearchBarComponent,
        SearchComponent,
        SearchResultsComponent,
        AlleleFreqComponent,
        ColumnChartComponent,
        ProgramCardComponent,
        CohortCardComponent,
        AboutComponent,
        PieChartComponent,
        CohortListComponent,
        SearchOptionComponent,
        BeaconComponent,
        SearchBarWithOptionsComponent,
        HeaderNavComponent,
        SideNavComponent,
        GeneInformationComponent,
        PrivacyFooterComponent,
        VariantsTableComponent,
        FilterAutoComponent,
        PageContainerComponent,
        RegionInformationComponent,
        VariantComponent,
        BeaconTableComponent,
        ErrorComponent,
        ExploreComponent,
        DashboardComponent,
        VariantsTablePaginatedComponent,
        ErrorDialogComponent,
        SnackbarDemoComponent,
        MapdRowChartComponent,
        MapdPieChartComponent,
        MapdAvgAfChartComponent,
        HelpIconComponent,
        SnackbarHelpComponent,
        LoadingComponent,
        SignUpComponent,
        AuthGuardComponent,
        SavedSearchesComponent,
        ClinicalCohortChartComponent,
        VariantsSummaryTableComponent,
        GenomeBrowserSummaryComponent,
        GenomeBrowserSummaryResizableComponent,
        OverlayMenuSummaryComponent,
        FilterAutoSummaryComponent,
        ClinicalComponent,
        ClinicalFilteringComponent,
        GeneSearchComponent,
        SearchBarClinicalComponent,
        GenePanelsComponent,
        GenePanelsFixedComponent,
        SamplesTextComponent,
        VariantSummaryComponent,
        SamplesListComponent,
        CohortInformationComponent,
        AlleleFreqSummaryComponent,
        HomeComponent,
        ProfileComponent,
        ChangePasswordDialog,
        AutocompleteOptionComponent,
        FamilyTabComponent,
        VariantsFamilyTableComponent,
        FilterAutoFamilyComponent,
        DemoInformationComponent,
        FamilyTabNewComponent,
        RelationshipInformationComponent,
        FamilialFiltersComponent,
        MgrbTermsComponent,
        GcmpComponent,
        MgrbComponent,
        NswgpComponent,
        GraphsWidgetComponent,
        PcaPlotComponent,
        MgrbInformationComponent,
        AboutVaComponent,
        AnalyticsComponent,
        MultiselectChipsComponent,
        SearchResultsNewComponent,
        GeneInformationNewComponent,
        RegionInformationNewComponent,
        GenomeBrowserSummaryResizableNewComponent,
        VariantsSummaryTableNewComponent,
        GenomeBrowserSummaryNewComponent,
        FilterAutoSummaryNewComponent,
        VariantSummaryNewComponent,
        VariantsTablePaginatedNewComponent,
        SearchUserPermissionsComponent,
        OverviewDialog,
        PaginatedTableComponent
    ],
    entryComponents: [
        SignUpComponent,
        ErrorDialogComponent,
        SnackbarDemoComponent,
        SnackbarHelpComponent,
        ChangePasswordDialog
    ],
    providers: [
        Auth,
        InitiativeService,
        CohortService,
        VsalService,
        ElasticGeneSearch,
        RegionService,
        BeaconNetworkService,
        ScrollService,
        EnsemblService,
        PositionService,
        TableService,
        TableFamilyService,
        TableSummaryService,
        TableSummaryNewService,
        LocalStorageService,
        ClinicalFilteringService,
        SearchBarService,
        { provide: ErrorHandler, useClass: RavenErrorHandler },
        { provide: 'NULL_VALUE', useValue: null },
        GenomicsEnglandService,
        VecticAnalyticsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
