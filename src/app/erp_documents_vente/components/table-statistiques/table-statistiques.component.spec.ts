import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatistiquesComponent } from './table-statistiques.component';

describe('TableStatistiquesComponent', () => {
  let component: TableStatistiquesComponent;
  let fixture: ComponentFixture<TableStatistiquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableStatistiquesComponent]
    });
    fixture = TestBed.createComponent(TableStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
