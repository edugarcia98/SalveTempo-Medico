import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AdminUnidadeSaudeService {

  constructor(private http: HttpClient) { }

  getAdminUnidadeSaudeByEmail(email: string) {
    var url = 'http://192.168.1.21:8000/admins_unidades_saude/?search=' + email;

    return this.http.get(url);
  }

  getAdminUnidadeSaudeById(id: string) {
    var url = 'http://192.168.1.21:8000/admins_unidades_saude/' + id;

    return this.http.get(url);
  }

  getMedicosByUnidadeSaudeId(key: string, id: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude_admin/?search=' + id;

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
}
