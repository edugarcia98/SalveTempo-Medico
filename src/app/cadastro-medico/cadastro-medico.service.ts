import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CadastroMedicoService {

  constructor(private http: HttpClient) { }

  cadastroUsuario(email: string, username: string, password: string, confirmPassword: string){
    var url = 'http://192.168.1.21:8000/rest-auth/registration/';
    
    var data = {
      "username": username,
      "email": email,
      "password1": password,
      "password2": password
    };

    return this.http.post(url, data);
  }

  cadastroMedico(usuario_id: number, especializacao_id: number, nome: string, sexo: string, dataNasc: Date, crm: string) {
    var url = 'http://192.168.1.21:8000/medicos/';
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
    var url = 'http://192.168.1.21:8000/users/?search=' + email;
    return this.http.get(url);
  }
}
