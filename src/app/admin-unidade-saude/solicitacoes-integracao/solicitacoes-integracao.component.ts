import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AdminUnidadeSaudeService } from '../admin-unidade-saude.service';
import { AdminUnidadeSaude } from '../admin-unidade-saude';

import { MedicoUnidadeSaude } from 'src/app/unidades-saude/medico-unidade-saude';

@Component({
  selector: 'app-solicitacoes-integracao',
  templateUrl: './solicitacoes-integracao.component.html',
  styleUrls: ['./solicitacoes-integracao.component.css']
})
export class SolicitacoesIntegracaoComponent implements OnInit {

  error: any;
  admin: AdminUnidadeSaude;
  medicosUnidadeSaude: MedicoUnidadeSaude[]

  constructor(private adminUnidadeSaudeService: AdminUnidadeSaudeService,
              private router: Router) {
    this.medicosUnidadeSaude = [];
  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'A') {
      this.router.navigate(['']);
    } else {
      this.adminUnidadeSaudeService.getAdminUnidadeSaudeById(sessionStorage.getItem('id')).subscribe(
        (admin: AdminUnidadeSaude) => {
          this.admin = admin;
          this.adminUnidadeSaudeService.getMedicosByUnidadeSaudeId(sessionStorage.getItem('key'),
          this.admin.unidadeSaudeResponsavel.id.toString()).subscribe(
            (items: MedicoUnidadeSaude[]) => {
              items.forEach(
                (item: MedicoUnidadeSaude) => {
                  if (item.status == 'P') {
                    this.medicosUnidadeSaude.push(item);
                  }
                }
              )
            },
            (error: any) => {
              this.error = error;
              console.log(this.error);
            }
          )
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    }
  }

  goToInfo(id: number) {
    this.router.navigate([`administracao/solicitacoes-integracao-medico/${id}/detail`])
  }
}
