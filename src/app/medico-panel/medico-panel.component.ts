import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MedicoService } from './medico.service';
import { Medico } from './medico';

@Component({
  selector: 'app-medico-panel',
  templateUrl: './medico-panel.component.html',
  styleUrls: ['./medico-panel.component.css']
})
export class MedicoPanelComponent implements OnInit {

  error: any;
  medico: Medico;

  constructor(private medicoService: MedicoService,
              private router: Router) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'M') {
      this.router.navigate(['']);
    } else {
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
    }
  }

}
