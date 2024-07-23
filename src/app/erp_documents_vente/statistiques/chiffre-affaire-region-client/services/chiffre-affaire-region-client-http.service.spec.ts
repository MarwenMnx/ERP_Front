import { TestBed } from '@angular/core/testing';

import { ChiffreAffaireRegionClientHttpService } from './chiffre-affaire-region-client-http.service';

describe('ChiffreAffaireRegionClientHttpService', () => {
  let service: ChiffreAffaireRegionClientHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiffreAffaireRegionClientHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
