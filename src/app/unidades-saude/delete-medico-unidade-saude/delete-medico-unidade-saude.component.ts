import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UnidadeSaudeService } from '../unidade-saude.service';

@Component({
  selector: 'app-delete-medico-unidade-saude',
  templateUrl: './delete-medico-unidade-saude.component.html',
  styleUrls: ['./delete-medico-unidade-saude.component.css']
})
export class DeleteMedicoUnidadeSaudeComponent implements OnInit {

  public id;
  error: any;

  constructor(private unidadeSaudeService: UnidadeSaudeService,
              private route: ActivatedRoute,
              private router: Router) { 

  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null) {
      this.router.navigate(['']);
    } else { 
      let id = parseInt(this.route.snapshot.paramMap.get('uid'));
      this.id = id;
    }
  }

  delete() {
    this.unidadeSaudeService.deleteMedicoUnidadeSaude(sessionStorage.getItem('key'), this.id).subscribe(
      () => {
        this.goToUnidadesSaude();
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }

  goToUnidadesSaude() {
    this.router.navigate(['medico/unidades-saude']);
  }
}
