import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { KeyService } from 'src/app/key/key.service';

@Component({
  selector: 'app-mensagem-email-enviado',
  templateUrl: './mensagem-email-enviado.component.html',
  styleUrls: ['./mensagem-email-enviado.component.css']
})
export class MensagemEmailEnviadoComponent implements OnInit {

  error: any;

  constructor(private keyService: KeyService,
              private router: Router) { }

  ngOnInit() {
    if (!(this.keyService.validaAutorizacao('A'))) {
      this.router.navigate(['not-authorized']);
    }
  }

  goToSolicitacoes() {
    this.router.navigate(['administracao/solicitacoes-integracao-medico']);
  }
}
