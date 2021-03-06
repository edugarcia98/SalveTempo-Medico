import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AdminUnidadeSaudeService } from './admin-unidade-saude.service';
import { AdminUnidadeSaude } from './admin-unidade-saude';

import { KeyService } from 'src/app/geral/key/key.service';
import { LoginService } from 'src/app/autenticacao/login/login.service';

@Component({
  selector: 'app-admin-unidade-saude',
  templateUrl: './admin-unidade-saude.component.html',
  styleUrls: ['./admin-unidade-saude.component.css']
})
export class AdminUnidadeSaudeComponent implements OnInit {

  error: any;
  admin: AdminUnidadeSaude;

  constructor(private adminUnidadeSaudeService: AdminUnidadeSaudeService,
              private keyService: KeyService,
              private loginService: LoginService,
              private router: Router) { 

  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('A')) {
      this.adminUnidadeSaudeService.getAdminUnidadeSaudeById(sessionStorage.getItem('id')).subscribe(
        (admin: AdminUnidadeSaude) => {
          this.admin = admin;
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  sair() {
    this.loginService.logout(sessionStorage.getItem('key')).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }

  goToEquipe() {
    this.router.navigate(['administracao/equipe']);
  }

  goToSolicitacoesIntegracao() {
    this.router.navigate(['administracao/solicitacoes-integracao-medico']);
  }
}
