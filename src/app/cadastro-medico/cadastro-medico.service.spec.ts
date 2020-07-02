import { TestBed } from '@angular/core/testing';

import { CadastroMedicoService } from './cadastro-medico.service';

describe('CadastroMedicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroMedicoService = TestBed.get(CadastroMedicoService);
    expect(service).toBeTruthy();
  });
});
