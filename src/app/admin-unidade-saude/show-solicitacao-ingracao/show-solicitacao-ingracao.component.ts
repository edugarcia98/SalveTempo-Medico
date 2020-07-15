import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from 'src/app/unidades-saude/unidade-saude.service';
import { MedicoUnidadeSaude } from 'src/app/unidades-saude/medico-unidade-saude';

import { AdminUnidadeSaudeService } from '../admin-unidade-saude.service';

import { DiaPeriodoTrabalhoShow } from 'src/app/unidades-saude/medico-unidade-saude';

import { KeyService } from 'src/app/key/key.service';

import { AdminUnidadeSaude } from '../admin-unidade-saude';

@Component({
  selector: 'app-show-solicitacao-ingracao',
  templateUrl: './show-solicitacao-ingracao.component.html',
  styleUrls: ['./show-solicitacao-ingracao.component.css']
})
export class ShowSolicitacaoIngracaoComponent implements OnInit {

  public id;
  error: any;
  medicoUnidadeSaude: MedicoUnidadeSaude;

  diasPeriodoTrabalho: Array<DiaPeriodoTrabalhoShow> = [];
  statusAtual: string;
  medicoSexo: string;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private adminUnidadeSaudeService: AdminUnidadeSaudeService,
              private keyService: KeyService,
              private route: ActivatedRoute,
              private router: Router) {
                
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('A')) {
      this.id = this.keyService.getUrlId('mid', this.route)
      
      this.unidadeSaudeService.getUnidadeSaudeMedicoById(sessionStorage.getItem('key'), this.id).subscribe(
        (item: MedicoUnidadeSaude) => {
          this.medicoUnidadeSaude = item;
          
          this.diasPeriodoTrabalho = this.unidadeSaudeService.defineDiasTrabalho(this.medicoUnidadeSaude.diaPeriodoTrabalho);
          this.statusAtual = this.unidadeSaudeService.defineStatus(this.medicoUnidadeSaude.status);
          this.medicoSexo = this.medicoUnidadeSaude.medico.sexo == 'M' ? 'Masculino' : 'Feminino';

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

  respostaSolicitacao(status: string) {
    this.adminUnidadeSaudeService.respostaSolicitacaoMedico(sessionStorage.getItem('key'),
    this.id, this.medicoUnidadeSaude.medico.id, this.medicoUnidadeSaude.unidadeSaude.id,
    this.medicoUnidadeSaude.diaPeriodoTrabalho, status).subscribe(
      () => {
        this.adminUnidadeSaudeService.enviaEmailRespostaMedico(sessionStorage.getItem('key'), this.id,
        status).subscribe(
          () => {
            this.router.navigate(['administracao/solicitacoes-integracao-medico/email-enviado']);
          },
          (error: any) => {
            this.error = error;
            console.log(this.error);
          }
        )
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }
}
