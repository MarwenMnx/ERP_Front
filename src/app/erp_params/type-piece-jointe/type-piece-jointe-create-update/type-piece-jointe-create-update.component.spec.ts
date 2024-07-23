import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePieceJointeCreateUpdateComponent } from './type-piece-jointe-create-update.component';

describe('TypePieceJointeCreateUpdateComponent', () => {
  let component: TypePieceJointeCreateUpdateComponent;
  let fixture: ComponentFixture<TypePieceJointeCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypePieceJointeCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(TypePieceJointeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
