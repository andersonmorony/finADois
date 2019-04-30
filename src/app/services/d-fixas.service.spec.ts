import { TestBed } from '@angular/core/testing';

import { DFixasService } from './d-fixas.service';

describe('DFixasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DFixasService = TestBed.get(DFixasService);
    expect(service).toBeTruthy();
  });
});
