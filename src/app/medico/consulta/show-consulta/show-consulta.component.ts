import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta';

import {  faNotesMedical,faSearch } from '@fortawesome/free-solid-svg-icons';


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
  faNotesMedical =faNotesMedical;
  faSearch=faSearch;
  



  constructor(private keyService: KeyService,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private router: Router) {
    this.datas = [];
    this.consultas = [];
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.tipoviewconsulta = this.route.snapshot.paramMap.get('tipoviewconsulta');
      if (this.tipoviewconsulta == 'agenda-consultas') {
        this.callGetConsultas('P');
        this.callGetConsultas('A');
      } else if (this.tipoviewconsulta == 'historico-consultas') {
        this.callGetConsultas('F');
      }
    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  goToDetails(id: number) {
    this.router.navigate([`medico/consulta/${id}/detail`]);
  }

  goToAnamnese(id: number) {
    this.router.navigate([`medico/consulta/${id}/anamnese`]);
  }

  goToHomeMedico() {
    this.router.navigate(['medico']);
  }


  callGetConsultas(status: string) {
    this.consultaService.getConsultasByMedicoId(sessionStorage.getItem('key'),
    sessionStorage.getItem('id'), status).subscribe(
      (items: Consulta[]) => {
        
        items.forEach(
          (item: Consulta) => {
            item.formattedId = item.id.toString().padStart(4, '0');

            switch (item.periodo) {
              case 'M': { item.completePeriodo = 'Manhã'; break; }
              case 'T': { item.completePeriodo = 'Tarde'; break; }
              case 'N': { item.completePeriodo = 'Noite'; break; }
            }         

            switch (item.status) {
              case 'P': { item.completeStatus = 'Pendente'; break }
              case 'A': { item.completeStatus = 'Aguardando Exames'; break }
              case 'F': { item.completeStatus = 'Finalizada'; break }
            }

            if (this.datas.filter(i => i == item.data).length == 0) {
              this.datas.push(item.data);
            }
            this.consultas.push(item);
          }
        );
        
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
}
