import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MedicoService } from './medico.service';
import { Medico } from './medico';

import { KeyService } from 'src/app/geral/key/key.service';

@Component({
  selector: 'app-medico-panel',
  templateUrl: './medico-panel.component.html',
  styleUrls: ['./medico-panel.component.css']
})
export class MedicoPanelComponent implements OnInit {

  error: any;
  medico: Medico;

  constructor(private keyService: KeyService,
              private medicoService: MedicoService,
              private router: Router) {

  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.medicoService.getMedicoById(sessionStorage.getItem('id')).subscribe(
        (medico: Medico) => {
          this.medico = medico;
          //console.log('Medico: ', this.medico);
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

  goToUnidadesSaude() {
    this.router.navigate(['medico/unidades-saude']);
  }

  goToAgendaConsultas() {
    this.router.navigate(['medico/agenda-consultas']);
  }

  goToHistoricoConsultas() {
    this.router.navigate(['medico/historico-consultas']);
  }
}
