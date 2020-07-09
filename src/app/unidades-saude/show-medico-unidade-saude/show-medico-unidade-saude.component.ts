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
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'M') {
      this.router.navigate(['']);
    } else {
      let id = parseInt(this.route.snapshot.paramMap.get('uid'));
      this.id = id;

      this.unidadeSaudeService.getUnidadeSaudeMedicoById(sessionStorage.getItem('key'), this.id).subscribe(
        (item: MedicoUnidadeSaude) => {
          this.medicoUnidadeSaude = item;
          this.diasPeriodoTrabalho = this.unidadeSaudeService.defineDiasTrabalho(this.medicoUnidadeSaude.diaPeriodoTrabalho);
          this.statusAtual = this.unidadeSaudeService.defineStatus(this.medicoUnidadeSaude.status);
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    }
  }
}
