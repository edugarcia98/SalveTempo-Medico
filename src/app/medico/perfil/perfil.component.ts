import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyService } from 'src/app/geral/key/key.service';
import { Medico } from '../medico-panel/medico';
import { MedicoService } from '../medico-panel/medico.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  error: any;
  medico: Medico;

  constructor(private keyService: KeyService,
              private medicoService: MedicoService,
              private router: Router) { 

  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      
      this.medicoService.getMedicoById(sessionStorage.getItem('id')).subscribe(
        (item: Medico) => {
          this.medico = item;
          this.medico.sexoStr = this.defineMedicoSexo(this.medico.sexo);
          console.log(this.medico);
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      );

    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  defineMedicoSexo(sexo: string) {
    if (sexo == 'M') {
      return 'Masculino';
    } else {
      return 'Feminino';
    }
  }

}
