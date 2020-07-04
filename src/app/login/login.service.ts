import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    var url = 'http://192.168.1.21:8000/rest-auth/login/';

    var data = {
      "username": email,
      "email": email,
      "password": password
    }

    return this.http.post(url, data);
  }
}
