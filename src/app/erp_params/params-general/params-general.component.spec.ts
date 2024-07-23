import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsGeneralComponent } from './params-general.component';

describe('ParamsGeneralComponent', () => {
  let component: ParamsGeneralComponent;
  let fixture: ComponentFixture<ParamsGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParamsGeneralComponent]
    });
    fixture = TestBed.createComponent(ParamsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
