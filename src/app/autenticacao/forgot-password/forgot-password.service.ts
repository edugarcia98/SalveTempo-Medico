import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(email: string) {
    var url = 'http://192.168.1.21:8000/rest-auth/password/reset/';

    var data = {
      "email": email
    }

    return this.http.post(url, data);
  }
}
