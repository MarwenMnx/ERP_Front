import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesJointeComponent } from './pieces-jointe.component';

describe('PiecesJointeComponent', () => {
  let component: PiecesJointeComponent;
  let fixture: ComponentFixture<PiecesJointeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiecesJointeComponent]
    });
    fixture = TestBed.createComponent(PiecesJointeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
