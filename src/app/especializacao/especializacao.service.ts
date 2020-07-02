import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EspecializacaoService {

  private url = 'http://192.168.1.21:8000/especializacoes/'

  constructor(private http: HttpClient) { }

  getEspecializacoes() {
    return this.http.get(this.url);
  }
}
