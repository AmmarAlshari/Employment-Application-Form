import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviorments } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = enviorments.apiUrl;

  constructor(private http: HttpClient) {}
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  createRoles(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/roles`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }
  updateRoles(id: number, data: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/roles/${id}`, data).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  deleteRoles(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/roles/${id}`).pipe(
      map((response) => response)
      //   catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
