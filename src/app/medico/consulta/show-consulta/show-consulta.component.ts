import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta';

@Component({
  selector: 'app-show-consulta',
  templateUrl: './show-consulta.component.html',
  styleUrls: ['./show-consulta.component.css']
})
export class ShowConsultaComponent implements OnInit {

  public tipoviewconsulta;

  error: any;
  consultas: Consulta[];
  datas: Date[];

  constructor(private keyService: KeyService,
              private consultaService: ConsultaService,
              private route: ActivatedRoute,
              private router: Router) {
    this.datas = [];
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.tipoviewconsulta = this.route.snapshot.paramMap.get('tipoviewconsulta');
      
      if (this.tipoviewconsulta == 'agenda-consultas') {
        this.consultaService.getConsultasByMedicoId(sessionStorage.getItem('key'),
        sessionStorage.getItem('id'), 'P').subscribe(
          (items: Consulta[]) => {
            this.consultas = items;
            
            items.forEach(
              (item: Consulta) => {
                item.formattedId = item.id.toString().padStart(4, '0');

                switch (item.periodo) {
                  case 'M': { item.completePeriodo = 'Manhã'; break; }
                  case 'T': { item.completePeriodo = 'Tarde'; break; }
                  case 'N': { item.completePeriodo = 'Noite'; break; }
                }

                if (this.datas.filter(i => i == item.data).length == 0) {
                  this.datas.push(item.data);
                }
              }
            )
            
            this.datas.sort(
              (a: Date, b: Date) => {
                return +new Date(a) - +new Date(b);
              }
            );

          },
          (error: any) => {
            this.error = error;
            console.log(this.error);
          }
        )
      }

    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  goToDetails(id: number) {
    this.router.navigate([`medico/consulta/${id}/detail`])
  }
}
