import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  currID : String = ' ';
  logged = false;

  constructor(private http: HttpClient) {
  }

 getAll(): Observable<any> {
   return this.http.get(baseUrl);
 }

 get(id: any): Observable<any> {
   return this.http.get(`${baseUrl}/${id}`);
 }

 create(data: any): Observable<any> {
   return this.http.post(baseUrl, data);
 }

 update(id: any, data: any): Observable<any> {
   return this.http.put(`${baseUrl}/${id}`, data);
 }

 delete(id: any): Observable<any> {
   return this.http.delete(`${baseUrl}/${id}`);
 }

 auth(data : any): Observable<any>{
   return this.http.post('http://localhost:3000/api/auth', data);
 }

 add_to_cart(data : any):  Observable<any> {
  return this.http.post('http://localhost:3000/api/customer/cart', data);
 }

 buy(data : any): Observable<any> {
   return this.http.post('http://localhost:3000/api/customer/cart/buy', data);
 }
}
