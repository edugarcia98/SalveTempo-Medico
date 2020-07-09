import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from './unidade-saude.service';
import { UnidadeSaude } from './unidade-saude';

import { MedicoUnidadeSaude } from './medico-unidade-saude';

import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-unidades-saude',
  templateUrl: './unidades-saude.component.html',
  styleUrls: ['./unidades-saude.component.css']
})
export class UnidadesSaudeComponent implements OnInit {

  error: any;
  unidadesSaudeMedico: MedicoUnidadeSaude[];

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private router: Router) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'M') {
      this.router.navigate(['']);
    } else {
      this.unidadeSaudeService.getUnidadesSaudeFromMedico(sessionStorage.getItem('key'),
      sessionStorage.getItem('id')).subscribe(
        (items: MedicoUnidadeSaude[]) => {
          this.unidadesSaudeMedico = items;
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    }
  }

  goToCadastro() {
    this.router.navigate(['medico/unidades-saude/cadastrar']);
  }

  goToDetails(id: number) {
    this.router.navigate([`medico/unidades-saude/${id}/detail`])
  }

  goToDelete(id: number) {
    this.router.navigate([`medico/unidades-saude/${id}/delete`])
  }
}
