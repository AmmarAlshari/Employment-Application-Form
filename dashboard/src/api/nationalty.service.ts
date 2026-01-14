import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviorments } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NationalityService {
  private apiUrl = enviorments.apiUrl;

  constructor(private http: HttpClient) {}
  getNationality(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nationalities`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  createNationality(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/nationalities`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }
  updateNationalityy(id: number, data: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/nationalities/${id}`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  deleteNationality(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/nationalities/${id}`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  //   private handleError(error: HttpErrorResponse) {
  //     console.error('An error occurred:', error.error);
  //     return throwError(() => new Error('Something bad happened; please try again later.'));
  //   }
}
