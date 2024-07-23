import { TestBed } from '@angular/core/testing';

import { BonentreeService } from './bonentree.service';

describe('BonentreeService', () => {
  let service: BonentreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonentreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
