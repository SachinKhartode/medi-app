import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { User } from '../Shared/User';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private BASE_URL: string = 'http://localhost:57980/api';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) {}

  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/User`;
    return this.http.post(url, user, {method:RequestMethod.Post, headers: this.headers}).toPromise();
  }

//   ensureAuthenticated(token): Promise<any> {
//     let url: string = `${this.BASE_URL}/status`;
//     let headers: Headers = new Headers({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     });
//     return this.http.get(url, {headers: headers}).toPromise();
//   }
//   register(user: User): Promise<any> {
//     let url: string = `${this.BASE_URL}/register`;
//     return this.http.post(url, user, {headers: this.headers}).toPromise();
//   }
}