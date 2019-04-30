import { TestBed } from '@angular/core/testing';

import { MesesService } from './meses.service';

describe('MesesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesesService = TestBed.get(MesesService);
    expect(service).toBeTruthy();
  });
});
