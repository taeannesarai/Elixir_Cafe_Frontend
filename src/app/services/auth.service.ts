import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private currUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  private API_URL_AUTH = 'http://localhost:5555/api/v1/auth';

  constructor(private _http: HttpClient) {}
  user = new Subject<User>();
  /**
   * Sign up a user - save user login information to database
   * @param data Object containing data from sign up form (email and password)
   * @returns
   */
  signUp(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL_AUTH + '/signup', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Login a user - checks if user exists in database and if they exist it password is correct
   * it starts a session and allow access to parts of the website
   * @param data Object - Login Credentials(password and email)
   * @returns
   */
  login(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL_AUTH, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * To logout a user
   * @returns response from api
   */
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loginState = false;
    this.currUser = undefined;
  }

  // New authentication implementation
  public authToken?: string;
  private tokenKey: string = 'authToken';
  currUser: any;
  public currentUser$: Observable<any> = this.currUserSubject.asObservable();
  loginState?: boolean;

  /**
   * Function to save item to localStorage
   * @param key Key name of item you want to store
   * @param value Whatever you want to store
   */
  private _saveToStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  saveAuthToken(): void {
    this._saveToStorage(this.tokenKey, this.authToken);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  getCurrUser(cb?: () => void) {
    this.getProfile().subscribe((res) => {
      if (res['status'] === 'success') {
        this.currUser = res.data.user;
        this.currUserSubject.next(res.data.user);
        console.log('CURRENT USER FROM AUTH SERVICE -- ', this.currUser);
        if (cb) cb();
      }
    });
  }

    getProfile(): Observable<any> {
    return this._http.get<any>(`${this.API_URL_AUTH}/user-data`).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
