import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCroiseeComponent } from './table-croisee.component';

describe('TableCroiseeComponent', () => {
  let component: TableCroiseeComponent;
  let fixture: ComponentFixture<TableCroiseeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCroiseeComponent]
    });
    fixture = TestBed.createComponent(TableCroiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
