import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from 'src/app/medico/unidades-saude/unidade-saude.service';
import { MedicoUnidadeSaude } from 'src/app/medico/unidades-saude/medico-unidade-saude';

import { AdminUnidadeSaudeService } from '../admin-unidade-saude.service';

import { DiaPeriodoTrabalhoShow } from 'src/app/medico/unidades-saude/medico-unidade-saude';

import { KeyService } from 'src/app/geral/key/key.service';

@Component({
  selector: 'app-show-medico',
  templateUrl: './show-medico.component.html',
  styleUrls: ['./show-medico.component.css']
})
export class ShowMedicoComponent implements OnInit {

  public id;
  error: any;
  medicoUnidadeSaude: MedicoUnidadeSaude;

  diasPeriodoTrabalho: Array<DiaPeriodoTrabalhoShow> = [];
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

}
