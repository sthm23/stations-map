import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  // url = 'http://localhost:5000/api/regions'
  url = 'http://185.74.5.173/api/regions'
  constructor(private http: HttpClient) { }

  getRegions() {
    return this.http.get(this.url)
              .pipe(
                catchError((err)=>{
                  console.log(err);
                  return of({message:'error'});
                })
              )
  }

  getOneRegion(id:number) {
    return this.http.get(`${this.url}/${id}`)
              .pipe(
                catchError((err)=>{
                  console.log(err);
                  return of({message:'error'});
                })
              )
  }

  getUzbMap() {
    return this.http.get(`${this.url}/100`)
              .pipe(
                catchError((err)=>{
                  console.log(err);
                  return of({message:'error'});
                })
              )
  }

  getDistricts(id:number, dist_id:number[]) {

    return this.http.post(`${this.url}/${id}`, {dist: dist_id})
              .pipe(
                catchError((err)=>{
                  console.log(err);
                  return of({message:'error'});
                })
              )
  }
}
