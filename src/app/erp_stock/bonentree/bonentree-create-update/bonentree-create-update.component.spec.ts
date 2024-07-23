import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonentreeCreateUpdateComponent } from './bonentree-create-update.component';

describe('BonentreeCreateUpdateComponent', () => {
  let component: BonentreeCreateUpdateComponent;
  let fixture: ComponentFixture<BonentreeCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonentreeCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(BonentreeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
