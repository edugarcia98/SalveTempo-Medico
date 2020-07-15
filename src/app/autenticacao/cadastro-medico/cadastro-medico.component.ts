import { Component, OnInit } from '@angular/core';

import { CadastroMedicoService } from './cadastro-medico.service'

import { EspecializacaoService } from 'src/app/medico/especializacao/especializacao.service';
import { Especializacao } from 'src/app/medico/especializacao/especializacao';

import { User } from './user';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent implements OnInit {

  especializacoes: Especializacao[];
  error: any;
  selectedSexo = '';
  selectedEspecializacao = 0;
  usuarioCadastrado: User[];

  constructor(private cadastroMedicoService: CadastroMedicoService,
              private especializacaoService: EspecializacaoService,
              private router: Router) {

  }

  ngOnInit() {
    this.especializacaoService.getEspecializacoes().subscribe(
      (items: Especializacao[]) => {
        this.especializacoes = items;
      },
      (error: any) => this.error = error
    );
  }

  addMedico(medicoNome: string, medicoDataNasc: Date, medicoCRM: string, medicoEmail: string, medicoSenha: string, medicoSenhaConfirm: string) {
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
                this.error = error;
                console.log(this.error);
              }
            );
          },
          (error: any) => {
            this.error = error;
            console.log(this.error);
          }
        );
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
    
    //location.reload();
  }

}
