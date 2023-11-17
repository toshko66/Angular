import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from './models/competition';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private competitionsUrl = 'http://localhost:3000/competitions';

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.competitionsUrl);
  }
}
