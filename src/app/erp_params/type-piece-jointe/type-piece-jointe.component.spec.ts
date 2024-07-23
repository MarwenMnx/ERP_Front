import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePieceJointeComponent } from './type-piece-jointe.component';

describe('TypePieceJointeComponent', () => {
  let component: TypePieceJointeComponent;
  let fixture: ComponentFixture<TypePieceJointeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypePieceJointeComponent]
    });
    fixture = TestBed.createComponent(TypePieceJointeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
