import { Component, OnInit } from '@angular/core';

import { ForgotPasswordService } from './forgot-password.service';

import { Router } from '@angular/router';
import { MenuVisibilityService } from 'src/app/geral/menu-visibility/menu-visibility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  error: any;

  constructor(private forgotPasswordService: ForgotPasswordService,
              private menuVisibilityService: MenuVisibilityService,
              private router: Router) {

  }

  ngOnInit() {
    sessionStorage.clear();
    this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  resetPassword(medicoEmail: string) {
    this.forgotPasswordService.resetPassword(medicoEmail).subscribe(
      () => {
        this.router.navigate(['redefinir-senha-confirmacao']);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }
}
