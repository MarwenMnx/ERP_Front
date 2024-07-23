import { TestBed } from '@angular/core/testing';

import { BoncasseHttpService } from './boncasse-http.service';

describe('BoncasseHttpService', () => {
  let service: BoncasseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoncasseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
