import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableReglementVenteComponent } from './pivot-table-reglement-vente.component';

describe('PivotTableReglementVenteComponent', () => {
  let component: PivotTableReglementVenteComponent;
  let fixture: ComponentFixture<PivotTableReglementVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PivotTableReglementVenteComponent]
    });
    fixture = TestBed.createComponent(PivotTableReglementVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
