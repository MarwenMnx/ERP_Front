import { TestBed } from '@angular/core/testing';

import { ChiffreAffaireClientHttpService } from './chiffre-affaire-client-http.service';

describe('ChiffreAffaireClientHttpService', () => {
  let service: ChiffreAffaireClientHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiffreAffaireClientHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
