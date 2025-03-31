import { Component, OnInit } from '@angular/core';
import { CreateDriverModalComponent } from './create-driver-modal/create-driver-modal.component';
import { GenericTableComponent } from '../shared/generic-table/generic-table.component';
import { DriverService } from '../services/driver.service';
import { Driver } from './driver';
import { GenericTableCols } from '../shared/generic-table-cols';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  imports: [CreateDriverModalComponent, GenericTableComponent],
  providers: [DatePipe, MessageService],
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  drivers: Driver[] = []
  loading: boolean = false

  tableCols: GenericTableCols[] = [
    { field: 'nmDriver', header: 'Nome completo' },
    { field: 'dtBirth', header: 'Data de nascimento' },
    { field: 'cpf', header: 'CPF' },
    { field: 'modelCar', header: 'Modelo do carro' },
    { field: 'gender', header: 'Gênero' },
    { field: 'status', header: 'status' },
  ]

  constructor(private driverService: DriverService, private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit() {
    this.getDrivers()
  }

  getDrivers() {
    this.loading = true;
    this.driverService.getDrivers().subscribe({
      next: (res) => {
        this.drivers = res.map((driver: Driver) => ({
          ...driver,
          dtBirth: this.formatDate(driver.dtBirth),
          cpf: driver.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
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

  deleteDriver(driver: Driver) {
    this.driverService.deleteDriver(driver.idDriver!).subscribe({
      next: () => {
        this.getDrivers()
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro ao apagar motorista!', detail: 'É necessário apagar as corridas associadas a este motorista.' });
        this.loading = false;
      }
    })
  }

  changeStatusDriver(event: { status: boolean, idDriver: number }) {
    this.driverService.putStatusDriver(event.idDriver, event.status).subscribe({
      next: () => {
        this.getDrivers()
      },
      error: (err) => {
        console.error('Erro ao atualizar status do motorista', err);
        this.loading = false;
      }
    })
  }

}
