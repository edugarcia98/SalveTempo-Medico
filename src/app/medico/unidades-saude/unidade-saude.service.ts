import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeyService } from 'src/app/geral/key/key.service';

import { DiaPeriodoTrabalhoShow } from './medico-unidade-saude';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class UnidadeSaudeService {

  constructor(private http: HttpClient,
              private keyService: KeyService) {

  }

  getUnidadesSaudeFromMedico(key: string, id: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos_unidades_saude/?search=' + id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getUnidadeSaudeMedicoById(key: string, id: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos_unidades_saude/' + id + '/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getEstados() {
    var url = GlobalConstants.apiBaseUrl + 'estados/';

    return this.http.get(url);
  }

  getCidadeByEstadoId(id: string) {
    var url = GlobalConstants.apiBaseUrl + 'cidades/?search=' + id;

    return this.http.get(url);
  }

  getUnidadesSaudeByCidadeId(id: string) {
    var url = GlobalConstants.apiBaseUrl + 'unidades_saude/?search=' + id;

    return this.http.get(url);
  }

  postMedicoUnidadeSaude(key: string, medicoId: number, unidadeSaudeId: number, diaPeriodoTrabalho: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos_unidades_saude/';

    var data = {
      "medico_id": medicoId,
      "unidadeSaude_id": unidadeSaudeId,
      "diaPeriodoTrabalho": diaPeriodoTrabalho,
      "status": 'P'
    }

    var options = this.keyService.defineOptions(key);

    return this.http.post(url, data, options);
  }

  deleteMedicoUnidadeSaude(key: string, id: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos_unidades_saude/' + id + '/';
    var options = this.keyService.defineOptions(key);

    return this.http.delete(url, options);
  }

  //Métodos que não utilizam HTTP Request

  defineDiasTrabalho(diasTrabalhoPeriodo: string) {
    var items = new Array<DiaPeriodoTrabalhoShow>();

    var dias = diasTrabalhoPeriodo.split('|');
    dias.forEach(
      (dia: string) => {
        var item = new DiaPeriodoTrabalhoShow();

        var sep = dia.split(':');
        if (sep.length >= 2) {

          //item.diaSemana = sep[0];
          //refatorar isso depois - é uma solução provisória
          switch (parseInt(sep[0])) {
            case 1: {
              item.diaSemana = 'Segunda-feira'
              break;
            }
            case 2: {
              item.diaSemana = 'Terça-feira'
              break;
            }
            case 3: {
              item.diaSemana = 'Quarta-feira'
              break;
            }
            case 4: {
              item.diaSemana = 'Quinta-feira'
              break;
            }
            case 5: {
              item.diaSemana = 'Sexta-feira'
              break;
            }
            case 6: {
              item.diaSemana = 'Sábado'
              break;
            }
            case 7: {
              item.diaSemana = 'Domingo'
              break;
            }
          }

          var periodos = sep[1].split(';').join(', ');
          periodos += '.';
          periodos = periodos.replace(', .', '');
          item.periodos = periodos;
          
          items.push(item);
        }        
      }
    );

    return items;
  }

  defineStatus(status: string) {
    var statusAtual: string;

    if (status == 'P')
      statusAtual = 'Pendente';
    else if (status == 'A')
      statusAtual = 'Aprovado';
    else if (status == 'R')
      statusAtual = 'Recusado';
    
    return statusAtual;
  }
}
