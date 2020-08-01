import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuVisibilityService {

  constructor() { }

  controlMenuVisibility(menuOptions: string, displayOption: string) {
    if (menuOptions.search('medico') >= 0) {
      document.getElementById("medico-items").style.display = displayOption;
    }

    if (menuOptions.search('admin') >= 0) {
      document.getElementById("admin-items").style.display = displayOption;
    }
  }
}
