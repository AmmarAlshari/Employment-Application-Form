import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviorments } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface City {
  id: number;
  cityName: string;
  cityNameAr: string;
}
export interface Nationality {
  id: number;
  countryName: string;
  countryNameAr: string;
}

export interface SelectedRole {
  id: number;
  roleName: string;
  roleNameAr: string;
}

export interface Qualification {
  id: number;
  qualificationName: string;
  qualificationNameAr: string;
}

@Injectable({ providedIn: 'root' })
export class LookupsService {
  private base = enviorments.apiUrl;

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.base}/cities`);
  }
  getNationalities(): Observable<Nationality[]> {
    return this.http.get<Nationality[]>(`${this.base}/nationalities`);
  }
  getSelectedRoles(): Observable<SelectedRole[]> {
    return this.http.get<SelectedRole[]>(`${this.base}/roles`);
  }
  getQualifications(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${this.base}/qualifications`);
  }
}
