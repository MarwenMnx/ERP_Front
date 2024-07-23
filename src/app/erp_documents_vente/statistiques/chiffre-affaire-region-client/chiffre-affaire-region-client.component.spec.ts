import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireRegionClientComponent } from './chiffre-affaire-region-client.component';

describe('ChiffreAffaireRegionClientComponent', () => {
  let component: ChiffreAffaireRegionClientComponent;
  let fixture: ComponentFixture<ChiffreAffaireRegionClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiffreAffaireRegionClientComponent]
    });
    fixture = TestBed.createComponent(ChiffreAffaireRegionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
