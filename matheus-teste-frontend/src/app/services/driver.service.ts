import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Driver } from '../driver/driver';

@Injectable({
  providedIn: 'root',
})
export class DriverService {

  private url: string = "https://backend-production-ed46.up.railway.app/driver"

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  postDriver(driver: Driver): Observable<any> {
    return this.http.post(this.url, driver).pipe(
      catchError(this.handleError)
    );
  }

  putStatusDriver(idDriver: number, status: boolean): Observable<any> {
    return this.http.put(`${this.url}/${idDriver}/${status}`,null).pipe(
      catchError(this.handleError)
    );
  }

  deleteDriver(idDriver: number): Observable<any> {
    return this.http.delete(`${this.url}/${idDriver}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Erro ao buscar dados. Tente novamente mais tarde.'));
  }
}
