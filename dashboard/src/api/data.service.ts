import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviorments } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = enviorments.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard`).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
