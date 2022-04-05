import { TestBed } from '@angular/core/testing';

import { IntervalsRepository } from 'app/intervals.repository';

describe('IntervalsService', () => {
  let service: IntervalsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
