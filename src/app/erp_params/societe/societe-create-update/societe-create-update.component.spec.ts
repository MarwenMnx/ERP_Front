import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteCreateUpdateComponent } from './societe-create-update.component';

describe('SocieteCreateUpdateComponent', () => {
  let component: SocieteCreateUpdateComponent;
  let fixture: ComponentFixture<SocieteCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocieteCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(SocieteCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
