import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Cadastro de Médico
import { CadastroMedicoComponent } from './autenticacao/cadastro-medico/cadastro-medico.component';
import { CadastroMedicoService } from './autenticacao/cadastro-medico/cadastro-medico.service';

//Tela de Confirmação de Cadastro
import { ConfirmationScreenComponent } from './autenticacao/confirmation-screen/confirmation-screen.component';

//Especialização
import { EspecializacaoService } from './medico/especializacao/especializacao.service';

//Login
import { LoginComponent } from './autenticacao/login/login.component';
import { LoginService } from './autenticacao/login/login.service';

//Esqueci a senha
import { ForgotPasswordComponent } from './autenticacao/forgot-password/forgot-password.component';
import { ForgotPasswordService } from './autenticacao/forgot-password/forgot-password.service';

//Tela de Confirmação de Recuperação de Senha
import { ResetConfirmationScreenComponent } from './autenticacao/reset-confirmation-screen/reset-confirmation-screen.component';

//Painel do Médico
import { MedicoPanelComponent } from './medico/medico-panel/medico-panel.component';
import { PerfilComponent } from './medico/perfil/perfil.component';
import { MedicoService } from './medico/medico-panel/medico.service';

//Unidades de Saúde
import { UnidadesSaudeComponent } from './medico/unidades-saude/unidades-saude.component';
import { UnidadeSaudeService } from './medico/unidades-saude/unidade-saude.service';
import { AddMedicoUnidadeSaudeComponent } from './medico/unidades-saude/add-medico-unidade-saude/add-medico-unidade-saude.component';
import { ConfirmMedicoUnidadeSaudeComponent } from './medico/unidades-saude/confirm-medico-unidade-saude/confirm-medico-unidade-saude.component';
import { ShowMedicoUnidadeSaudeComponent } from './medico/unidades-saude/show-medico-unidade-saude/show-medico-unidade-saude.component';
import { DeleteMedicoUnidadeSaudeComponent } from './medico/unidades-saude/delete-medico-unidade-saude/delete-medico-unidade-saude.component';

//Administradores de Unidades de Saúde
import { AdminUnidadeSaudeComponent } from './administracao/admin-unidade-saude/admin-unidade-saude.component';
import { AdminUnidadeSaudeService } from './administracao/admin-unidade-saude/admin-unidade-saude.service';
import { SolicitacoesIntegracaoComponent } from './administracao/admin-unidade-saude/solicitacoes-integracao/solicitacoes-integracao.component';
import { ShowSolicitacaoIngracaoComponent } from './administracao/admin-unidade-saude/show-solicitacao-ingracao/show-solicitacao-ingracao.component';
import { EquipeComponent } from './administracao/admin-unidade-saude/equipe/equipe.component';
import { ShowMedicoComponent } from './administracao/admin-unidade-saude/show-medico/show-medico.component';
import { MensagemEmailEnviadoComponent } from './administracao/admin-unidade-saude/mensagem-email-enviado/mensagem-email-enviado.component';

//Keys
import { KeyService } from './geral/key/key.service';

//Tela padrão de confirmação de exclusão
import { DeleteConfirmationComponent } from './geral/delete-confirmation/delete-confirmation.component';

//Não autorizado
import { NotAuthorizedComponent } from './geral/not-authorized/not-authorized.component';

//Controle de visibilidade do menu
import { MenuVisibilityService } from './geral/menu-visibility/menu-visibility.service';

//Exibição de consultas
import { ShowConsultaComponent } from './medico/consulta/show-consulta/show-consulta.component';
import { ConsultaService } from './medico/consulta/consulta.service';
import { ConsultaInfoComponent } from './medico/consulta/consulta-info/consulta-info.component';

//Filtro de consultas por data
import { FilterdataPipe } from './medico/consulta/filterdata.pipe';

//Filtro de Sintomas
import { FiltersintomaPipe } from './medico/consulta/consulta-info/filtersintoma.pipe';
import { AnamneseComponent } from './medico/consulta/anamnese/anamnese.component';

//NG Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  //Autenticação
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroMedicoComponent },
  { path: 'aguarda-confirmacao', component: ConfirmationScreenComponent },
  { path: 'redefinir-senha', component: ForgotPasswordComponent },
  { path: 'redefinir-senha-confirmacao', component: ResetConfirmationScreenComponent },

  //Médico
  { path: 'medico', component: MedicoPanelComponent },
  { path: 'medico/perfil', component: PerfilComponent },
  { path: 'medico/unidades-saude', component: UnidadesSaudeComponent },
  { path: 'medico/unidades-saude/cadastrar', component: AddMedicoUnidadeSaudeComponent },
  { path: 'medico/unidades-saude/aguarde-confirmacao', component: ConfirmMedicoUnidadeSaudeComponent },
  { path: 'medico/unidades-saude/:uid/detail', component: ShowMedicoUnidadeSaudeComponent },
  { path: 'medico/:tipoviewconsulta', component: ShowConsultaComponent },
  { path: 'medico/consulta/:cid/detail', component: ConsultaInfoComponent },
  { path: 'medico/consulta/:cid/anamnese', component: AnamneseComponent },
  //{ path: 'medico/unidades-saude/:uid/delete', component: DeleteMedicoUnidadeSaudeComponent },

  //Administrador de Unidade de Saúde
  { path: 'administracao', component: AdminUnidadeSaudeComponent },
  { path: 'administracao/solicitacoes-integracao-medico', component: SolicitacoesIntegracaoComponent },
  { path: 'administracao/solicitacoes-integracao-medico/:mid/detail', component: ShowSolicitacaoIngracaoComponent },
  { path: 'administracao/solicitacoes-integracao-medico/email-enviado', component: MensagemEmailEnviadoComponent },
  { path: 'administracao/equipe', component: EquipeComponent },
  { path: 'administracao/medico/:mid/detail', component: ShowMedicoComponent },

  //Tela padrão de confirmação de exclusão
  { path: ':tipousuario/:item/:id/delete', component: DeleteConfirmationComponent },

  //Não autorizado
  { path: 'not-authorized', component: NotAuthorizedComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroMedicoComponent,
    ConfirmationScreenComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetConfirmationScreenComponent,
    MedicoPanelComponent,
    UnidadesSaudeComponent,
    AddMedicoUnidadeSaudeComponent,
    ConfirmMedicoUnidadeSaudeComponent,
    ShowMedicoUnidadeSaudeComponent,
    DeleteMedicoUnidadeSaudeComponent,
    AdminUnidadeSaudeComponent,
    SolicitacoesIntegracaoComponent,
    ShowSolicitacaoIngracaoComponent,
    EquipeComponent,
    ShowMedicoComponent,
    MensagemEmailEnviadoComponent,
    DeleteConfirmationComponent,
    NotAuthorizedComponent,
    ShowConsultaComponent,
    FilterdataPipe,
    ConsultaInfoComponent,
    FiltersintomaPipe,
    AnamneseComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    CadastroMedicoService,
    EspecializacaoService,
    LoginService,
    ForgotPasswordService,
    MedicoService,
    UnidadeSaudeService,
    AdminUnidadeSaudeService,
    KeyService,
    MenuVisibilityService,
    ConsultaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
