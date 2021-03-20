import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeBrowserSummaryNewComponent } from './genome-browser-summary-new.component';

describe('GenomeBrowserSummaryNewComponent', () => {
  let component: GenomeBrowserSummaryNewComponent;
  let fixture: ComponentFixture<GenomeBrowserSummaryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomeBrowserSummaryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeBrowserSummaryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
