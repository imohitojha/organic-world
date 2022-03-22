import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { Customer } from '../modals/customer';
import { ErrorHandler } from '../error-handler';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class AccountService {
  constructor(private http: HttpClient) { }

  API_URL = environment.API_URL;
  errorHandler: ErrorHandler = new ErrorHandler();

  // Function to get User's account details using email with JWT authentication token
  // and error handling using error-handler.ts
  getAccountDetails(payload: string): Observable<Customer> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .get(`${this.API_URL}/customers?email=${payload}`, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  // Function to update or create new User's account details with JWT authentication token
  // and error handling using error-handler.ts
  updateAccountDetails(payload: Customer): Observable<Customer> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .put(`${this.API_URL}/customers/${payload.id}`, payload, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  // Function to update or create new User's account details with JWT authentication token
  // and error handling using error-handler.ts
  addAccountDetails(payload: Customer): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .post(`${this.API_URL}/customers`, payload, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }
}
