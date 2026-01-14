import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviorments } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = enviorments.apiUrl;

  constructor(private http: HttpClient) {}
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cities`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  createCity(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/cities`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }
  updateCity(id: number, data: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/cities/${id}`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  deleteCity(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/cities/${id}`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  //   private handleError(error: HttpErrorResponse) {
  //     console.error('An error occurred:', error.error);
  //     return throwError(() => new Error('Something bad happened; please try again later.'));
  //   }
}
