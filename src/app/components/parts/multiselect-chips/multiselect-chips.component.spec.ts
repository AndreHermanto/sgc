import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectChipsComponent } from './multiselect-chips.component';

describe('MultiselectChipsComponent', () => {
  let component: MultiselectChipsComponent;
  let fixture: ComponentFixture<MultiselectChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
