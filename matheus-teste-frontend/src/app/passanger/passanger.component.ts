import { Component, OnInit } from '@angular/core';
import { CreatePassangerModalComponent } from './create-passanger-modal/create-passanger-modal.component';
import { GenericTableComponent } from '../shared/generic-table/generic-table.component';
import { Passanger } from './Passanger';
import { GenericTableCols } from '../shared/generic-table-cols';
import { PassangerService } from '../services/passanger.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-passanger',
  templateUrl: './passanger.component.html',
  imports: [CreatePassangerModalComponent, GenericTableComponent],
  providers: [DatePipe, MessageService],
  styleUrls: ['./passanger.component.scss']
})
export class PassangerComponent implements OnInit {
  passangers: Passanger[] = []
  loading: boolean = false

  tableCols: GenericTableCols[] = [
    { field: 'nmPassanger', header: 'Nome completo' },
    { field: 'dtBirth', header: 'Data de nascimento' },
    { field: 'cpf', header: 'CPF' },
    { field: 'gender', header: 'Gênero' },
  ]

  constructor(private passangerService: PassangerService, private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit() {
    this.getPassangers()
  }

  getPassangers() {
    this.loading = true;
    this.passangerService.getPassangers().subscribe({
      next: (res) => {
        this.passangers = res.map((passanger: Passanger) => ({
          ...passanger,
          dtBirth: this.formatDate(passanger.dtBirth),
          cpf: passanger.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar motoristas', err);
        this.loading = false;
      }
    });
  }

  private formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  deletePassanger(passanger: Passanger) {
    this.passangerService.deletePassanger(passanger.idPassanger!).subscribe({
      next: () => {
        this.getPassangers()
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro ao apagar passageiro!', detail: 'É necessário apagar as corridas associadas a este passageiro.' });
        this.loading = false;
      }
    })
  }

}
