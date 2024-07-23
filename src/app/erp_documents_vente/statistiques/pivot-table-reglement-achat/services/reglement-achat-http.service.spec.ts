import { TestBed } from '@angular/core/testing';

import { ReglementAchatHttpService } from './reglement-achat-http.service';

describe('ReglementAchatHttpService', () => {
  let service: ReglementAchatHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementAchatHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
