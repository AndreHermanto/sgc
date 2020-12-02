import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-multiselect-chips',
  templateUrl: 'multiselect-chips.component.html',
  styleUrls: ['multiselect-chips.component.css'],
})
export class MultiselectChipsComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectionsControl = new FormControl();
  filteredSelections: Observable<string[]>;
  selectedList = [];
  @Input() label: string;
  @Input() selectionsList: string[] = [];
  @Output() onSelectionChange = new EventEmitter<string[]>();

  @ViewChild('selectionInput') selectionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredSelections = this.selectionsControl.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.selectionsList.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedList.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.selectionsControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedList.indexOf(fruit);

    if (index >= 0) {
      this.selectedList.splice(index, 1);
    }
    this.onSelectionChange.emit(this.selectedList);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedList.push(event.option.viewValue);
    this.onSelectionChange.emit(this.selectedList);
    this.selectionInput.nativeElement.value = '';
    this.selectionInput.nativeElement.blur();
    this.selectionsControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.selectionsList.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  clearCohorts(){
    this.selectedList = [];
    this.onSelectionChange.emit(this.selectedList);
  }
}

