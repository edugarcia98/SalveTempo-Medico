import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyService } from './geral/key/key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salvetempo-medico';

  constructor(private keyService: KeyService) {
    // private menuVisibilityService: MenuVisibilityService) {

  }

  ngOnInit() {
    // if (this.keyService.validaAutorizacao('M')) {
    //   this.menuVisibilityService.controlMenuVisibility('medico', 'block');
    // } else if (this.keyService.validaAutorizacao('A')) {
    //   this.menuVisibilityService.controlMenuVisibility('admin', 'block');
    // }
  }
}
