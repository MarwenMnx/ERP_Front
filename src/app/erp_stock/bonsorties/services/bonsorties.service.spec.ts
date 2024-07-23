import { TestBed } from '@angular/core/testing';

import { BonsortiesService } from './bonsorties.service';

describe('BonsortiesService', () => {
  let service: BonsortiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonsortiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
