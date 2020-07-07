import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from '../unidade-saude.service';
import { MedicoUnidadeSaude, DiaPeriodoTrabalhoShow } from '../medico-unidade-saude';

@Component({
  selector: 'app-show-medico-unidade-saude',
  templateUrl: './show-medico-unidade-saude.component.html',
  styleUrls: ['./show-medico-unidade-saude.component.css']
})
export class ShowMedicoUnidadeSaudeComponent implements OnInit {

  public id;
  error: any;
  medicoUnidadeSaude: MedicoUnidadeSaude;

  diasPeriodoTrabalho: Array<DiaPeriodoTrabalhoShow> = [];
  statusAtual: string;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null) {
      this.router.navigate(['']);
    } else {
      let id = parseInt(this.route.snapshot.paramMap.get('uid'));
      this.id = id;

      this.unidadeSaudeService.getUnidadeSaudeMedicoById(sessionStorage.getItem('key'), this.id).subscribe(
        (item: MedicoUnidadeSaude) => {
          this.medicoUnidadeSaude = item;
          this.defineDiasTrabalho(this.medicoUnidadeSaude.diaPeriodoTrabalho);
          this.defineStatus(this.medicoUnidadeSaude.status);
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    }
  }

  defineDiasTrabalho(diasTrabalhoPeriodo: string) {
    var dias = diasTrabalhoPeriodo.split('|');
    dias.forEach(
      (dia: string) => {
        var item = new DiaPeriodoTrabalhoShow();

        var sep = dia.split(':');
        if (sep.length >= 2) {

          item.diaSemana = sep[0];

          var periodos = sep[1].split(';').join(', ');
          periodos += '.';
          periodos = periodos.replace(', .', '');
          item.periodos = periodos;
          
          this.diasPeriodoTrabalho.push(item)
        }        
      }
    )
  }

  defineStatus(status: string) {
    if (status == 'P')
      this.statusAtual = 'Pendente';
    else if (status == 'A')
      this.statusAtual = 'Aprovado';
    else if (status == 'R')
      this.statusAtual = 'Recusado';
  }
}
