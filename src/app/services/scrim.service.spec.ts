import { TestBed, inject } from '@angular/core/testing';

import { ScrimService } from './scrim.service';

describe('ScrimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrimService]
    });
  });

  it('should ...', inject([ScrimService], (service: ScrimService) => {
    expect(service).toBeTruthy();
  }));
});
