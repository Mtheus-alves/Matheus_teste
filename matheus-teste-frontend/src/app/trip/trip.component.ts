import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericTableComponent } from '../shared/generic-table/generic-table.component';
import { CreateTripModalComponent } from "./create-trip-modal/create-trip-modal.component";
import { TripService } from '../services/trip.service';
import { TripDTO } from './tripDTO';
import { GenericTableCols } from '../shared/generic-table-cols';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  imports: [GenericTableComponent, CreateTripModalComponent],
  providers: [CurrencyPipe],
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {
  trips: TripDTO[] = []
  loading: boolean = false
  subscription: Subscription = new Subscription()


  tableCols: GenericTableCols[] = [
    { field: 'nmDriver', header: 'Nome do Motorista' },
    { field: 'nmPassanger', header: 'Nome do passageiro' },
    { field: 'startAddress', header: 'Endereço de partida' },
    { field: 'endAddress', header: 'Endereço de chegada' },
    { field: 'tripValue', header: 'Valor da corrida' },
  ]

  constructor(private tripService: TripService, private currencyPipe: CurrencyPipe) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.getTrips()
  }

  getTrips() {
    this.loading = true;
    this.subscription.add(this.tripService.getTrips().subscribe({
      next: (res) => {
        this.trips = res.map((trip: TripDTO) => ({
          ...trip,
          tripValue: this.currencyPipe.transform(trip.tripValue, 'BRL', 'symbol', '1.2-2')?.replace('.', ',') || ''
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    }));
  }

  deleteTrip(trip: TripDTO) {
    this.subscription.add(this.tripService.deleteTrip(trip.idTrip).subscribe({
      next: () => {
        this.getTrips()
      },
      error: () => {
        this.loading = false;
      }
    }))
  }

}
