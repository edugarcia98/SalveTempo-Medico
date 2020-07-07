import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UnidadeSaudeService {

  constructor(private http: HttpClient) { }

  getUnidadesSaudeFromMedico(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/?search=' + id;

    var headers = new HttpHeaders(
      {
        "Authorization": "Token " + key
      }
    );

    var options = {
      headers: headers
    }

    return this.http.get(url, options);
  }

  getUnidadeSaudeMedicoById(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/' + id;

    var headers = new HttpHeaders(
      {
        "Authorization": "Token " + key
      }
    );

    var options = {
      headers: headers
    }

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

    var headers = new HttpHeaders(
      {
        "Authorization": "Token " + key
      }
    );

    var options = {
      headers: headers
    }

    return this.http.post(url, data, options);
  }

  deleteMedicoUnidadeSaude(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/' + id;

    var headers = new HttpHeaders(
      {
        "Authorization": "Token " + key
      }
    );

    var options = {
      headers: headers
    }

    return this.http.delete(url, options);
  }
}
