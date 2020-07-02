import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { CadastroMedicoService } from './cadastro-medico/cadastro-medico.service';

import { EspecializacaoService } from './especializacao/especializacao.service';

const appRoutes: Routes = [
  //{ path: 'cadastro', component: CadastroMedicoComponent} - Esta será a futura tela de cadastro
  {path: '', component: CadastroMedicoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroMedicoComponent
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
    EspecializacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
