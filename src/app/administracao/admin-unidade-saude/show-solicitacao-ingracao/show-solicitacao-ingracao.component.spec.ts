import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSolicitacaoIngracaoComponent } from './show-solicitacao-ingracao.component';

describe('ShowSolicitacaoIngracaoComponent', () => {
  let component: ShowSolicitacaoIngracaoComponent;
  let fixture: ComponentFixture<ShowSolicitacaoIngracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSolicitacaoIngracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSolicitacaoIngracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
