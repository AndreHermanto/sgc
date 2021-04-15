import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutismInformationComponent } from './autism-information.component';

describe('AutismInformationComponent', () => {
  let component: AutismInformationComponent;
  let fixture: ComponentFixture<AutismInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutismInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutismInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
