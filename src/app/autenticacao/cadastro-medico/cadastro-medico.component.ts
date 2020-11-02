import { Component, OnInit } from '@angular/core';

import { CadastroMedicoService } from './cadastro-medico.service'

import { EspecializacaoService } from 'src/app/medico/especializacao/especializacao.service';
import { Especializacao } from 'src/app/medico/especializacao/especializacao';

import { User } from './user';

import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent implements OnInit {

  especializacoes: Especializacao[];
  error_found: boolean;
  error: any;
  selectedSexo = '';
  selectedEspecializacao = 0;
  usuarioCadastrado: User[];

  constructor(private cadastroMedicoService: CadastroMedicoService,
    private especializacaoService: EspecializacaoService,
    // private menuVisibilityService: MenuVisibilityService,
    private router: Router,
    private spinnerService: NgxSpinnerService
    ) {

  }

  ngOnInit() {
    sessionStorage.clear();
    // this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');

    this.especializacaoService.getEspecializacoes().subscribe(
      (items: Especializacao[]) => {
        this.especializacoes = items;
      },
      (error: any) => this.error = error
    );
  }

  addMedico(medicoNome: string, medicoDataNasc: Date, medicoCRM: string, medicoEmail: string, medicoSenha: string, medicoSenhaConfirm: string) {
    this.error_found = false;
    this.error = {
      "username": {"desc": "Nome", "content": []},
      "email": {"desc": "E-mail", "content": []},
      "password1": {"desc": "Senha", "content": []},
      "password2": {"desc": "Confirmação de senha", "content": []},
      "non_field_errors": {"desc": "Outros", "content": []}
    };

    this.spinnerService.show();

    this.cadastroMedicoService.cadastroUsuario(medicoEmail, medicoNome, medicoSenha, medicoSenhaConfirm).subscribe(
      () => {
        this.cadastroMedicoService.getUsuarioByEmail(medicoEmail).subscribe(
          (items: User[]) => {
            this.usuarioCadastrado = items;
            this.cadastroMedicoService.cadastroMedico(this.usuarioCadastrado[0].id, this.selectedEspecializacao,
              medicoNome, this.selectedSexo, medicoDataNasc, medicoCRM).subscribe(
                () => {
                  this.router.navigate(['aguarda-confirmacao']);
                },
                (error: any) => {
                  this.spinnerService.hide();
                  this.error_found = true;
                  this.error["non_field_errors"]["content"].push("Não foi possível finalizar o cadastro do médico.");
                }
              );
          },
          (error: any) => {
            this.spinnerService.hide();
            this.error_found = true;
            this.error["non_field_errors"]["content"].push("Usuário não encontrado.");
          }
        );
      },
      (error: any) => {
        this.spinnerService.hide();
        this.error_found = true;
        this.errorHandler(error);
      }
    );
  }

  errorHandler(error: any) {
    for (let key in this.error) {
      if (error.error[key]) {
        for (let err of error.error[key]) {
          this.error[key]["content"].push(err);
        }
      }
    }
  }

}
