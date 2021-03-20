import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsTablePaginatedNewComponent } from './variants-table-paginated-new.component';

describe('VariantsTablePaginatedNewComponent', () => {
  let component: VariantsTablePaginatedNewComponent;
  let fixture: ComponentFixture<VariantsTablePaginatedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantsTablePaginatedNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsTablePaginatedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
