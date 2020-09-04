import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta, Anamnese } from '../consulta';

@Component({
  selector: 'app-anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  public id;

  error: any;
  consulta: Consulta;
  anamnese: Anamnese;

  constructor(private keyService: KeyService,
              private consultaService: ConsultaService,
              private route: ActivatedRoute,
              private router: Router) {
    
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.id = this.keyService.getUrlId('cid', this.route);
      this.consultaService.getConsultaById(sessionStorage.getItem('key'),
       this.id).subscribe(
        (item: Consulta) => {
          this.consulta = item;
          this.anamnese = this.consulta.anamnese
          console.log(this.anamnese);
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
