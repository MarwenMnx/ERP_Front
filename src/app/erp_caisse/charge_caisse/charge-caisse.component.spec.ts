import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCaisseComponent } from './charge-caisse.component';

describe('ChargeCaisseComponent', () => {
  let component: ChargeCaisseComponent;
  let fixture: ComponentFixture<ChargeCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeCaisseComponent]
    });
    fixture = TestBed.createComponent(ChargeCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
