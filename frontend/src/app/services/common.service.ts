import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.tokenLocalStorage}`
  });

  get<T>(path: string, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`, {
      params: options?.params,
      headers: options?.headers ?? this.defaultHeader
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  post<T>(path: string,data:any, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, data, {
      params: options?.params,
      headers: options?.headers ?? this.defaultHeader,
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  put<T>(path: string,data:any, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, data, {
      params: options?.params,
      headers: options?.headers ?? this.defaultHeader,
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  delete<T>(path: string, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}`, {
      params: options?.params,
      headers: options?.headers ?? this.defaultHeader,
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }









  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
