import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';

import { CadastroMedicoService } from '../cadastro-medico/cadastro-medico.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(private loginService: LoginService,
              private cadastroMedicoService: CadastroMedicoService,
              private router: Router) {

  }

  ngOnInit() {
  }

  login(medicoEmail: string, medicoSenha: string) {
    this.loginService.login(medicoEmail, medicoSenha).subscribe(
      (object: Observable<Object>) => {
        var key = object['key'];
        sessionStorage.setItem('key', key);

        this.cadastroMedicoService.getMedicoByEmail(medicoEmail).subscribe(
          (medico: Observable<Object>) => {
            var medicoId = medico[0]['id'];
            sessionStorage.setItem('id', medicoId);

            this.router.navigate(['medico']);
          },
          (error: any) => {
            this.error = error;
            console.log(this.error);
            sessionStorage.clear();
          }
        )
      
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

}
