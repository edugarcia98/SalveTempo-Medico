import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-medico-unidade-saude',
  templateUrl: './confirm-medico-unidade-saude.component.html',
  styleUrls: ['./confirm-medico-unidade-saude.component.css']
})
export class ConfirmMedicoUnidadeSaudeComponent implements OnInit {

  error: any;

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'M') {
      this.router.navigate(['']);
    }
  }

  goToUnidadesSaudeScreen() {
    this.router.navigate(['medico/unidades-saude']);
  }
}
