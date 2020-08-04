import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVaComponent } from './about-va.component';

describe('AboutVaComponent', () => {
  let component: AboutVaComponent;
  let fixture: ComponentFixture<AboutVaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutVaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
