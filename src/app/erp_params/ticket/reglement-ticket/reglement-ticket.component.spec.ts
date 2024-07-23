import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementTicketComponent } from './reglement-ticket.component';

describe('ReglementTicketComponent', () => {
  let component: ReglementTicketComponent;
  let fixture: ComponentFixture<ReglementTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglementTicketComponent]
    });
    fixture = TestBed.createComponent(ReglementTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
