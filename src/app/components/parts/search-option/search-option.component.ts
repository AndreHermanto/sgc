import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { SearchOption } from '../../../model/search-option';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

@Component({
    selector: 'app-search-option',
    templateUrl: './search-option.component.html',
    styleUrls: ['./search-option.component.css']
})
export class SearchOptionComponent implements OnInit {
    @Input() option: SearchOption;
    showOptions = false;
    subscriptions: Subscription[] = [];
    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.showOptions = false;
        }
    }
    cohort: string;
    query: string;
    panel: string;
    panelGroup: string;
    ref: string;
    alt: string;
    het: boolean;
    hom: boolean;
    conj: boolean;
    conjSamples: boolean;

    constructor(private elf: ElementRef, private searchBarService: SearchBarService, private route: ActivatedRoute, private router: Router, public clinicalFilteringService: ClinicalFilteringService) {
        
    }

    ngOnInit() {
        this.subscriptions.push(this.route.params.subscribe(p => {
            if(p['cohort']){
                this.option.setValue(p['cohort']);
            }
            if(p['query']){
                this.query = p['query'];
            }else{
                this.query = "";
            }
            if(p['panel']){
                this.panel = p['panel'];
            }else{
                this.panel = "";
            }
            if(p['panelGroup']){
                this.panelGroup = p['panelGroup'];
            }else{
                this.panelGroup = "";
            }
            if(p['ref']){
                this.ref = p['ref'];
            }else{
                this.ref = "";
            }
            if(p['alt']){
                this.alt = p['alt'];
            }else{
                this.alt = "";
            }
            if(p['het'] === 'false'){
                this.het = false;
            }else{
                this.het = true;
            }
            if(p['hom'] === 'false'){
                this.hom = false;
            }else{
                this.hom = true
            }
            if(p['conj'] === 'false'){
                this.conj = false;
            }else{
                this.conj = true
            }
            if(p['conjSamples'] === 'false'){
                this.conjSamples = false;
            }else{
                this.conjSamples = true
            }
            
        }));
    }

    selectOption(selected: string) {
        this.option.setValue(selected);
        this.searchBarService.setCohort(selected);
        this.searchBarService.options[0].setValue(selected);
        this.searchBarService.refInput = this.ref;
        this.searchBarService.altInput = this.alt;
        this.searchBarService.hetInput = this.het;
        this.searchBarService.homInput = this.hom;
        this.searchBarService.conj = this.conj;
        this.searchBarService.conjSamples = this.conjSamples;
        if(this.router.url.includes('/explore')){
            this.router.navigate([`/explore/${this.option.getValue()}`]);
        }
    }
}
