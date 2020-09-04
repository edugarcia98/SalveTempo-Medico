import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class MedicoService {

  constructor(private http: HttpClient) { }

  getMedicoById(id: string) {
    var url = GlobalConstants.apiBaseUrl + 'medicos/' + id + '/';

    return this.http.get(url);
  }
}
