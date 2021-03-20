import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantSummaryNewComponent } from './variant-summary-new.component';

describe('VariantSummaryNewComponent', () => {
  let component: VariantSummaryNewComponent;
  let fixture: ComponentFixture<VariantSummaryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantSummaryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantSummaryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
