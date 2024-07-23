import { TestBed } from '@angular/core/testing';

import { PiecesJointesHttpService } from './pieces-jointes-http.service';

describe('PiecesJointesHttpService', () => {
  let service: PiecesJointesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiecesJointesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
