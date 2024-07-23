import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesCreateUpdateComponent } from './exercices-create-update.component';

describe('ExercicesCreateUpdateComponent', () => {
  let component: ExercicesCreateUpdateComponent;
  let fixture: ComponentFixture<ExercicesCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExercicesCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(ExercicesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
