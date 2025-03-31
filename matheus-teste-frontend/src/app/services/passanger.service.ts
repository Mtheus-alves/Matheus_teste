import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Passanger } from '../passanger/Passanger';

@Injectable({
  providedIn: 'root'
})
export class PassangerService {

  private url: string = "https://backend-production-2825.up.railway.app/passanger"

  constructor(private http: HttpClient) { }

  getPassangers(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  postPassanger(passanger: Passanger): Observable<any> {
    return this.http.post(this.url, passanger).pipe(
      catchError(this.handleError)
    );
  }

  deletePassanger(idPassanger: number): Observable<any> {
    return this.http.delete(`${this.url}/${idPassanger}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro ao buscar dados. Tente novamente mais tarde.'));
  }
}