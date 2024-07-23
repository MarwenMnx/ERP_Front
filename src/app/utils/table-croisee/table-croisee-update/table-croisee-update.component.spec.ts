import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCroiseeUpdateComponent } from './table-croisee-update.component';

describe('TableCroiseeUpdateComponent', () => {
  let component: TableCroiseeUpdateComponent;
  let fixture: ComponentFixture<TableCroiseeUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCroiseeUpdateComponent]
    });
    fixture = TestBed.createComponent(TableCroiseeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
