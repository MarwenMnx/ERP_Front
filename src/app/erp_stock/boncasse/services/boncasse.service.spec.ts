import { TestBed } from '@angular/core/testing';

import { BonCasseService } from './boncasse.service';

describe('BonCasseService', () => {
  let service: BonCasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonCasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
