import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
;

@Component({
  selector: 'app-reset-confirmation-screen',
  templateUrl: './reset-confirmation-screen.component.html',
  styleUrls: ['./reset-confirmation-screen.component.css']
})
export class ResetConfirmationScreenComponent implements OnInit {

  constructor(
    //private menuVisibilityService: MenuVisibilityService,
    private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    //this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
