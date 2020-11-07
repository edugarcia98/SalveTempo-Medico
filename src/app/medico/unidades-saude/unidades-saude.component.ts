import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from './unidade-saude.service';
import { UnidadeSaude } from './unidade-saude';

import { MedicoUnidadeSaude } from './medico-unidade-saude';

import { KeyService } from 'src/app/geral/key/key.service';

import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unidades-saude',
  templateUrl: './unidades-saude.component.html',
  styleUrls: ['./unidades-saude.component.css']
})
export class UnidadesSaudeComponent implements OnInit {

  error: any;
  unidadesSaudeMedico: MedicoUnidadeSaude[];

  faBars = faBars;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private keyService: KeyService,
              private router: Router) {
    this.unidadesSaudeMedico = [];
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('M')) {
      this.unidadeSaudeService.getUnidadesSaudeFromMedico(sessionStorage.getItem('key'),
      sessionStorage.getItem('id')).subscribe(
        (items: MedicoUnidadeSaude[]) => {
          
          items.forEach(
            (item: MedicoUnidadeSaude) => {

              switch (item.status) {
                case 'P': { item.statusStr = 'Pendente'; break }
                case 'A': { item.statusStr = 'Aprovado'; break }
                case 'R': { item.statusStr = 'Recusado'; break }
              }

              this.unidadesSaudeMedico.push(item);

            }
          );
          

        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  goToCadastro() {
    this.router.navigate(['medico/unidades-saude/cadastrar']);
  }

  goToDetails(id: number) {
    this.router.navigate([`medico/unidades-saude/${id}/detail`])
  }

  goToDelete(id: number) {
    this.router.navigate([`medico/unidade-saude/${id}/delete`])
  }

  goToHomeMedico() {
    this.router.navigate(['medico']);
  }
}
