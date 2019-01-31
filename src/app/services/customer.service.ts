import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../domain/customer';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url:string="http://localhost:8080/customers"

  constructor(private auth :AuthService,private http:HttpClient) { }

  getCustomers(status:string):Observable<Customer[]>{
    let httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+ this.auth.getToken(),
      'Accept':'application/json'
    });
    let httpParam:HttpParams=new HttpParams();
    httpParam= httpParam.append('status',status);
    return this.http.get<Customer[]>(this.url,
      {'headers':httpHeader,
      'responseType':'json',
      'params':httpParam

      });

  }
}
