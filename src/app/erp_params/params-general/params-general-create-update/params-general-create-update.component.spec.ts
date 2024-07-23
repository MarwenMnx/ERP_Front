import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsGeneralCreateUpdateComponent } from './params-general-create-update.component';

describe('ParamsGeneralCreateUpdateComponent', () => {
  let component: ParamsGeneralCreateUpdateComponent;
  let fixture: ComponentFixture<ParamsGeneralCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParamsGeneralCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(ParamsGeneralCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
