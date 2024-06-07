import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private API_URL_ORDERS = 'http://localhost:5555/api/v1/e_c/orders/';
  constructor(private _http: HttpClient, private authService: AuthService) {}

  /**
   * get all orders
   * @returns all orders stoed in database.
   */

  getALLOrders(): Observable<any> {
    this.authService.user.subscribe((user) => {

    });
    return this._http.get<any>(this.API_URL_ORDERS).pipe(
      map((res) => {
        return res;
      })
    );
  }
  /**
   * This function will post the route in th api to add a new order to the database
   * @param data Objecct - data collected from fields
   * @returns Response from the api
   */
  createOrder(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL_ORDERS, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSingleOrder(oId: number): Observable<any>{
    return this._http.get<any>(this.API_URL_ORDERS + oId).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
  updateOrder(data: any, oId: number): Observable<any> {
    return this._http.patch<any>(`${this.API_URL_ORDERS}${oId}`, data).pipe(
      map((res) => {
        return res;
      })
      );
  }
  

  deleteOrder(oId: number): Observable<any>{
    return this._http.delete<any>(`${this.API_URL_ORDERS}/${oId}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}


