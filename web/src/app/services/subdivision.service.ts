import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseData, Subdivision } from '../models/app.interface';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {

  private apiUrl = 'http://localhost:3000/v1/subdivisions';

  constructor(private http: HttpClient) {}


  getSubvisionData(): Observable<Subdivision[]> {
    return this.http.get<ResponseData>(this.apiUrl).pipe(map(data => data.subdivisions));
  }

}
