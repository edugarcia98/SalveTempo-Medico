import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { KeyService } from 'src/app/geral/key/key.service';

import { ConsultaService } from '../consulta.service';
import { Consulta, ConsultaSintoma, Prognostico, Sintoma, Doenca } from '../consulta';

import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-consulta-info',
  templateUrl: './consulta-info.component.html',
  styleUrls: ['./consulta-info.component.css']
})
export class ConsultaInfoComponent implements OnInit {

  public id;
  error: any;

  consulta: Consulta;
  sintomas: ConsultaSintoma[];
  prognosticos: Prognostico[];

  novosSintomasOptions: Sintoma[];
  novosSintomas: Sintoma[];

  novasDoencasOptions: Doenca[];

  selectedPrognostico = 0;

  doencaStr: string;
  sintomaStr: string;

  sintomasCriar: string[];

  faSearch = faSearch;
  faTimes = faTimes;

  private sintomaFilter: string;

  constructor(private keyService: KeyService,
    private consultaService: ConsultaService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService) {
    this.novosSintomasOptions = [];
    this.novosSintomas = [];
    this.novasDoencasOptions = [];
    this.sintomasCriar = [];
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

              this.consultaService.getDoencas(sessionStorage.getItem('key')).subscribe(
                (items: Doenca[]) => {
                  items.forEach(
                    (item: Doenca) => {
                      if (this.prognosticos.filter(i => i.doenca.id == item.id).length == 0) {
                        this.novasDoencasOptions.push(item);
                      }
                    }
                  )
                },
                (error: any) => {
                  this.error = error;
                  console.log(this.error);
                }
              )
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
    if (this.novosSintomas.filter(i => i.id == id).length > 0) {
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

  definePrognostico(prognostico: Prognostico) {
    for (var i = 0; i < document.getElementsByClassName("option-btn").length; i++) {
      var htmlId = document.getElementsByClassName("option-btn").item(i).id;
      document.getElementById(htmlId).style.backgroundColor = "#6c757d";
      document.getElementById(htmlId).style.color = "#fff";
      document.getElementById(htmlId).style.boxShadow = "0 0 0 0rem rgba(0, 0, 0, 0)"
    }
    document.getElementById("selection-doenca").style.display = "none";
    document.getElementById("btn-add-doenca").style.display = "none";
    document.getElementById("title-add-doenca").style.display = "none"

    if (prognostico == null) {
      document.getElementById("prog-none").style.backgroundColor = "#c4c4c4";
      document.getElementById("prog-none").style.color = "black";
      document.getElementById("prog-none").style.boxShadow = "0 0 0 0.2rem rgba(130,138,145,.5)"

      document.getElementById("selection-doenca").style.display = "block";
      document.getElementById("btn-add-doenca").style.display = "block";
      document.getElementById("title-add-doenca").style.display = "block"
      this.selectedPrognostico = 0;
    } else {
      document.getElementById("prog-" + prognostico.id.toString()).style.backgroundColor = prognostico.rgbColor;
      document.getElementById("prog-" + prognostico.id.toString()).style.color = "black";
      document.getElementById("prog-" + prognostico.id.toString()).style.boxShadow = "0 0 0 0.2rem " + prognostico.rgbColor.replace('rgb', 'rgba').replace(')', ', .3)');
      this.selectedPrognostico = prognostico.doenca.id;
    }
  }

  proximoPassoConsulta(isFim: boolean) {
    this.spinnerService.show();

    if (isFim && this.selectedPrognostico == 0) {
      alert("Selecione um possível diagnóstico.");
    } else {
      var status = isFim ? 'F' : 'A';
      var diagnostico = isFim ? this.selectedPrognostico : 0;

      this.consultaService.changeConsulta(sessionStorage.getItem('key'), this.id,
        status, diagnostico).then(
          (response: Object) => {
            console.log('Consulta alterada');
          },
          (error: any) => {
            this.spinnerService.hide();
            this.error = error;
            console.log(this.error);
          }
        ).then(
          async () => {
            await this.saveNovosSintomasCriados()
          },
          (error: any) => {
            this.spinnerService.hide();
            this.error = error;
            console.log(this.error);
          }
        ).then(
          async () => {
            if (this.novosSintomas.length > 0) {
              for (var sintoma of this.novosSintomas) {
                await this.consultaService.cadastroConsultaSintoma(sessionStorage.getItem('key'),
                  this.id, sintoma.id).then(
                    () => {
                      console.log('Novo sintoma inserido');
                    },
                    (error: any) => {
                      this.spinnerService.hide();
                      this.error = error;
                      console.log(this.error);
                    }
                  );
              }
            }
          },
          (error: any) => {
            this.spinnerService.hide();
            this.error = error;
            console.log(this.error);
          }
        ).then(
          () => {
            if (isFim) {
              this.saveResultadosConsulta();
            }
          }
        );
      this.goToConsultas("P");
    }
  }

  showPopup(id: string, displayOption: string) {
    document.getElementById(id).style.display = displayOption;
    this.doencaStr = '';
    this.sintomaStr = '';
  }

  cadastroDoenca(doenca: string) {
    this.consultaService.cadastroDoenca(sessionStorage.getItem('key'), doenca).subscribe(
      (item: Doenca) => {
        document.getElementById("popup-doenca-div").style.display = 'none';
        this.selectedPrognostico = item.id
        this.novasDoencasOptions.push(item);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }

  cadastroSintoma(sintoma: string) {
    document.getElementById("popup-sintoma-div").style.display = 'none';
    this.sintomasCriar.push(sintoma);
  }

  deleteNovoSintoma(sintoma: string) {
    var index = this.sintomasCriar.indexOf(sintoma);
    this.sintomasCriar.splice(index, 1);
  }

  saveResultadosConsulta() {
    var progData: any = {};

    this.consultaService.getSintomasFromConsulta(sessionStorage.getItem('key'),
      this.id).subscribe(
        (consultaSintoma: ConsultaSintoma[]) => {
          for (var i = 0; i < consultaSintoma.length; i++) {
            progData[consultaSintoma[i].sintoma.nomecsv] =
              consultaSintoma[i].possui == 1 ? 1 : 0;
          }

          this.consultaService.getDoencaById(sessionStorage.getItem('key'),
            this.selectedPrognostico.toString()).subscribe(
              (doenca: Doenca) => {
                progData['prognostico'] = doenca.nome;
                this.consultaService.salvaResultadoConsulta(sessionStorage.getItem('key'),
                  progData).subscribe(
                    (response: Object) => {
                      console.log(response);
                    },
                    (error: any) => {
                      this.spinnerService.hide();
                      this.error = error;
                      console.log(this.error);
                    }
                  );

              },
              (error: any) => {
                this.spinnerService.hide();
                this.error = error;
                console.log(this.error);
              }
            )
        },
        (error: any) => {
          this.spinnerService.hide();
          this.error = error;
          console.log(this.error);
        }
      )
  }

  async saveNovosSintomasCriados() {
    for (var sintoma of this.sintomasCriar) {
      await this.consultaService.addNewSintomaToPrognosticos(sessionStorage.getItem('key'),
        sintoma).then(
          (sintoma: Sintoma) => {
            this.novosSintomas.push(sintoma);
            console.log('Novo sintoma adicionado em PrognosticoData');
          },
          (error: any) => {
            this.spinnerService.hide()
            this.error = error;
            console.log(this.error);
          }
        );
    }
  }

  goToAnamnese(id: number) {
    this.router.navigate([`medico/consulta/${id}/anamnese`]);
  }

  goToConsultas(status: string) {
    if (status == 'P' || status == 'A') {
      this.router.navigate([`medico/agenda-consultas`]);
    } else if (status == 'F') {
      this.router.navigate([`medico/historico-consultas`]);
    }
  }
}
