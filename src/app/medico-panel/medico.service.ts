import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MedicoService {

  constructor(private http: HttpClient) { }

  getMedicoById(id: string) {
    var url = 'http://192.168.1.21:8000/medicos/' + id;

    return this.http.get(url);
  }
}
