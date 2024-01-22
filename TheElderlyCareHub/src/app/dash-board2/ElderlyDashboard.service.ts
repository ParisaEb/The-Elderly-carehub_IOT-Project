import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElderlyDashboardService {
  constructor(private http: HttpClient) {}

  getPresentElderlies(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/present-elderlies');
  }
  getHighElderlies(): Observable<string[]> {
      return this.http.get<string[]>('http://localhost:3000/api/HighElderlies');
    }

}