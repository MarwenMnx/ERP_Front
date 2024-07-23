import { TestBed } from '@angular/core/testing';

import { BonsortiesHttpService } from './bonsorties-http.service';

describe('BonsortiesHttpService', () => {
  let service: BonsortiesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonsortiesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
