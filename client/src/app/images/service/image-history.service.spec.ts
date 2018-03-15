import { TestBed, inject } from '@angular/core/testing';

import { ImageHistoryService } from './image-history.service';

describe('ImageHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageHistoryService]
    });
  });

  it('should be created', inject([ImageHistoryService], (service: ImageHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
