import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAlimentationStockComponent } from './demande-alimentation-stock.component';

describe('DemandeAlimentationStockComponent', () => {
  let component: DemandeAlimentationStockComponent;
  let fixture: ComponentFixture<DemandeAlimentationStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAlimentationStockComponent]
    });
    fixture = TestBed.createComponent(DemandeAlimentationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
