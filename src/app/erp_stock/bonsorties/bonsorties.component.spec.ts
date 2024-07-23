import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsortiesComponent } from './bonsorties.component';

describe('BonsortiesComponent', () => {
  let component: BonsortiesComponent;
  let fixture: ComponentFixture<BonsortiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonsortiesComponent]
    });
    fixture = TestBed.createComponent(BonsortiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
