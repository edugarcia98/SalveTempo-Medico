import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UnidadeSaudeService } from '../unidade-saude.service';
import { MedicoUnidadeSaude, DiaPeriodoTrabalhoShow } from '../medico-unidade-saude';
import { KeyService } from 'src/app/geral/key/key.service';

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
              private keyService: KeyService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.id = this.keyService.getUrlId('uid', this.route);

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
    } else {
      this.router.navigate(['not-authorized']);
    }
  }
}
