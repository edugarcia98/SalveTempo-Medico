import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Cadastro de Médico
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { CadastroMedicoService } from './cadastro-medico/cadastro-medico.service';

//Tela de Confirmação de Cadastro
import { ConfirmationScreenComponent } from './confirmation-screen/confirmation-screen.component';

//Especialização
import { EspecializacaoService } from './especializacao/especializacao.service';

//Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

//Esqueci a senha
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';

//Tela de Confirmação de Recuperação de Senha
import { ResetConfirmationScreenComponent } from './reset-confirmation-screen/reset-confirmation-screen.component';

//Painel do Médico
import { MedicoPanelComponent } from './medico-panel/medico-panel.component';
import { MedicoService } from './medico-panel/medico.service';

//Unidades de Saúde
import { UnidadesSaudeComponent } from './unidades-saude/unidades-saude.component';
import { UnidadeSaudeService } from './unidades-saude/unidade-saude.service';
import { AddMedicoUnidadeSaudeComponent } from './unidades-saude/add-medico-unidade-saude/add-medico-unidade-saude.component';
import { ConfirmMedicoUnidadeSaudeComponent } from './unidades-saude/confirm-medico-unidade-saude/confirm-medico-unidade-saude.component';
import { ShowMedicoUnidadeSaudeComponent } from './unidades-saude/show-medico-unidade-saude/show-medico-unidade-saude.component';
import { DeleteMedicoUnidadeSaudeComponent } from './unidades-saude/delete-medico-unidade-saude/delete-medico-unidade-saude.component';

//Administradores de Unidades de Saúde
import { AdminUnidadeSaudeComponent } from './admin-unidade-saude/admin-unidade-saude.component';
import { AdminUnidadeSaudeService } from './admin-unidade-saude/admin-unidade-saude.service';
import { SolicitacoesIntegracaoComponent } from './admin-unidade-saude/solicitacoes-integracao/solicitacoes-integracao.component';
import { ShowSolicitacaoIngracaoComponent } from './admin-unidade-saude/show-solicitacao-ingracao/show-solicitacao-ingracao.component';

//Keys
import { KeyService } from './key/key.service';

const appRoutes: Routes = [
  //Autenticação
  { path: '', component: LoginComponent},
  { path: 'cadastro', component: CadastroMedicoComponent},
  { path: 'aguarda-confirmacao', component: ConfirmationScreenComponent},
  { path: 'redefinir-senha', component: ForgotPasswordComponent},
  { path: 'redefinir-senha-confirmacao', component: ResetConfirmationScreenComponent },

  //Médico
  { path: 'medico', component: MedicoPanelComponent },
  { path: 'medico/unidades-saude', component: UnidadesSaudeComponent },
  { path: 'medico/unidades-saude/cadastrar', component: AddMedicoUnidadeSaudeComponent },
  { path: 'medico/unidades-saude/aguarde-confirmacao', component: ConfirmMedicoUnidadeSaudeComponent },
  { path: 'medico/unidades-saude/:uid/detail', component: ShowMedicoUnidadeSaudeComponent },
  { path: 'medico/unidades-saude/:uid/delete', component: DeleteMedicoUnidadeSaudeComponent },

  //Administrador de Unidade de Saúde
  { path: 'administracao', component: AdminUnidadeSaudeComponent },
  { path: 'administracao/solicitacoes-integracao-medico', component: SolicitacoesIntegracaoComponent },
  { path: 'administracao/solicitacoes-integracao-medico/:mid/detail', component: ShowSolicitacaoIngracaoComponent },
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
    ShowSolicitacaoIngracaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
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
    KeyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
