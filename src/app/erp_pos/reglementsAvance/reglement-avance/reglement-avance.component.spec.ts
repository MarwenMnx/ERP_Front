import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementAvanceComponent } from './reglement-avance.component';

describe('ReglementAvanceComponent', () => {
  let component: ReglementAvanceComponent;
  let fixture: ComponentFixture<ReglementAvanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglementAvanceComponent]
    });
    fixture = TestBed.createComponent(ReglementAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
