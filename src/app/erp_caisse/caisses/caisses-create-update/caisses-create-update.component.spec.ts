import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissesCreateUpdateComponent } from './caisses-create-update.component';

describe('CaissesCreateUpdateComponent', () => {
  let component: CaissesCreateUpdateComponent;
  let fixture: ComponentFixture<CaissesCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaissesCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(CaissesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
