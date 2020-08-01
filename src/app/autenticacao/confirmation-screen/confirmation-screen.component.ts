import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MenuVisibilityService } from 'src/app/geral/menu-visibility/menu-visibility.service';

@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.css']
})
export class ConfirmationScreenComponent implements OnInit {

  constructor(private menuVisibilityService: MenuVisibilityService,
              private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    this.menuVisibilityService.controlMenuVisibility('medico;admin', 'none');
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
