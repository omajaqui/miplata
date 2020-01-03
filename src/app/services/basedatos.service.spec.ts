import { TestBed } from '@angular/core/testing';

import { BasedatosService } from './basedatos.service';

describe('BasedatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasedatosService = TestBed.get(BasedatosService);
    expect(service).toBeTruthy();
  });
});
