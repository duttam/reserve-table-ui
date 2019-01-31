import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../domain/restaurant';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url:string="http://localhost:8080/restaurants";

  constructor(private auth : AuthService,private http: HttpClient) { }
  getRestaurants():Observable<Restaurant[]>{
    let httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+ this.auth.getToken(),
      'Accept':'application/json'
    });
    
    return this.http.get<Restaurant[]>(this.url,{
      'headers' : httpHeader,
      'responseType': 'json'
    });

  }
}
