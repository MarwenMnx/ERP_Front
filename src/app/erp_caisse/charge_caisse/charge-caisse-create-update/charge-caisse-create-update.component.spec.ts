import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCaisseCreateUpdateComponent } from './charge-caisse-create-update.component';

describe('ChargeCaisseCreateUpdateComponent', () => {
  let component: ChargeCaisseCreateUpdateComponent;
  let fixture: ComponentFixture<ChargeCaisseCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeCaisseCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(ChargeCaisseCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
