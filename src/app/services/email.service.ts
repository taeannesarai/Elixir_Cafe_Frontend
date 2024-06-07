import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

 private emailUrl = `${environment.api_url}/api/v1/e_c/email`;

  constructor(private _http: HttpClient) { }

  sendRegistrationEmail(user: any) {
    return this._http.post<any>(
      'http://localhost:5555/api/v1/e_c/email/',
      user
    ).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
