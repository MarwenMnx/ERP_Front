import { TestBed } from '@angular/core/testing';

import { StatistiquesHttpService } from './pivot-table-article-http.service';

describe('StatistiquesHttpService', () => {
  let service: StatistiquesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatistiquesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
