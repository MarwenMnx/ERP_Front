import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdatedelegationComponent } from './createupdatedelegation.component';

describe('CreateupdatedelegationComponent', () => {
  let component: CreateupdatedelegationComponent;
  let fixture: ComponentFixture<CreateupdatedelegationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateupdatedelegationComponent]
    });
    fixture = TestBed.createComponent(CreateupdatedelegationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
