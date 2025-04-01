import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../driver';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-driver-modal',
  templateUrl: './create-driver-modal.component.html',
  standalone: true,
  providers: [MessageService, provideNgxMask(), DatePipe],
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule, CommonModule, ToastModule, NgxMaskDirective],
  styleUrls: ['./create-driver-modal.component.scss']
})
export class CreateDriverModalComponent implements OnInit, OnDestroy {
  @Output() attTable: EventEmitter<any> = new EventEmitter();
  subscription: Subscription = new Subscription()

  loading: boolean = false
  driver: Driver = { cpf: "", dtBirth: "", gender: "", modelCar: "", nmDriver: "", status: false }
  visible: boolean = false;
  formDriver!: FormGroup;
  selectedStatus: boolean = true;


  status: any[] = [
    { name: "Ativo", value: true },
    { name: "Inativo", value: false }
  ];


  constructor(private formBuilder: FormBuilder, private driverService: DriverService, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.formDriver = this.formBuilder.group({
      nmDriver: ['', Validators.required],
      dtBirth: ['', Validators.required],
      cpf: ['', Validators.required],
      modelCar: ['', Validators.required],
      gender: ['', Validators.required],
      status: [this.selectedStatus, Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    this.loading = true
    this.driver = this.formDriver.value

    if (this.formDriver.valid) {
      this.driver.dtBirth = this.datePipe.transform(new Date(this.driver.dtBirth = `${this.driver.dtBirth.substring(4, 8)}-${this.driver.dtBirth.substring(2, 4)}-${this.driver.dtBirth.substring(0, 2)}`), 'yyyy-MM-dd') || '';
      this.subscription.add(this.driverService.postDriver(this.driver).subscribe({
        next: () => {
          this.formDriver.reset();
          this.loading = false;
          this.visible = false
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Motorista criado com sucesso!' });
          this.attTable.emit()
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar motorista!' });
        }
      }));

    }

  }
}