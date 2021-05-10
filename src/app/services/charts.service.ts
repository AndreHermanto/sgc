import { Injectable } from "@angular/core";
import "@mapd/mapdc/dist/mapdc.js";
import {SearchBarService} from './search-bar-service';

export enum ChartType {
    Row,
    Pie,
    Custom
}

export class Chart {
    dc: any;
    constructor(
        public name: string,
        public dimension: string,
        public type: ChartType,
        public groupFn: any = null,
        public enabled = false,
        public cap = 100
    ) {}

    tooltip() {
        return `Number of variants by ${this.name}`;
    }

    group(dim: any) {
        return this.groupFn ? this.groupFn(dim) : dim.group();
    }
}

class SerializedChart {
    name = "";
    filters: string[] = [];
}

@Injectable()
export class ChartsService {
    showNullValues = false;
    charts = [
        new Chart("Avg AF", "AF", ChartType.Custom),
        new Chart("Reference", "c4_REF", ChartType.Pie),
        new Chart("Alternate", "ALT", ChartType.Pie),
        new Chart("Category", "TYPE", ChartType.Row),
        new Chart("Clinvar", "clinvar", ChartType.Row),
        new Chart("Consequences", "consequences", ChartType.Row),
        new Chart(
            "Top 100 Genes",
            "geneSymbol",
            ChartType.Row,
            null,
            false,
            100
        ),
        new Chart("Chromosome", "chromosome", ChartType.Row, null, false),
        new Chart(
            "Binned AF",
            "AF",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 10,
                        binBounds: [0, 1],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart(
            "Gnomad AF",
            "gnomadAF",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 10,
                        binBounds: [0, 1],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart(
            "Eigen",
            "eigen",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 12,
                        binBounds: [-4.2, 1.4],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart("PolyPhen", "polyPhen", ChartType.Pie, null, false),
        new Chart("Sift", "sift", ChartType.Pie, null, false)
    ];

    charts38 = [
        new Chart("Avg AF", "AF", ChartType.Custom),
        new Chart("Reference", "c4_REF", ChartType.Pie),
        new Chart("Alternate", "ALT", ChartType.Pie),
        new Chart("Category", "variant_class", ChartType.Row),
        new Chart("Consequences", "consequences", ChartType.Row),
        new Chart("Chromosome", "chromosome", ChartType.Row, null, false),
        new Chart(
            "Binned AF",
            "AF",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 10,
                        binBounds: [0, 1],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart(
            "Allele Number",
            "an",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 10,
                        binBounds: [0, 3000],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart("Impact", "impact", ChartType.Row),
        new Chart("Biotype", "biotype", ChartType.Row),
        new Chart(
            "CADD Raw",
            "cadd_raw",
            ChartType.Row,
            dim => {
                return dim.group().binParams([
                    {
                        numBins: 10,
                        binBounds: [-1, 1],
                        timeBin: false
                    }
                ]);
            },
            false
        ),
        new Chart("CADD PHRED", "cadd_phred", ChartType.Row),
        new Chart("PolyPhen", "polyPhen", ChartType.Pie, null, false),
        new Chart("Sift", "sift", ChartType.Pie, null, false)
    ];
    build='';

    constructor(private searchBarService: SearchBarService) {
        let nCharts = 6;
        let nCharts38 = 6;
        if (window.innerWidth > 1440) {
            nCharts = 13;
            nCharts38 = 14;
        }
        for (let i = 0; i < nCharts; i++) {
            this.charts[i].enabled = true;
        }
        for (let i = 0; i < nCharts38; i++) {
            this.charts38[i].enabled = true;
        }

        this.searchBarService.selectedBuilt.subscribe(build => {
            this.build = build;
        })
    }

    enabledCharts(build: string) {
        if(build === 'GRCh37'){
            return this.charts.filter(c => c.enabled);
        }else if(build === 'GRCh38'){
            return this.charts38.filter(c => c.enabled);
        }  
    }

    getChart(dimension: string, build): Chart {
        if(build === 'GRCh37'){
            return this.charts.find(c => c.dimension === dimension);
        }else if(build === 'GRCh38'){
            return this.charts38.find(c => c.dimension === dimension);
        } 
    }

    setChart(dimension: string, chart: any) {
        let cc;
        if(this.build === 'GRCh37'){
            cc = this.charts.find(c => c.dimension === dimension);
        }else if(this.build === 'GRCh38'){
            cc = this.charts38.find(c => c.dimension === dimension);
        } 
        cc.dc = chart;
        return cc;
    }

    hasFilter(dimension: string) {
        const c = this.getChart(dimension, this.build).dc;
        return c && c.filters().length > 0;
    }

    reset(dimension: string) {
        this.getChart(dimension, this.build).dc.filterAll();
        dc.redrawAllAsync();
    }

    getFilter(tag: string): string {
        const d = localStorage.getItem(tag);
        return JSON.parse(d).allFilter;
    }
}
