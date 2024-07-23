import { TestBed } from '@angular/core/testing';

import { ImpressionPdfService } from './impression-pdf.service';

describe('ImpressionPdfService', () => {
  let service: ImpressionPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpressionPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
