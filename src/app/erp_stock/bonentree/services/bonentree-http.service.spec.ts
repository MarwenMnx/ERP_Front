import { TestBed } from '@angular/core/testing';

import { BonentreeHttpService } from './bonentree-http.service';

describe('BonentreeHttpService', () => {
  let service: BonentreeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonentreeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
