import { TestBed } from '@angular/core/testing';

import { AdminUnidadeSaudeService } from './admin-unidade-saude.service';

describe('AdminUnidadeSaudeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUnidadeSaudeService = TestBed.get(AdminUnidadeSaudeService);
    expect(service).toBeTruthy();
  });
});
