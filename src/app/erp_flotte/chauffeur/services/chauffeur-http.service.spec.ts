import { TestBed } from '@angular/core/testing';

import { ChauffeurHttpService } from './chauffeur-http.service';

describe('ChauffeurHttpService', () => {
  let service: ChauffeurHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChauffeurHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
