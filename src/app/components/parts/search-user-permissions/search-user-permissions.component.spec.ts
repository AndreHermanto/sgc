import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserPermissionsComponent } from './search-user-permissions.component';

describe('SearchUserPermissionsComponent', () => {
  let component: SearchUserPermissionsComponent;
  let fixture: ComponentFixture<SearchUserPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUserPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
