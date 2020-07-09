import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from 'src/app/unidades-saude/unidade-saude.service';
import { MedicoUnidadeSaude } from 'src/app/unidades-saude/medico-unidade-saude';

import { AdminUnidadeSaudeService } from '../admin-unidade-saude.service';

import { DiaPeriodoTrabalhoShow } from 'src/app/unidades-saude/medico-unidade-saude';

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
              private route: ActivatedRoute,
              private router: Router) {
                
  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'A') {
      this.router.navigate(['']);
    } else {
      let id = parseInt(this.route.snapshot.paramMap.get('mid'));
      this.id = id;
      
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
    }
  }

  respostaSolicitacao(status: string) {
    this.adminUnidadeSaudeService.respostaSolicitacaoMedico(sessionStorage.getItem('key'),
    this.id, this.medicoUnidadeSaude.medico.id, this.medicoUnidadeSaude.unidadeSaude.id,
    this.medicoUnidadeSaude.diaPeriodoTrabalho, status).subscribe(
      () => {
        console.log('Atualizou');
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }
}
