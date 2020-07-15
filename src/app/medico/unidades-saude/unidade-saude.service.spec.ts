import { TestBed } from '@angular/core/testing';

import { UnidadeSaudeService } from './unidade-saude.service';

describe('UnidadeSaudeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadeSaudeService = TestBed.get(UnidadeSaudeService);
    expect(service).toBeTruthy();
  });
});
