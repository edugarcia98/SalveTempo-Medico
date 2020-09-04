import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    var url = GlobalConstants.apiBaseUrl + 'rest-auth/login/';

    var data = {
      "username": email,
      "email": email,
      "password": password
    }

    return this.http.post(url, data);
  }
}
