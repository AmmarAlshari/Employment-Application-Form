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

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ApplicationDashboard`).pipe(
      map((response) => response),
      // catchError(this.handleError)
    );
  }
  deletApplications(): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/ApplicationDashboard`).pipe(
      map((response) => response),
      // catchError(this.handleError)
    );
  }
  updateApplicationStatus(applicationId: number, statusId: number) {
    return this.http.put(`${this.apiUrl}/ApplicationDashboard/${applicationId}/status`, {
      statusId,
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/users`).pipe(
      map((response) => response),
      // catchError(this.handleError)
    );
  }
  createUser(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/dashboard/create/users`, data).pipe(
      map((response) => response),
      // catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
