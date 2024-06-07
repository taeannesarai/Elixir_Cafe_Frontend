import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private API_URL_ORDERDETAILS =
    'http://localhost:5555/api/v1/e_c/orderdetails/';
  constructor(private _http: HttpClient, private authService: AuthService) { }

  /**
   * get all orders
   * @returns all orders stoed in database.
   */
  viewOrderDetails(odId: number): Observable<any> {
    return this._http.get<any>(this.API_URL_ORDERDETAILS + '/' + odId).pipe(
      map((res) => {
        return res;
      })
    );
  }

}

