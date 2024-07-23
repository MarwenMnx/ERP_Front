import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveDetailleeComponent } from './releve-detaillee.component';

describe('ReleveDetailleeComponent', () => {
  let component: ReleveDetailleeComponent;
  let fixture: ComponentFixture<ReleveDetailleeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleveDetailleeComponent]
    });
    fixture = TestBed.createComponent(ReleveDetailleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
