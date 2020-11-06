import { Component, OnInit } from '@angular/core';

import { ForgotPasswordService } from './forgot-password.service';

import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: any;

  constructor(private forgotPasswordService: ForgotPasswordService,
    //private menuVisibilityService: MenuVisibilityService,
    private router: Router,
    private spinnerService: NgxSpinnerService) {

  }

  ngOnInit() {
    sessionStorage.clear();
    //this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  resetPassword(medicoEmail: string) {
    this.error = "";
    this.spinnerService.show();

    this.forgotPasswordService.resetPassword(medicoEmail).subscribe(
      () => {
        this.router.navigate(['redefinir-senha-confirmacao']);
      },
      (error: any) => {
        this.spinnerService.hide();
        
        if (medicoEmail == "") { this.error = "E-mail não pode ser vazio."; }
        else { this.error = error.error.email; }
      }
    );
  }
}
