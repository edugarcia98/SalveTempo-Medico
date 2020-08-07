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

  getConsultaById(key: string, consulta_id: string) {
    var url = 'http://192.168.1.21:8000/consultas/' + consulta_id + '/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getSintomasFromConsulta(key: string, consulta_id: string) {
    var url = 'http://192.168.1.21:8000/consultas-sintomas/?search=' + consulta_id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getPrognosticosFromConsulta(key: string, consulta_id: string) {
    var url = 'http://192.168.1.21:8000/consultas-prognosticos/?search=' + consulta_id;
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getSintomas(key: string) {
    var url = 'http://192.168.1.21:8000/sintomas/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  getDoencas(key: string) {
    var url = 'http://192.168.1.21:8000/doencas/';
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }
}
