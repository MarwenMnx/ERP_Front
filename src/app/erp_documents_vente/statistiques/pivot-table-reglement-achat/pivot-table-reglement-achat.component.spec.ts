import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableReglementAchatComponent } from './pivot-table-reglement-achat.component';

describe('PivotTableReglementAchatComponent', () => {
  let component: PivotTableReglementAchatComponent;
  let fixture: ComponentFixture<PivotTableReglementAchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PivotTableReglementAchatComponent]
    });
    fixture = TestBed.createComponent(PivotTableReglementAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
