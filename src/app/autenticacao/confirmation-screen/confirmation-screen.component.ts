import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.css']
})
export class ConfirmationScreenComponent implements OnInit {

  constructor(
    // private menuVisibilityService: MenuVisibilityService,
    private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    // this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
