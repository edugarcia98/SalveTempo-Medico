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

  getDoencaById(key: string, doenca_id: string) {
    var url = GlobalConstants.apiBaseUrl + 'doencas/' + doenca_id + '/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  cadastroDoenca(key: string, doenca: string) {
    var url = GlobalConstants.apiBaseUrl + 'doencas/';
    var options = this.keyService.defineOptions(key);

    var data = {
      "nome": doenca
    };

    return this.http.post(url, data, options);
  }

  async cadastroConsultaSintoma(key: string, consulta_id: number, sintoma_id: number) {
    var url = GlobalConstants.apiBaseUrl + 'consultas-sintomas/';
    var options = this.keyService.defineOptions(key);

    var data = {
      "consulta_id": consulta_id,
      "sintoma_id": sintoma_id,
      "possui": 1
    };

    return await this.http.post(url, data, options).toPromise();
  }

  salvaResultadoConsulta(key: string, data: any) {
    var url = GlobalConstants.apiBaseUrl + 'save-prognostico/'
    var options = this.keyService.defineOptions(key);

    return this.http.post(url, data, options);
  }

  async changeConsulta(key: string, consulta_id: string, status: string, diagnostico: number) {
    var url = GlobalConstants.apiBaseUrl + 'consultas/' + consulta_id + '/';
    var options = this.keyService.defineOptions(key);

    var data = {
      "status": status,
      "diagnostico_id": diagnostico == 0 ? null : diagnostico,
    };

    return await this.http.patch(url, data, options).toPromise();
  }
}
