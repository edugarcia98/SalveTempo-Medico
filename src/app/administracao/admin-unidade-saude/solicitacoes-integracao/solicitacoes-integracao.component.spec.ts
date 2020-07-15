import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesIntegracaoComponent } from './solicitacoes-integracao.component';

describe('SolicitacoesIntegracaoComponent', () => {
  let component: SolicitacoesIntegracaoComponent;
  let fixture: ComponentFixture<SolicitacoesIntegracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacoesIntegracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesIntegracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
