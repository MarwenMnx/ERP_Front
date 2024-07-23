import { TestBed } from '@angular/core/testing';

import { DelegationhttpService } from './delegationhttp.service';

describe('DelegationhttpService', () => {
  let service: DelegationhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegationhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
