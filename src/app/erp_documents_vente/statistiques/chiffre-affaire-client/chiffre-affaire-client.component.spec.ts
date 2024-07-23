import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireClientComponent } from './chiffre-affaire-client.component';

describe('ChiffreAffaireClientComponent', () => {
  let component: ChiffreAffaireClientComponent;
  let fixture: ComponentFixture<ChiffreAffaireClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiffreAffaireClientComponent]
    });
    fixture = TestBed.createComponent(ChiffreAffaireClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
