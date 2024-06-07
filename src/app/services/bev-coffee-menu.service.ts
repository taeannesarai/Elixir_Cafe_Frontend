import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BevCoffeeMenuService {
  private API_URL_beverage = 'http://localhost:5555/api/v1/e_c/beverages/';

  constructor(private _http: HttpClient) {}

  /**
   * Get all beverage items
   * @returns all beverage items stored in database
   */

  getAllBeverages(): Observable<any> {
    return this._http.get<any>(this.API_URL_beverage).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * This function will the post route in the api to add a new beverage item to the database
   * @param data Object - data collected from form fields
   * @returns Response from the api
   */
  createBeverage(data: any, file: File): Observable<any> {
    const beverage: FormData = new FormData();
    if (file) {
      beverage.append('image', file, file.name);
    }
    beverage.append('item_nm', data.item_nm);
    beverage.append('descrip', data.descrip);
    beverage.append('prce', data.prce);

    return this._http.post<any>(this.API_URL_beverage, beverage).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * This function will call on the get request on the api to get a single beverage item.
   * @param beId Id for the beverage item user select.
   * @returns Response from the api with data of selected beverage item of message.
   */

  getOneBeverage(bcId: number): Observable<any> {
    return this._http.get<any>(this.API_URL_beverage + '/' + bcId).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateBeverage(data: any, bcId: number, file: File): Observable<any> {
    const beverage: FormData = new FormData();
    if (file) {
      beverage.append('image', file, file.name);
    }
    beverage.append('item_nm', data.item_nm);
    beverage.append('descrip', data.descrip);
    beverage.append('prce', data.prce);
    beverage.append('img', data.img);

    return this._http
      .patch<any>(`${this.API_URL_beverage}${bcId}`, beverage)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  
  deleteBeverage(bcId: number): Observable<any> {
    return this._http.delete<any>(`${this.API_URL_beverage}${bcId}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
