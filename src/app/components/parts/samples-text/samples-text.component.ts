import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-samples-text',
  templateUrl: './samples-text.component.html',
  styleUrls: ['./samples-text.component.css']
})
export class SamplesTextComponent implements OnInit {
  @Input() samples: string[] = [];
  @Output() filterSamples = new EventEmitter<string[]>();
  @Input() multiple: boolean = true;
  txtSamplesChanged: Subject<string[]> = new Subject<string[]>();
  loadingSamplesFilter = false;

  constructor(private cd: ChangeDetectorRef) { 
    this.txtSamplesChanged.debounceTime(1500)
    .distinctUntilChanged()
    .subscribe(samples => {
      if(samples.length > 0 ){
        this.filterSamples.emit(samples);
        this.loadingSamplesFilter = false;
        this.cd.detectChanges();
      }
    })
   }

  ngOnInit() {
  }

  onFilter(samples) {
    this.loadingSamplesFilter=true;
    if(samples.length >= 1 && samples[0] !== ""){
      if(this.multiple){
        this.txtSamplesChanged.next(samples.split(/[\n,]+/));
      }else{
        this.txtSamplesChanged.next([samples]);
      }
    }else{
      this.txtSamplesChanged.next([]);
    }
    
  } 

}
