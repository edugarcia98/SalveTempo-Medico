import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';

import { CadastroMedicoService } from '../cadastro-medico/cadastro-medico.service';

import { AdminUnidadeSaudeService } from 'src/app/administracao/admin-unidade-saude/admin-unidade-saude.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  selectedTipoUsuario = 'M';

  constructor(private loginService: LoginService,
    private cadastroMedicoService: CadastroMedicoService,
    private adminUnidadeSaudeService: AdminUnidadeSaudeService,
    // private menuVisibilityService: MenuVisibilityService,
    private router: Router) {

  }

  ngOnInit() {
    sessionStorage.clear();
    // this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  login(email: string, senha: string) {
    this.loginService.login(email, senha).subscribe(
      (object: Observable<Object>) => {
        var key = object['key'];
        sessionStorage.setItem('key', key);
        sessionStorage.setItem('tipo', this.selectedTipoUsuario);

        if (this.selectedTipoUsuario == 'M') {
          this.cadastroMedicoService.getMedicoByEmail(email).subscribe(
            (medico: Observable<Object>) => {
              var medicoId = medico[0]['id'];
              sessionStorage.setItem('id', medicoId);

              //this.menuVisibilityService.controlMenuVisibility('medico', 'flex');

              this.router.navigate(['medico']);
            },
            (error: any) => {
              this.error = "Médico não encontrado.";
              sessionStorage.clear();
            }
          )
        } else if (this.selectedTipoUsuario == 'A') {
          this.adminUnidadeSaudeService.getAdminUnidadeSaudeByEmail(email).subscribe(
            (admin: Observable<Object>) => {
              var adminId = admin[0]['id'];
              sessionStorage.setItem('id', adminId);

              //this.menuVisibilityService.controlMenuVisibility('admin', 'flex');

              this.router.navigate(['administracao']);
            },
            (error: any) => {
              this.error = "Administrador de unidade de saúde não encontrado."
              sessionStorage.clear();
            }
          )
        }

      },
      (error: any) => {
        if (email == '' && senha == '') { this.error = "E-mail e senha não podem ser vazios." }
        else if (email == '') { this.error = "E-mail não pode ser vazio." }
        else if (senha == '') { this.error = "Senha não pode ser vazia." }
        else { this.error = "Credenciais incorretas ou e-mail não confirmado." }
      }
    );
  }

  changeTipoUsuario() {
    if (this.selectedTipoUsuario == 'M') {
      document.getElementById('cad-medico').style.display = "inline";
    } else {
      document.getElementById('cad-medico').style.display = "none";
    }
  }
}
