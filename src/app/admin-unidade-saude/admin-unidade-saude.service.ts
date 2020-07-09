import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeyService } from 'src/app/key/key.service';

@Injectable()
export class AdminUnidadeSaudeService {
  
  constructor(private http: HttpClient,
              private keyService: KeyService) {

  }

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
    var options = this.keyService.defineOptions(key);

    return this.http.get(url, options);
  }

  respostaSolicitacaoMedico(key: string, id: string, medicoId: number, unidadeSaudeId: number, diaPeriodoTrabalho: string, status: string) {
    var url = 'http://192.168.1.21:8000/medicos_unidades_saude/' + id + '/';

    var data = {
      "medico_id": medicoId,
      "unidadeSaude_id": unidadeSaudeId,
      "diaPeriodoTrabalho": diaPeriodoTrabalho,
      "status": status
    }

    var options = this.keyService.defineOptions(key);

    return this.http.put(url, data, options);
  }
}
