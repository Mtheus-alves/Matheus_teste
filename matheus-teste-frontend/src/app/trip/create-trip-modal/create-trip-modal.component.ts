import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { PassangerService } from '../../services/passanger.service';
import { DriverService } from '../../services/driver.service';
import { DatePipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { Driver } from '../../driver/driver';
import { Passanger } from '../../passanger/Passanger';
import { Trip } from '../trip';
import { forkJoin, Subscription } from 'rxjs';
import { AddressService } from '../../services/address.service';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-create-trip-modal',
  templateUrl: './create-trip-modal.component.html',
  providers: [MessageService, provideNgxMask(), DatePipe],
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, FormsModule, ReactiveFormsModule, CommonModule, ToastModule, NgxMaskDirective, AutoCompleteModule],
  styleUrls: ['./create-trip-modal.component.scss']
})
export class CreateTripModalComponent implements OnInit, OnDestroy {
  @Output() attTable: EventEmitter<any> = new EventEmitter();
  subscription: Subscription = new Subscription()

  filteredStartAddresses: any
  filteredEndAddresses: any
  distance: any = {}

  loading: boolean = false
  visible: boolean = false;
  kmValue: string = ""

  drivers: Driver[] = []
  passangers: Passanger[] = []
  trip: Trip = { tripValue: -1, idDriver: -1, idPassanger: -1, endAddress: null, startAddress: null }
  formTrip!: FormGroup;

  constructor(private formBuilder: FormBuilder, private tripService: TripService, private passangerService: PassangerService, private driverService: DriverService, private messageService: MessageService, private addressService: AddressService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.loadData();

    this.formTrip = this.formBuilder.group({
      idDriver: ['', Validators.required],
      idPassanger: ['', Validators.required],
      startAddress: ['', Validators.required],
      endAddress: ['', Validators.required],
      tripValue: ['', Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  loadData() {
    this.subscription.add(
      forkJoin({
        drivers: this.driverService.getDrivers(),
        passangers: this.passangerService.getPassangers()
      }).subscribe({
        next: ({ drivers, passangers }) => {
          this.drivers = drivers.filter((driver: Driver) => driver.status === true);
          this.passangers = passangers;
        }
      })
    );
  }


  onSubmit() {
    this.loading = true
    this.trip = this.formTrip.value
    this.trip.startAddress = this.trip.startAddress.description
    this.trip.endAddress = this.trip.endAddress.description

    if (this.formTrip.valid) {
      this.subscription.add(this.tripService.postTrip(this.trip).subscribe({
        next: () => {
          this.formTrip.reset();
          this.loading = false;
          this.visible = false
          this.kmValue = ""
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Corrida adicionada com sucesso!' });
          this.attTable.emit()
        },
        error: () => {
          this.loading = false
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao adicionar corrida!' });
        }
      }));

    }
  }

  getAddress(event: any, type: string) {
    this.subscription.add(this.addressService.getAddresses(event.query).subscribe((res) => {
      type == "start" ? this.filteredStartAddresses = res.predictions : this.filteredEndAddresses = res.predictions
    }));
  }

  getDistance() {
    if (this.formTrip.get('startAddress')?.valid && this.formTrip.get('endAddress')?.valid) {
      this.subscription.add(
        this.addressService.getDistanceBetweenAddresses(this.formTrip.get('startAddress')?.value.description, this.formTrip.get('endAddress')?.value.description).subscribe((res) => {
          this.distance = res.rows[0].elements[0]
        }));
    }
  }

  calculateTripValue() {
    if (this.distance.distance.value && this.kmValue != "") {
      const meterValue = Number(this.kmValue) / 1000
      this.formTrip.patchValue({ tripValue: (meterValue * this.distance.distance.value).toFixed(2) });
    }
  }

}

