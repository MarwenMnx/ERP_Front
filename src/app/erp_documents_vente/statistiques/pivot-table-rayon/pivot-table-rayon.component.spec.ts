import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableRayonComponent } from './pivot-table-rayon.component';

describe('PivotTableRayonComponent', () => {
  let component: PivotTableRayonComponent;
  let fixture: ComponentFixture<PivotTableRayonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PivotTableRayonComponent]
    });
    fixture = TestBed.createComponent(PivotTableRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
