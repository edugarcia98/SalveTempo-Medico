import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class CadastroMedicoService {

  constructor(private http: HttpClient) { }

  cadastroUsuario(email: string, username: string, password: string, confirmPassword: string) {

    var url = GlobalConstants.apiBaseUrl + 'rest-auth/registration/';

    var data = {
      "username": username,
      "email": email,
      "password1": password,
      "password2": confirmPassword
    };

    return this.http.post(url, data);
  }

  cadastroMedico(usuario_id: number, especializacao_id: number, nome: string, sexo: string, dataNasc: Date, crm: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos/';
    var data = {
      "usuario_id": usuario_id,
      "especializacao_id": especializacao_id,
      "nome": nome,
      "sexo": sexo,
      "dataNasc": dataNasc,
      "crm": crm
    }

    return this.http.post(url, data);
  }

  getUsuarioByEmail(email: string) {
    var url = GlobalConstants.apiBaseUrl + 'users/?search=' + email;
    return this.http.get(url);
  }

  getMedicoByEmail(email: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos/?search=' + email;
    return this.http.get(url);
  }
}
