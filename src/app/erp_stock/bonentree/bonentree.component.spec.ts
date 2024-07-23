import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonentreeComponent } from './bonentree.component';

describe('BonentreeComponent', () => {
  let component: BonentreeComponent;
  let fixture: ComponentFixture<BonentreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonentreeComponent]
    });
    fixture = TestBed.createComponent(BonentreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
