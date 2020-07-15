import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { KeyService } from 'src/app/geral/key/key.service';

@Component({
  selector: 'app-confirm-medico-unidade-saude',
  templateUrl: './confirm-medico-unidade-saude.component.html',
  styleUrls: ['./confirm-medico-unidade-saude.component.css']
})
export class ConfirmMedicoUnidadeSaudeComponent implements OnInit {

  error: any;

  constructor(private keyService: KeyService,
              private router: Router) { }

  ngOnInit() {
    if (!(this.keyService.validaAutorizacao('M'))) {
      this.router.navigate(['not-authorized']);
    }
  }

  goToUnidadesSaudeScreen() {
    this.router.navigate(['medico/unidades-saude']);
  }
}
