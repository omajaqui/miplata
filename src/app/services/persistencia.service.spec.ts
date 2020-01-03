import { TestBed } from '@angular/core/testing';

import { PersistenciaService } from './persistencia.service';

describe('PersistenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersistenciaService = TestBed.get(PersistenciaService);
    expect(service).toBeTruthy();
  });
});
