import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Reservation } from '../domain/reservation';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
   url:string = "http://localhost:8080/reserve";
  constructor(private http: HttpClient,private auth: AuthService) { }
  // getReservations(){
  //   return this.http.get<any>('assets/data/reservation.json')
  //                             .toPromise()
  //                             .then(res=>
  //                               <[Reservation]> res.data)
  //                             .then(data=>data);

  // }
  getReservation(): Observable<Reservation[]>{
    let httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+ this.auth.getToken(),
      'Accept':'application/json'
    });

    //let httpParams: HttpParams = {}
    
    return this.http.get<Reservation[]>(this.url,{
      'headers' : httpHeader,
      'responseType': 'json'
    });

  }
  posttReservation(value: any):Observable<any>{
    let payload: String = JSON.stringify(value);
    let httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+ this.auth.getToken(),
      'Accept':'application/json'
    });

    //let httpParams: HttpParams = {}
    
    return this.http.post(this.url,payload,{
      'headers' : httpHeader,
      'responseType': 'json',
      
    });

  }

  postReservation(value: any):Observable<any> {
    let payload: String = JSON.stringify(value);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':"Bearer "+this.auth.getToken()
      })
    };
    
    return this.http.post<String>(this.url,payload,httpOptions).pipe(
      tap((jwt: String) => console.log(jwt)),
      catchError(this.handleError('reserve'))
    );

    // return this.http.post("http://localhost:8080/auth",payload,httpOptions)
    // .pipe(map);
    
    
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
