import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, EMPTY, of } from 'rxjs';
import { IAtcData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationIconService {
  addressUrl = 'https://nominatim.uztelecom.uz/reverse?'
  // addressUrl = 'https://nominatim.openstreetmap.org/reverse?'

  // url = 'http://localhost:5000/api/stations'
  url = 'https://basestationsmapserver.herokuapp.com/api/stations';
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
    return this.http.post<IAtcData>(this.url, option)
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
        return of({message: 'error'})
      })
    );
  }
//lat=41.545&lon=60.6305&format=json&accept-language=en&zoom=5
  getAddress(lat:number, lon:number) {
    let params = new HttpParams();
    params = params.append('lat', lat);
    params = params.append('lon', lon);
    params = params.append('format', 'json');
    params = params.append('accept-language', 'en');
    params = params.append('zoom', '12');

    return this.http.get(this.addressUrl, {params})
  }

  updateLocation(id:any, obj:any) {
    return this.http.put(`${this.url}/${id}`, obj, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
        catchError(err => {
          return of({message: 'error'})
        })
      );
  }

}
