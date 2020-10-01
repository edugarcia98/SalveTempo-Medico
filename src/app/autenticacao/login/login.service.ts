import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { KeyService } from 'src/app/geral/key/key.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private keyService: KeyService) {

  }

  login(email: string, password: string) {
    var url = GlobalConstants.apiBaseUrl + 'rest-auth/login/';

    var data = {
      "username": email,
      "email": email,
      "password": password
    }

    return this.http.post(url, data);
  }

  logout(key: string) {
    var url = GlobalConstants.apiBaseUrl + 'rest-auth/logout/';
    var options = this.keyService.defineOptions(key);

    var data = {};

    return this.http.post(url, data, options);
  }
}
