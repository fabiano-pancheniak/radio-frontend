import { TestBed } from '@angular/core/testing';

import { ApoioCulturalService } from './apoio-cultural.service';

describe('ApoioCulturalService', () => {
  let service: ApoioCulturalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApoioCulturalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
