import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './autenticacao/login/login.service';
import { KeyService } from './geral/key/key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salvetempo-medico';

  error: any;

  constructor(private keyService: KeyService,
              private loginService: LoginService,
              //private menuVisibilityService: MenuVisibilityService,
              private router: Router) {

  }

  ngOnInit() {
    //if (this.keyService.validaAutorizacao('M')) {
    //  this.menuVisibilityService.controlMenuVisibility('medico', 'flex');
    //} else if (this.keyService.validaAutorizacao('A')) {
    //  this.menuVisibilityService.controlMenuVisibility('admin', 'flex');
    //}
  }

  sair() {
    this.loginService.logout(sessionStorage.getItem('key')).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    )
  }
}
