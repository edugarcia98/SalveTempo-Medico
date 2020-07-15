import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AdminUnidadeSaudeService } from '../admin-unidade-saude.service';
import { AdminUnidadeSaude } from '../admin-unidade-saude';

import { MedicoUnidadeSaude } from 'src/app/unidades-saude/medico-unidade-saude';

import { KeyService } from 'src/app/key/key.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  error: any;
  admin: AdminUnidadeSaude;
  medicosUnidadeSaude: MedicoUnidadeSaude[];

  constructor(private adminUnidadeSaudeService: AdminUnidadeSaudeService,
              private keyService: KeyService,
              private router: Router) {
    this.medicosUnidadeSaude = [];
  }

  ngOnInit() {
    if (this.keyService.validaAutorizacao('A')) {
      this.adminUnidadeSaudeService.getAdminUnidadeSaudeById(sessionStorage.getItem('id')).subscribe(
        (admin: AdminUnidadeSaude) => {
          this.admin = admin;
          this.adminUnidadeSaudeService.getMedicosByUnidadeSaudeId(sessionStorage.getItem('key'),
          this.admin.unidadeSaudeResponsavel.id.toString()).subscribe(
            (items: MedicoUnidadeSaude[]) => {
              items.forEach(
                (item: MedicoUnidadeSaude) => {
                  if (item.status == 'A') {
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
    } else {
      this.router.navigate(['not-authorized']);
    }
  }

  goToInfo(id: number) {
    this.router.navigate([`administracao/medico/${id}/detail`])
  }

  goToDelete(id: number) {
    this.router.navigate([`administracao/medico/${id}/delete`])
  }
}
