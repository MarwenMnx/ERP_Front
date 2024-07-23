import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsortiesCreateUpdateComponent } from './bonsorties-create-update.component';

describe('BonsortiesCreateUpdateComponent', () => {
  let component: BonsortiesCreateUpdateComponent;
  let fixture: ComponentFixture<BonsortiesCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonsortiesCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(BonsortiesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
