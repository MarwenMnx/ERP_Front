import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurCreateUpdateComponent } from './chauffeur-create-update.component';

describe('ChauffeurCreateUpdateComponent', () => {
  let component: ChauffeurCreateUpdateComponent;
  let fixture: ComponentFixture<ChauffeurCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChauffeurCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(ChauffeurCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
