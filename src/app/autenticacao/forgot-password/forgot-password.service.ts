import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(email: string) {
    var url = GlobalConstants.apiBaseUrl + 'rest-auth/password/reset/';

    var data = {
      "email": email
    }

    return this.http.post(url, data);
  }
}
