import { TestBed } from '@angular/core/testing';

import { TypePieceJointeService } from './type-piece-jointe.service';

describe('TypePieceJointeService', () => {
  let service: TypePieceJointeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePieceJointeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
