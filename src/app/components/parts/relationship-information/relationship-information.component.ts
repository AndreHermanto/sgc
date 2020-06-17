import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relationship-information',
  templateUrl: './relationship-information.component.html',
  styleUrls: ['./relationship-information.component.css']
})
export class RelationshipInformationComponent implements OnInit {
  relationships: any[];
  @Input('relationships') set allowDay(value: any[]) {
    this.relationships = value;
  }
  @Input() affectedParent: string;
  @Input() familialFilter: string;
  @Output() appliedFilter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectFilter(e){
    this.appliedFilter.emit(e.value);
  }

}
