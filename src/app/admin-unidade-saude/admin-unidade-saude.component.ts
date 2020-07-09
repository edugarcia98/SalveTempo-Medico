import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AdminUnidadeSaudeService } from './admin-unidade-saude.service';
import { AdminUnidadeSaude } from './admin-unidade-saude';

@Component({
  selector: 'app-admin-unidade-saude',
  templateUrl: './admin-unidade-saude.component.html',
  styleUrls: ['./admin-unidade-saude.component.css']
})
export class AdminUnidadeSaudeComponent implements OnInit {

  error: any;
  admin: AdminUnidadeSaude;

  constructor(private adminUnidadeSaudeService: AdminUnidadeSaudeService,
              private router: Router) { 

  }

  ngOnInit() {
    if (sessionStorage.getItem('key') == null || sessionStorage.getItem('tipo') != 'A') {
      this.router.navigate(['']);
    } else {
      this.adminUnidadeSaudeService.getAdminUnidadeSaudeById(sessionStorage.getItem('id')).subscribe(
        (admin: AdminUnidadeSaude) => {
          this.admin = admin;
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
        }
      )
    }
  }

}
