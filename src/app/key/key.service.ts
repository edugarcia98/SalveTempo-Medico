import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class KeyService {

  constructor() { }

  defineOptions(key: string) {
    var headers = new HttpHeaders(
      {
        "Authorization": "Token " + key
      }
    );

    var options = {
      headers: headers
    }

    return options;
  }
}
