import { Component, OnInit } from '@angular/core';

import { ForgotPasswordService } from './forgot-password.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  //private menuVisibilityService: MenuVisibilityService,
  error: any;

  constructor(private forgotPasswordService: ForgotPasswordService,

    private router: Router) {

  }

  ngOnInit() {
    sessionStorage.clear();
    //this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
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
