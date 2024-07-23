import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceJointeModalComponent } from './piece-jointe-modal.component';

describe('PieceJointeModalComponent', () => {
  let component: PieceJointeModalComponent;
  let fixture: ComponentFixture<PieceJointeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieceJointeModalComponent]
    });
    fixture = TestBed.createComponent(PieceJointeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
