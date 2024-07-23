import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatelocaliteComponent } from './createupdatelocalite.component';

describe('CreateupdatelocaliteComponent', () => {
  let component: CreateupdatelocaliteComponent;
  let fixture: ComponentFixture<CreateupdatelocaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateupdatelocaliteComponent]
    });
    fixture = TestBed.createComponent(CreateupdatelocaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
