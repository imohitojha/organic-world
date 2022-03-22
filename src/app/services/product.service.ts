import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ErrorHandler } from '../error-handler';
import { Product } from '../modals/product';

@Injectable({
  providedIn: 'root',
})
// Use 'API_URL' from environment.ts
export class ProductService {
  constructor(private http: HttpClient) { }

  private API_URL = environment.API_URL;
  errorHandler: ErrorHandler = new ErrorHandler();

  // Function to get all products available with JWT authentication token
  // and error handling using error-handler.ts
  getAllProducts(): Observable<Product[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .get<Product[]>(`${this.API_URL}/products`, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  // Function to get all products of particular category with JWT authentication token
  // and error handling using error-handler.ts
  getProductsByCategory(payload: string): Observable<Product[]> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http
      .get<Product[]>(`${this.API_URL}/products?category=${payload}`, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }
}
