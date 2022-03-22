import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandler } from '../error-handler';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class LoginRegisterService {
  constructor(private http:HttpClient) {}

  private API_URL = environment.API_URL;
  errorHandler:ErrorHandler = new ErrorHandler();

  // Function to send login data to the backend
  // and error handling using error-handler.ts
  login(payload: object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http
    .post(`${this.API_URL}/auth/login`, payload, httpOptions)
    .pipe(catchError((error: HttpErrorResponse) =>this.errorHandler.handleError(error)));
  }

  // Function to send register data to the backend
  // and error handling using error-handler.ts
  register(payload: object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http
    .post(`${this.API_URL}/auth/register`, payload, httpOptions)
    .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }
}
