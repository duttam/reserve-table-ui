import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { Employee } from '../domain/employee';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url:string = "http://localhost:8080/api/employee";

  private static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
        if (error.status === 404) {
            errMsg = `Resource ${error.url} was not found`;    
        } else {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
}

constructor(private http: HttpClient,private auth:AuthService) {
}

getEmployees(): Observable<Employee[]> {
  let httpHeader: HttpHeaders=new HttpHeaders({
    'Content-Type':  'application/json',
      'Authorization': "Bearer "+ this.auth.getToken(),
      'Accept':'application/json'
  })
    return this.http.get<Employee[]>(this.url,{
      'headers' : httpHeader,
      'responseType': 'json'
    });
        
  }
// createEmployee(employee: Employee): Observable<Employee> {
//     return this.http.post('/fake-backend/employees', employee)
//         .map(response => response.json() as Employee)
//         .catch(EmployeeService.handleError);
// }

updateEmployee(value: any): Observable<any> {
  let payload :string=JSON.stringify(value);
  const httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':"Bearer "+this.auth.getToken()
    })
  }
  return this.http.post<String>(this.url,payload,httpOptions).pipe(
    tap((jwt: String) => console.log(jwt)),
    catchError(this.handleError('employee'))
  );
}

createEmployee(value: any): Observable<any> {
  let payload :string=JSON.stringify(value);
  const httpOptions= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':"Bearer "+this.auth.getToken()
    })
  }
  return this.http.post<String>(this.url,payload,httpOptions).pipe(
    tap((jwt: String) => console.log(jwt)),
    catchError(this.handleError('employee'))
  );
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


// deleteEmployee(id: string): Observable<any> {
//     return this.http.delete('/fake-backend/employees/' + id)
//         .map(response => response.json())
//         .catch(EmployeeService.handleError);
// }

}
