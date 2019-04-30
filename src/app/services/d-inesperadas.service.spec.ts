import { TestBed } from '@angular/core/testing';

import { DInesperadasService } from './d-inesperadas.service';

describe('DInesperadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DInesperadasService = TestBed.get(DInesperadasService);
    expect(service).toBeTruthy();
  });
});
