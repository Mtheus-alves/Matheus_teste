import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private corsProxy: string = 'https://cors-anywhere.herokuapp.com/';
  private placesUrl: string = `${this.corsProxy}https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  private distanceUrl: string = `${this.corsProxy}https://maps.googleapis.com/maps/api/distancematrix/json`;
  private key: string = 'AIzaSyDFrkGbDP4c2Dowk80qjflJKXb1jNco5T8';

  constructor(private http: HttpClient) {}

  getAddresses(address: string): Observable<any> {
    const params = {
      input: address,
      key: this.key,
    };

    return this.http.get(this.placesUrl, { params });
  }

  getDistanceBetweenAddresses(origin: string, destination: string): Observable<any> {
    const params = {
      destinations: destination,
      origins: origin,
      mode: 'driving',
      key: this.key,
    };

    return this.http.get(this.distanceUrl, { params });
  }
}
