import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrePaysGouvDeligationLocaliteComponent } from './filtre-pays-gouv-deligation-localite.component';

describe('FiltrePaysGouvDeligationLocaliteComponent', () => {
  let component: FiltrePaysGouvDeligationLocaliteComponent;
  let fixture: ComponentFixture<FiltrePaysGouvDeligationLocaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrePaysGouvDeligationLocaliteComponent]
    });
    fixture = TestBed.createComponent(FiltrePaysGouvDeligationLocaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
