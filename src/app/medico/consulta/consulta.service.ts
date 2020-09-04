import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyService } from 'src/app/geral/key/key.service';

import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient,
              private keyService: KeyService) { 

  }

  getConsultasByMedicoId(key: string, medico_id: string, status: string) {
    var url = GlobalConstants.apiBaseUrl + 'consultas/?medico__id=' + medico_id + '&status=' + status;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getConsultaById(key: string, consulta_id: string) {
    var url = GlobalConstants.apiBaseUrl + 'consultas/' + consulta_id + '/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getSintomasFromConsulta(key: string, consulta_id: string) {
    var url = GlobalConstants.apiBaseUrl + 'consultas-sintomas/?search=' + consulta_id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getPrognosticosFromConsulta(key: string, consulta_id: string) {
    var url = GlobalConstants.apiBaseUrl + 'consultas-prognosticos/?search=' + consulta_id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getSintomas(key: string) {
    var url = GlobalConstants.apiBaseUrl + 'sintomas/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getDoencas(key: string) {
    var url = GlobalConstants.apiBaseUrl + 'doencas/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  cadastroDoenca(key: string, doenca: string) {
    var url = GlobalConstants.apiBaseUrl + 'doencas/'
    var options = this.keyService.defineOptions(key);

    var data = {
      "nome": doenca
    }

    return this.http.post(url, data, options);
  }
}
