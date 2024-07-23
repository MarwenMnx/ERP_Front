import { TestBed } from '@angular/core/testing';

import { ParamsGeneralHttpService } from './params-general-http.service';

describe('ParamsGeneralHttpService', () => {
  let service: ParamsGeneralHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsGeneralHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
