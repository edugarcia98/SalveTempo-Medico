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

              // this.menuVisibilityService.controlMenuVisibility('medico', 'block');

              this.router.navigate(['medico']);
            },
            (error: any) => {
              this.error = error;
              console.log(this.error);
              sessionStorage.clear();
            }
          )
        } else if (this.selectedTipoUsuario == 'A') {
          this.adminUnidadeSaudeService.getAdminUnidadeSaudeByEmail(email).subscribe(
            (admin: Observable<Object>) => {
              var adminId = admin[0]['id'];
              sessionStorage.setItem('id', adminId);

              // this.menuVisibilityService.controlMenuVisibility('admin', 'block');

              this.router.navigate(['administracao']);
            },
            (error: any) => {
              this.error = error;
              console.log(this.error);
              sessionStorage.clear();
            }
          )
        }

      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );

    //Adicionar o tipo de usuário na sessão, para se validar no component, impedindo assim que 
    //um usário acesse onde não pode
  }

  changeTipoUsuario() {
    if (this.selectedTipoUsuario == 'M') {
      document.getElementById('cad-medico').style.display = "inline";
    } else {
      document.getElementById('cad-medico').style.display = "none";
    }
  }
}
