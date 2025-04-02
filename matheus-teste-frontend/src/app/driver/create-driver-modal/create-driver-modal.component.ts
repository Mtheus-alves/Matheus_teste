import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  gender: any[] = [
    { value: "Masculino" },
    { value: "Feminino" },
    { value: "Não informado" },
  ];

  constructor(private formBuilder: FormBuilder, private driverService: DriverService, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.formDriver = this.formBuilder.group({
      nmDriver: ['', Validators.required],
      dtBirth: ['',[Validators.required, this.validateDate]],
      cpf: ['', [Validators.required, this.validateCpf]],
      modelCar: ['', Validators.required],
      gender: ['', Validators.required],
      status: [this.selectedStatus, Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    this.loading = true;
    this.driver = this.formDriver.value;

    if (this.formDriver.valid) {
      this.driver.dtBirth = this.datePipe.transform(new Date(`${this.driver.dtBirth.substring(4, 8)}-${this.driver.dtBirth.substring(2, 4)}-${this.driver.dtBirth.substring(0, 2)}T00:00:00`), 'yyyy-MM-dd') || '';
      this.subscription.add(this.driverService.postDriver(this.driver).subscribe({
        next: () => {
          this.formDriver.reset();
          this.loading = false;
          this.visible = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Motorista criado com sucesso!' });
          this.attTable.emit();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar motorista!' });
        }
      }));
    }
  }

  validateCpf(control: AbstractControl) {
    const cpf = control.value ? control.value.replace(/[^\d]+/g, '') : '';

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
      return { invalidCpf: true };

    const cpfArray = cpf.split('').map((el: string) => +el);

    const rest = (count: number) =>
      (cpfArray.slice(0, count - 12).reduce((soma: number, el: number, index: number) => soma + el * (count - index), 0) * 10) % 11 % 10;

    return rest(10) === cpfArray[9] && rest(11) === cpfArray[10] ? null : { invalidCpf: true };
  }

  validateDate(control: AbstractControl) {
    const day = parseInt(control.value?.substring(0, 2), 10);
    const month = parseInt(control.value?.substring(2, 4), 10);
    const year = parseInt(control.value?.substring(4, 8), 10);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (birthDate > today || birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
      return { invalidDate: true };
    }

    const isOver18 = today.getFullYear() - birthDate.getFullYear() > 18 ||
      (today.getFullYear() - birthDate.getFullYear() === 18 && today.getMonth() >= birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isOver18) {
      return { underage: true };
    }

    return null;
  }
}
