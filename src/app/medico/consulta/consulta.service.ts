import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyService } from 'src/app/geral/key/key.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient,
              private keyService: KeyService) { 

  }

  getConsultasByMedicoId(key: string, medico_id: string, status: string) {
    var url = 'http://192.168.1.21:8000/consultas/?medico__id=' + medico_id + '&status=' + status;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }
}
