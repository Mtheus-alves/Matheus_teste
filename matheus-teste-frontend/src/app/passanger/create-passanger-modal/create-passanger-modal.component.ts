import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Passanger } from '../Passanger';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PassangerService } from '../../services/passanger.service';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-passanger-modal',
  templateUrl: './create-passanger-modal.component.html',
  providers: [MessageService, provideNgxMask(), DatePipe],
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule, CommonModule, ToastModule, NgxMaskDirective],
  styleUrls: ['./create-passanger-modal.component.scss']
})
export class CreatePassangerModalComponent implements OnInit, OnDestroy {
  @Output() attTable: EventEmitter<any> = new EventEmitter();
  subscription: Subscription = new Subscription()

  loading: boolean = false
  passanger: Passanger = { cpf: "", dtBirth: "", gender: "", nmPassanger: "" }
  formPassanger!: FormGroup;
  visible: boolean = false;

  gender: any[] = [
    { value: "Masculino" },
    { value: "Feminino" },
    { value: "Não informado" },
  ];

  constructor(private formBuilder: FormBuilder, private passangerService: PassangerService, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.formPassanger = this.formBuilder.group({
      nmPassanger: ['', Validators.required],
      dtBirth: ['', [Validators.required, this.validateDate]],
      cpf: ['', [Validators.required, this.validateCpf]],
      gender: ['', Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    this.loading = true
    this.passanger = this.formPassanger.value

    if (this.formPassanger.valid) {
      this.passanger.dtBirth = this.datePipe.transform(new Date(`${this.passanger.dtBirth.substring(4, 8)}-${this.passanger.dtBirth.substring(2, 4)}-${this.passanger.dtBirth.substring(0, 2)}T00:00:00`), 'yyyy-MM-dd') || '';
      this.subscription.add(this.passangerService.postPassanger(this.passanger).subscribe({
        next: () => {
          this.formPassanger.reset();
          this.loading = false;
          this.visible = false
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Passageiro criado com sucesso!' });
          this.attTable.emit()
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar passageiro!' });
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

    const isValidDate = birthDate.getDate() === day && birthDate.getMonth() === month - 1 && birthDate.getFullYear() === year && birthDate <= today;

    if (!isValidDate) {
      return { invalidDate: true };
    }

    return null;
  }
}
