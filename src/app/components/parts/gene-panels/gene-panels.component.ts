import { Component, OnInit, OnDestroy, Input,ChangeDetectorRef } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { Auth } from '../../../services/auth-service';
import { ClinapiService } from '../../../services/clinapi.service';
import { VariantSearchService } from '../../../services/variant-search-service';
import { GenomicsEnglandService } from '../../../services/genomics-england.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Panel } from '../../../model/panel';
import { COHORT_VALUE_MAPPING_VSAL} from '../../../model/cohort-value-mapping'


@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css'],
  providers: [ClinapiService, VariantSearchService]
})
export class GenePanelsComponent implements OnInit, OnDestroy {
  options: Panel[] = [];
  @Input() selectedPanelGroup: string;
  @Input() selectedGenePanel: string;
  geneList: string;
  loading: boolean = true;
  panel: any;
  error: string = '';
  selectedCohort: string = '';
  permissionsClin;
  private subscriptions: Subscription[] = [];

  constructor(public searchBarService: SearchBarService,
              private route: ActivatedRoute,
              private genomicsEnglandService: GenomicsEnglandService,
              private cd: ChangeDetectorRef,
              private auth: Auth,
              private cs: ClinapiService) { }

  ngOnInit() {
    this.subscriptions.push(this.searchBarService.geneList.subscribe(genes => {
      this.geneList = genes;
    }));

    this.subscriptions.push(this.searchBarService.selectedCohort.subscribe(cohort => {
      this.selectedCohort = cohort;
    }))

    if(this.selectedPanelGroup === 'genomicEngland'){
      if(this.genomicsEnglandService.panels){
        this.options = this.genomicsEnglandService.panels;
      }else{
        this.subscriptions.push(this.genomicsEnglandService.getPanels('https://panelapp.genomicsengland.co.uk/api/v1/panels/', null)
        .subscribe(e => {
          this.loading = false;
          if(!e.error){
            this.genomicsEnglandService.panels = e.listPanels;
            this.options = e.listPanels;
            this.error = '';
          }else{
            this.error = e.error;
            this.genomicsEnglandService.panels = [];
            this.options = [];
          }
          this.setGenePanelValue(this.selectedGenePanel);
        }))
      }
    }else if(this.selectedPanelGroup === 'agha' && this.selectedCohort !== 'Demo'){
        this.permissionsClin = localStorage.getItem('userPermissions') ? JSON.parse(localStorage.getItem('userPermissions')) : [];
        this.permissionsClin = this.permissionsClin.filter(e => {
          return e.split('/')[1] === 'pheno' || e.split('/')[1] === 'gt'
        })
        if(this.permissionsClin.length > 0){
          this.cs.getAGHAPanel(this.permissionsClin[0].split('/')[0]).subscribe(panel =>{
            this.panel = panel;
            this.loading = false;
            this.options = Object.keys(panel).map(e => {
              let count = panel[e].length;
              return  new Panel(e, count);
            });
            this.setGenePanelValue(this.selectedGenePanel);
          }, e => {
            this.error = "There was an error processing your request";
          })
        }else{
          this.error = "You do not have permission to access the panel for this cohort"
        }
    }

  }

  onChange(event) {
    this.setGenePanelValue(event.value);
    this.searchBarService.panel = event.value;
  }

  setGenePanelValue(value) {
    if(value){
      this.geneList = 'Loading...'
      this.searchBarService.panel = value;
      if(this.selectedPanelGroup === 'genomicEngland'){
        this.subscriptions.push(this.genomicsEnglandService.getPanel(value).subscribe((data) => {
          if(!data.error){
            this.geneList = data.genesData.genes.map(e => e.gene_data.gene_symbol).join();
            if(this.geneList !== undefined){
              this.searchBarService.setGeneList(this.geneList);
            }else{
              this.searchBarService.setGeneList('');
            }
            this.error = '';
          }else{
            this.error = data.error
            this.searchBarService.setGeneList('');
          }
        }))
      }else if(this.selectedPanelGroup === 'agha'){
        if(this.panel){
          if(this.panel[value]){
            this.geneList = this.panel[value].map(panel => panel.sym);
          }else{
            this.geneList = '';
          }
          this.searchBarService.setGeneList(this.geneList);
        }
      }
    }else{
      this.geneList = value;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
