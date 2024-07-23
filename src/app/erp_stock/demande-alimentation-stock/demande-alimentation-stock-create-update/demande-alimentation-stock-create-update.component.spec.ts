import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAlimentationStockCreateUpdateComponent } from './demande-alimentation-stock-create-update.component';

describe('DemandeAlimentationStockCreateUpdateComponent', () => {
  let component: DemandeAlimentationStockCreateUpdateComponent;
  let fixture: ComponentFixture<DemandeAlimentationStockCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAlimentationStockCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(DemandeAlimentationStockCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
