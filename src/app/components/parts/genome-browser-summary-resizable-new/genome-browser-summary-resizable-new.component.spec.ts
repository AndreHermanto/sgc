import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeBrowserSummaryResizableNewComponent } from './genome-browser-summary-resizable-new.component';

describe('GenomeBrowserSummaryResizableNewComponent', () => {
  let component: GenomeBrowserSummaryResizableNewComponent;
  let fixture: ComponentFixture<GenomeBrowserSummaryResizableNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomeBrowserSummaryResizableNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeBrowserSummaryResizableNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
