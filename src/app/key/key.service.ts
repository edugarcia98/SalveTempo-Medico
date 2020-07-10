import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

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

  getUrlId(identifier: string, route: ActivatedRoute) {
    let id = parseInt(route.snapshot.paramMap.get(identifier));
    return id;
  }
}
