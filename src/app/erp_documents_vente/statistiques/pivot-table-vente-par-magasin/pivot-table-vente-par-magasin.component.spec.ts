import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableVenteParMagasinComponent } from './pivot-table-vente-par-magasin.component';

describe('PivotTableVenteParMagasinComponent', () => {
  let component: PivotTableVenteParMagasinComponent;
  let fixture: ComponentFixture<PivotTableVenteParMagasinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PivotTableVenteParMagasinComponent]
    });
    fixture = TestBed.createComponent(PivotTableVenteParMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
