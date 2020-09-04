import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class EspecializacaoService {

  private url = GlobalConstants.apiBaseUrl + 'especializacoes/';

  constructor(private http: HttpClient) { }

  getEspecializacoes() {
    return this.http.get(this.url);
  }
}
