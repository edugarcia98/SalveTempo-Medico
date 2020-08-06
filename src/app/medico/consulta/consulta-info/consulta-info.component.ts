import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta, ConsultaSintoma, Prognostico, Sintoma } from '../consulta';

@Component({
  selector: 'app-consulta-info',
  templateUrl: './consulta-info.component.html',
  styleUrls: ['./consulta-info.component.css']
})
export class ConsultaInfoComponent implements OnInit{

  public id;
  error: any;

  consulta: Consulta;
  sintomas: ConsultaSintoma[];
  prognosticos: Prognostico[];

  novosSintomasOptions: Sintoma[];
  novosSintomas: Sintoma[];

  private sintomaFilter: string;
  //show: boolean = false;

  constructor(private keyService: KeyService,
              private consultaService: ConsultaService,
              private route: ActivatedRoute,
              private router: Router) { 
    this.novosSintomasOptions = [];
    this.novosSintomas = [];
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.id = this.keyService.getUrlId('cid', this.route);
      
      this.consultaService.getConsultaById(sessionStorage.getItem('key'), this.id).subscribe(
        (item: Consulta) => {
          this.consulta = item;
          
          this.consultaService.getSintomasFromConsulta(sessionStorage.getItem('key'), this.id).subscribe(
            (items: ConsultaSintoma[]) => {
              this.sintomas = items;
              
              items.forEach(
                (item: ConsultaSintoma) => {
                  switch (item.possui) {
                    case 1: { item.possuiDescription = 'Sim'; break; }
                    case 0: { item.possuiDescription = 'Não'; break; }
                    case -1: { item.possuiDescription = 'Não sabe'; break; }
                  }
                },
                (error: any) => {
                  this.error = error;
                  console.log(this.error);
                }
              );
              
              this.consultaService.getSintomas(sessionStorage.getItem('key')).subscribe(
                (items: Sintoma[]) => {
                  items.forEach(
                    (item: Sintoma) => {
                      if (this.sintomas.filter(i => i.sintoma.id == item.id).length == 0) {
                        this.novosSintomasOptions.push(item);
                      }
                    },
                    (error: any) => {
                      this.error = error.
                      console.log(this.error);
                    }
                  );
                },
                (error: any) => {
                  this.error = error;
                  console.log(this.error);
                }
              );

            },
            (error: any) => {
              this.error = error;
              console.log(this.error);
            }
          );
          
          this.consultaService.getPrognosticosFromConsulta(sessionStorage.getItem('key'), this.id).subscribe(
            (items: Prognostico[]) => {
              this.prognosticos = items;
              
              items.forEach(
                (item: Prognostico) => {
                  item.rgbColor = this.defineRGBColor(item.percentual);
                },
                (error: any) => {
                  this.error = error;
                  console.log(this.error);
                }
              );
            },
            (error: any) => {
              this.error = error;
              console.log(this.error);
            }
          );
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

  verificaListaNovosSintomas(id: number) {
    if(this.novosSintomas.filter(i => i.id == id).length > 0){
      return true;
    } else {
      return false;
    }
  }

  selecionaNovoSintoma(sintoma: Sintoma, checked: boolean) {
    if (checked) {
      this.novosSintomas.push(sintoma);
    } else {
      var index = this.novosSintomas.indexOf(sintoma);
      this.novosSintomas.splice(index, 1);
    }
  }

  defineRGBColor(percentual: number) {
    var r = 0, g = 0, b = 0;

    if (percentual >= 0 && percentual < 25) {
      r = 0;
      g = 255;
      b = 255 - (10.2 * percentual);
    } else if (percentual >= 25 && percentual < 50) {
      r = 10.2 * (percentual - 25);
      g = 255;
      b = 0;
    } else if (percentual >= 50 && percentual <= 100) {
      r = 255;
      g = 255 - (5.1 * (percentual - 50));
      b = 0;
    }

    return 'rgb(' +
      r.toFixed(2).toString() + ', ' +
      g.toFixed(2).toString() + ', ' +
      b.toFixed(2).toString() + ')';
  }
}
