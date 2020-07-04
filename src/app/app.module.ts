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

//Especialização
import { EspecializacaoService } from './especializacao/especializacao.service';

//Tela de Confirmação
import { ConfirmationScreenComponent } from './confirmation-screen/confirmation-screen.component';

//Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'cadastro', component: CadastroMedicoComponent},
  { path: 'aguarda-confirmacao', component: ConfirmationScreenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroMedicoComponent,
    ConfirmationScreenComponent,
    LoginComponent
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
