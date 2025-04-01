import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { PassangerService } from '../../services/passanger.service';
import { DriverService } from '../../services/driver.service';
import { DatePipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-trip-modal',
  templateUrl: './create-trip-modal.component.html',
  providers: [MessageService, provideNgxMask(), DatePipe],
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule, CommonModule, ToastModule, NgxMaskDirective],
  styleUrls: ['./create-trip-modal.component.scss']
})
export class CreateTripModalComponent implements OnInit, OnDestroy {
  @Output() attTable: EventEmitter<any> = new EventEmitter();
  loading: boolean = false
  subscription: Subscription = new Subscription()

  drivers: Driver[] = []
  passangers: Passanger[] = []
  trip: Trip = { tripValue: -1, idDriver: -1, idPassanger: -1 }
  visible: boolean = false;
  formTrip!: FormGroup;

  constructor(private formBuilder: FormBuilder, private tripService: TripService, private passangerService: PassangerService, private driverService: DriverService, private messageService: MessageService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.getDrivers()
    this.getPassangers()

    this.formTrip = this.formBuilder.group({
      idDriver: ['', Validators.required],
      idPassanger: ['', Validators.required],
      tripValue: ['', Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  getDrivers() {
    this.subscription.add(this.driverService.getDrivers().subscribe({
      next: (res) => {
        this.drivers = res.filter((driver: Driver) => driver.status === true);
      },
      error: (err) => {
        console.error('Erro ao buscar motoristas', err);
      }
    }));
  }

  getPassangers() {
    this.subscription.add(this.passangerService.getPassangers().subscribe({
      next: (res) => {
        this.passangers = res
      },
      error: (err) => {
        console.error('Erro ao buscar passageiros', err);
      }
    }));
  }

  onSubmit() {
    this.loading = true
    this.trip = this.formTrip.value

    if (this.formTrip.valid) {
      this.subscription.add(this.tripService.postTrip(this.trip).subscribe({
        next: () => {
          this.formTrip.reset();
          this.loading = false;
          this.visible = false
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Corrida adicionada com sucesso!' });
          this.attTable.emit()
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar motorista!' });
        }
      }));

    }

  }
}