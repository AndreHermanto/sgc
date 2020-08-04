import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcutecareProbandInformationComponent } from './acutecare-proband-information.component';

describe('AcutecareProbandInformationComponent', () => {
  let component: AcutecareProbandInformationComponent;
  let fixture: ComponentFixture<AcutecareProbandInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcutecareProbandInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcutecareProbandInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
