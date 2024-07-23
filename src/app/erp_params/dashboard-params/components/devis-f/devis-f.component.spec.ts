import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisFComponent } from './devis-f.component';

describe('DevisFComponent', () => {
  let component: DevisFComponent;
  let fixture: ComponentFixture<DevisFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevisFComponent]
    });
    fixture = TestBed.createComponent(DevisFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
