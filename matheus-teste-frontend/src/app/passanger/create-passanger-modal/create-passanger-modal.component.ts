import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Passanger } from '../Passanger';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PassangerService } from '../../services/passanger.service';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-passanger-modal',
  templateUrl: './create-passanger-modal.component.html',
  providers: [MessageService, provideNgxMask(), DatePipe],
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, ReactiveFormsModule, CommonModule, ToastModule, NgxMaskDirective],
  styleUrls: ['./create-passanger-modal.component.scss']
})
export class CreatePassangerModalComponent implements OnInit {
  @Output() attTable: EventEmitter<any> = new EventEmitter();

  loading: boolean = false
  passanger: Passanger = { cpf: "", dtBirth: "", gender: "", nmPassanger: "" }
  formPassanger!: FormGroup;
  visible: boolean = false;

  constructor(private formBuilder: FormBuilder, private passangerService: PassangerService, private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.formPassanger = this.formBuilder.group({
      nmPassanger: ['', Validators.required],
      dtBirth: ['', Validators.required],
      cpf: ['', Validators.required],
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
      this.passanger.dtBirth = this.datePipe.transform(new Date(this.passanger.dtBirth = `${this.passanger.dtBirth.substring(4, 8)}-${this.passanger.dtBirth.substring(2, 4)}-${this.passanger.dtBirth.substring(0, 2)}`), 'yyyy-MM-dd') || '';
      this.passangerService.postPassanger(this.passanger).subscribe({
        next: () => {
          this.formPassanger.reset();
          this.loading = false;
          this.visible = false
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Motorista criado com sucesso!' });
          this.attTable.emit()
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar motorista!' });
        }
      });

    }

  }

}
