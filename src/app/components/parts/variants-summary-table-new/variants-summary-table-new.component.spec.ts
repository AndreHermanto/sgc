import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsSummaryTableNewComponent } from './variants-summary-table-new.component';

describe('VariantsSummaryTableNewComponent', () => {
  let component: VariantsSummaryTableNewComponent;
  let fixture: ComponentFixture<VariantsSummaryTableNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantsSummaryTableNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsSummaryTableNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
