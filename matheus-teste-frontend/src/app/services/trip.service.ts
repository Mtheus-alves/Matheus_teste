import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Passanger } from '../passanger/Passanger';
import { Trip } from '../trip/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private url: string = "https://backend-production-ed46.up.railway.app/trip"

  constructor(private http: HttpClient) { }

  getTrips(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  postTrip(trip: Trip): Observable<any> {
    return this.http.post(this.url, trip).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrip(idTrip: number): Observable<any> {
    return this.http.delete(`${this.url}/${idTrip}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Erro ao buscar dados. Tente novamente mais tarde.'));
  }
}