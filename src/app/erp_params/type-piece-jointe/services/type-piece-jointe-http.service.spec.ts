import { TestBed } from '@angular/core/testing';

import { TypePieceJointeHttpService } from './type-piece-jointe-http.service';

describe('TypePieceJointeHttpService', () => {
  let service: TypePieceJointeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePieceJointeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
