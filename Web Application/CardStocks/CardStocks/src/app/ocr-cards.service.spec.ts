import { TestBed, inject } from '@angular/core/testing';

import { OcrCardsService } from './ocr-cards.service';

describe('OcrCardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcrCardsService]
    });
  });

  it('should be created', inject([OcrCardsService], (service: OcrCardsService) => {
    expect(service).toBeTruthy();
  }));
});
