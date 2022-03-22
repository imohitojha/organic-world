import { Order } from './../modals/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ErrorHandler } from '../error-handler';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class OrderService {
  constructor(private http: HttpClient) { }

  private API_URL = environment.API_URL;
  errorHandler: ErrorHandler = new ErrorHandler();

  // Function to create a new Order with JWT authentication token
  // and error handling using error-handler.ts
  addOrders(payload: Order): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .post(`${this.API_URL}/orders`, payload, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  // Function to get all orders of a user using user id with JWT authentication token
  // and error handling using erro-handler.ts
  getOrdersByCustomer(payload: string): Observable<Order[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .get<Order[]>(`${this.API_URL}/orders?customerId=${payload}`, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }
}
