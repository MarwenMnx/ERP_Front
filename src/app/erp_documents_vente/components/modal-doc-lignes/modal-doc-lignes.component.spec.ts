import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocLignesComponent } from './modal-doc-lignes.component';

describe('ModalDocLignesComponent', () => {
  let component: ModalDocLignesComponent;
  let fixture: ComponentFixture<ModalDocLignesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDocLignesComponent]
    });
    fixture = TestBed.createComponent(ModalDocLignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
