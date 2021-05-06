import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionInformationNewComponent } from './region-information-new.component';

describe('RegionInformationNewComponent', () => {
  let component: RegionInformationNewComponent;
  let fixture: ComponentFixture<RegionInformationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionInformationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInformationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
