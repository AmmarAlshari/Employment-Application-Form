import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviorments } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  private apiUrl = enviorments.apiUrl;

  constructor(private http: HttpClient) {}
  getQualifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/qualifications`).pipe(
      map((response) => response),
    //   catchError(this.handleError)
    );
  }

  createQualifications(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/qualifications`, data).pipe(
      map((response) => response),
    //   catchError(this.handleError)
    );
  }
  updateQualifications(id: number, data: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/qualifications/${id}`, data).pipe(
      map((response) => response),
    //   catchError(this.handleError)
    );
  }

  deleteQualifications(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/qualifications/${id}`).pipe(
      map((response) => response),
    //   catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
