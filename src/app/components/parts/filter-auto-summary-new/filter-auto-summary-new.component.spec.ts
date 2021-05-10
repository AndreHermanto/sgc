import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoSummaryNewComponent } from './filter-auto-summary-new.component';

describe('FilterAutoSummaryNewComponent', () => {
  let component: FilterAutoSummaryNewComponent;
  let fixture: ComponentFixture<FilterAutoSummaryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAutoSummaryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutoSummaryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
