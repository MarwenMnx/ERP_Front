import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsGeocalisationComponent } from './maps-geocalisation.component';

describe('MapsGeocalisationComponent', () => {
  let component: MapsGeocalisationComponent;
  let fixture: ComponentFixture<MapsGeocalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapsGeocalisationComponent]
    });
    fixture = TestBed.createComponent(MapsGeocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
