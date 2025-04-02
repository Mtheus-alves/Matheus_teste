import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor() {}

  getAddresses(address: string): Observable<any> {
    return new Observable((observer) => {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: address },
        (predictions: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            observer.next(predictions);
            observer.complete();
          } else {
            observer.error(status);
          }
        }
      );
    });
  }

  getDistanceBetweenAddresses(origin: string, destination: string): Observable<any> {
    return new Observable((observer) => {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response: any, status: any) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            observer.next(response);
            observer.complete();
          } else {
            observer.error(status);
          }
        }
      );
    });
  }
}
