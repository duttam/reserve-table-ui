import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestOptions, Headers,Http } from '@angular/http';

import { Observable, Subject, throwError, pipe, of} from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  storageKey: string = 'contact-manager-jwt';

  constructor(private router: Router,private http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }
  deleteToken(){
    localStorage.clear();
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  login(value: String):Observable<any> {
    let payload: String = JSON.stringify(value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.http.post<String>("http://localhost:8080/auth",payload,httpOptions).pipe(
      tap((jwt: String) => console.log(jwt)),
      catchError(this.handleError('login'))
    );

    // return this.http.post("http://localhost:8080/auth",payload,httpOptions)
    // .pipe(map);
    
    
}
//if token does  exist it will return true
  isLoggedIn() {
    //console.log("JWT toekn value "+this.getToken());
    
    return this.getToken() !== null;
  }


  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
     // error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(error.message);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
