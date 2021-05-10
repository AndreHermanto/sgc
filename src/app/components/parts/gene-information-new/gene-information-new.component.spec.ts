import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneInformationNewComponent } from './gene-information-new.component';

describe('GeneInformationNewComponent', () => {
  let component: GeneInformationNewComponent;
  let fixture: ComponentFixture<GeneInformationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneInformationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneInformationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
