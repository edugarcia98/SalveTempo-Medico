import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeyService } from 'src/app/geral/key/key.service';

import { DiaPeriodoTrabalhoShow } from './medico-unidade-saude';

@Injectable()
export class UnidadeSaudeService {

  constructor(private http: HttpClient,
              private keyService: KeyService) {

  }

  getUnidadesSaudeFromMedico(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/?search=' + id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getUnidadeSaudeMedicoById(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/' + id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getEstados() {
    var url = 'http://192.168.1.21:8000/estados/';

    return this.http.get(url);
  }

  getCidadeByEstadoId(id: string) {
    var url = 'http://192.168.1.21:8000/cidades/?search=' + id;

    return this.http.get(url);
  }

  getUnidadesSaudeByCidadeId(id: string) {
    var url = 'http://192.168.1.21:8000/unidades_saude/?search=' + id;

    return this.http.get(url);
  }

  postMedicoUnidadeSaude(key: string, medicoId: number, unidadeSaudeId: number, diaPeriodoTrabalho: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/';

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
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/' + id;
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

          item.diaSemana = sep[0];

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
