import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { KeyService } from '../key/key.service';

import { UnidadeSaudeService } from '../unidades-saude/unidade-saude.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  public tipoUsuario;
  public item;
  public id;
  error: any;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private keyService: KeyService,
              private route: ActivatedRoute,
              private router: Router) { 

}

  ngOnInit() {
    this.tipoUsuario = this.route.snapshot.paramMap.get('tipousuario');
    this.item = this.route.snapshot.paramMap.get('item');

    if (this.item == 'medico'){
      if (this.keyService.validaAutorizacao('A')) {
        this.id = this.keyService.getUrlId('id', this.route);
      } else {
        this.router.navigate(['not-authorized']);
      }
    } else if (this.item == 'unidade-saude') {
      if (this.keyService.validaAutorizacao('M')) {
        this.id = this.keyService.getUrlId('id', this.route);
      } else {
        this.router.navigate(['not-authorized']);
      }
    }
  }

  delete() {
    this.unidadeSaudeService.deleteMedicoUnidadeSaude(sessionStorage.getItem('key'), this.id).subscribe(
      () => {
        this.back();
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }

  back() {
    if (this.item == 'medico') {
      this.router.navigate(['administracao/equipe']);
    } else if (this.item == 'unidade-saude') {
      this.router.navigate(['medico/unidades-saude']);
    }
  }
}
