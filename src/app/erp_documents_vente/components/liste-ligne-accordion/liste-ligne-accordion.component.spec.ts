import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLigneAccordionComponent } from './liste-ligne-accordion.component';

describe('ListeLigneAccordionComponent', () => {
  let component: ListeLigneAccordionComponent;
  let fixture: ComponentFixture<ListeLigneAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeLigneAccordionComponent]
    });
    fixture = TestBed.createComponent(ListeLigneAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
