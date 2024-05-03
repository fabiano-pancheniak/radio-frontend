import { TestBed } from '@angular/core/testing';

import { DeferirService } from './deferir.service';

describe('DeferirService', () => {
  let service: DeferirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeferirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
