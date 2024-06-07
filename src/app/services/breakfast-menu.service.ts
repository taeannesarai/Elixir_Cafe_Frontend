import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakfastMenuService {
  private API_URL_breakfast = ' http://localhost:5555/api/v1/e_c/breakfast/';

  constructor(private _http: HttpClient) { }


  /**
 * Get all Breakfast items
 * @returns all breakfast items stored in database
 */

  getAllBreakfast(): Observable<any> {
    return this._http.get<any>(this.API_URL_breakfast)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  
  
  /**
  * This function will the post route in the api to add a new breakfast item to the database
  * @param data Object - data collected from form fields
  * @returns Response from the api
  */
  createBreakfast(data: any, file: File): Observable<any> {
    const breakFast: FormData = new FormData();
    if (file) {
      breakFast.append('image', file, file.name);
    }
    breakFast.append('item_nm', data.item_nm)
    breakFast.append('descrip ', data.descrip)
    breakFast.append('prce', data.prce)
    
    return this._http.post<any>(this.API_URL_breakfast, breakFast).pipe(
      map((res) => {
        return res;
      })
    );
  }


  /**
    * This function will call on the get request on the api to get a single breakfast item.
    * @param bId Id for the breakfast item user select.
    * @returns Response from the api with data of selected breakfast item of message.
    */

  getOneBreakfast(bId: number): Observable<any> {
    return this._http.get<any>(this.API_URL_breakfast + '/' + bId).pipe(
      map((res) => {
        return res;
      })
    );
  }


  updateBreakfast(data: any, bId: number, file: File): Observable<any> {
     const breakFast: FormData = new FormData();
    if (file) {
      breakFast.append('image', file, file.name);
    }
    breakFast.append('item_nm', data.item_nm)
    breakFast.append('descrip', data.descrip)
    breakFast.append('prce', data.prce)
    breakFast.append('img', data.img)

    return this._http.patch<any>(`${this.API_URL_breakfast}${bId}`, breakFast).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteBreakfast(bId: number): Observable<any> {
    return this._http.delete<any>(`${this.API_URL_breakfast}${bId}`).pipe(
      map((res) => {
        return res;
      })
    );
  }



}

