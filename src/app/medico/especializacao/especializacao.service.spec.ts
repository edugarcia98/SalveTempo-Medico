import { TestBed } from '@angular/core/testing';

import { EspecializacaoService } from './especializacao.service';

describe('EspecializacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspecializacaoService = TestBed.get(EspecializacaoService);
    expect(service).toBeTruthy();
  });
});
