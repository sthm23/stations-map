import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { IAtcData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationIconService {
  url = 'http://localhost:5000/api/stations'
  constructor(private http: HttpClient) { }

  getLocation():Observable<IAtcData[]> {
      return this.http.get<IAtcData[]>(this.url)
        .pipe(
          catchError((err) => {
            console.log(err);
            return EMPTY;
          }),
        );
  }

  addLocation(option: IAtcData) {
    const headers = new HttpHeaders({
      method: 'POST',
      body: JSON.stringify(option)
    })
    return this.http.post<IAtcData>(this.url, {headers})
      .pipe(
        catchError(err => {
        console.log(err);
        return EMPTY
      })
    );
  }

  removeLocation(id:string) {
    return this.http.delete(this.url+`/${id}`)
      .pipe(
        catchError(err => {
        console.log(err);
        return EMPTY
      })
    );
  }

}
