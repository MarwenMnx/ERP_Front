import { TestBed } from '@angular/core/testing';

import { LocalitehttpService } from './localitehttp.service';

describe('LocalitehttpService', () => {
  let service: LocalitehttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalitehttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
