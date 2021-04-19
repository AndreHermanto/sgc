import {
  Component, AfterViewInit, ChangeDetectorRef, OnDestroy,
  Input
} from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantSummarySearchNewService } from '../../../services/variant-summary-search-new-service';
import { VariantSummaryTrackNewService } from '../../../services/genome-browser/variant-summary-track-new-service';
import { TranscriptTrackService } from '../../../services/genome-browser/transcript-track-service';
import { environment } from '../../../../environments/environment';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { Subscription } from 'rxjs/Subscription';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';
import { EnsemblService } from '../../../services/ensembl-service';
import * as tnt from 'tnt.genome';

const MAX_REGION_SIZE = 100000;
const MIN_REGION_SIZE = 100;

@Component({
  selector: 'app-genome-browser-summary-new',
  templateUrl: './genome-browser-summary-new.component.html',
  styleUrls: ['./genome-browser-summary-new.component.css'],
  providers: [TranscriptTrackService]
})
export class GenomeBrowserSummaryNewComponent implements AfterViewInit, OnDestroy {
    @Input() width: number;
    genomeBrowser: any;
    transcriptsShown = false;
    variants: VariantSummaryNew[];
    subscription: Subscription;
    ensemblSupported = true;
    locked = false;

    constructor(private searchService: VariantSummarySearchNewService,
                private variantTrackService: VariantSummaryTrackNewService,
                private transcriptTrackService: TranscriptTrackService,
                private elastic: ElasticGeneSearch,
                private ensembl: EnsemblService,
                private searchBarService: SearchBarService,
                cd: ChangeDetectorRef) {
        this.variants = searchService.variants;
        this.subscription = searchService.results.subscribe(v => {
            this.variants = v.variants;
        });
    }

    ngAfterViewInit(): void {
        this.ensembl.healthCheck()
            .then(() => {
                this.ensemblSupported = true;
            })
            .catch(() => {
                this.ensemblSupported = false;
            });

        this.drawBoard();
    }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

drawBoard() {
    const that = this;
    const end = this.searchService.lastQuery.regions[0].end - this.searchService.lastQuery.regions[0].start < MIN_REGION_SIZE ?
    this.searchService.lastQuery.regions[0].start + MIN_REGION_SIZE : this.searchService.lastQuery.regions[0].end;

    this.genomeBrowser = tnt.genome()
        .species('human')
        .chr(this.searchService.lastQuery.regions[0].chromosome)
        .from(this.searchService.lastQuery.regions[0].start).to(end)
        .zoom_out(MAX_REGION_SIZE)
        .width(this.width)
        .max_coord(this.elastic.getChromosome(this.searchService.lastQuery.regions[0].chromosome, this.searchBarService.buildOptions[0].getValue()).toPromise());

    const rest = this.genomeBrowser.rest();
    rest.domain(environment.ensemblDomain38);
    rest.protocol(environment.ensemblProtocol);

    this.genomeBrowser.zoom_in(MIN_REGION_SIZE);

    const sequenceData = tnt.track.data.genome.sequence().limit(200);

    const sequenceDataFunction = tnt.track.data.async()
        .retriever(function (loc: any) {
            const track = this;
            return sequenceData.retriever().call(this, loc).then(function (sequence: string[]) {
                if (sequence.length <= 0) {
                    track.height(0);
                } else {
                    track.height(20);
                }
                that.genomeBrowser.tracks(that.genomeBrowser.tracks());
                return sequence;
            });
        });

    const sequenceTrack = tnt.track()
        .height(20)
        .color('white')
        .display(tnt.track.feature.genome.sequence())
        .data(sequenceDataFunction);

    this.transcriptTrackService.init(this.genomeBrowser);

    this.genomeBrowser
    .add_track(sequenceTrack)
    .add_track(this.variantTrackService.trackLabel)
    .add_track(this.variantTrackService.track);

    this.genomeBrowser(document.getElementById('genome-browser'));
    this.genomeBrowser.start();
}

    showTranscripts() {
        const tracks: any[] = this.genomeBrowser.tracks();
        this.genomeBrowser.tracks(tracks.concat([this.transcriptTrackService.trackLabel, this.transcriptTrackService.track]));
        this.transcriptsShown = true;
    }

    hideTranscripts() {
        const tracks = this.genomeBrowser.tracks();
        tracks.pop();
        tracks.pop();
        this.genomeBrowser.tracks(tracks);
        this.transcriptsShown = false;
}

    toggleTranscripts() {
        this.transcriptsShown ? this.hideTranscripts() : this.showTranscripts();
    }

    forward() {
        this.genomeBrowser.scroll(0.5);
    }

    backward() {
        this.genomeBrowser.scroll(-0.5);
    }

    zoomOut() {
        const range = this.genomeBrowser.to() - this.genomeBrowser.from();
        if (range > MAX_REGION_SIZE) {
            return;
        }
        this.genomeBrowser.zoom(0.5);
    }

    zoomIn() {
        const range = this.genomeBrowser.to() - this.genomeBrowser.from();
        if (range < MIN_REGION_SIZE) {
            return;
        }
        this.genomeBrowser.zoom(2);
    }

    lock(event: Event) {
        this.genomeBrowser.allow_drag(false);
        this.locked = true;
    }


  unlock(event: Event) {
      this.locked = false;
      this.genomeBrowser.allow_drag(true);
  }

  wheeling(event: WheelEvent) {
      if (this.locked) {
          document.getElementById('main-scroll').scrollTop = document.getElementById('main-scroll').scrollTop + event.deltaY;
      }
  }
}

