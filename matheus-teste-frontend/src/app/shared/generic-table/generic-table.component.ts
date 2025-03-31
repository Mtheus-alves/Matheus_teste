import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GenericTableCols } from '../generic-table-cols';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, ToggleSwitchModule, FormsModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() loading: boolean = false
  @Input() cols: GenericTableCols[] = [];
  @Output() deleteCol: EventEmitter<any> = new EventEmitter();
  @Output() changeStatus: EventEmitter<{ status: boolean, idDriver: number }> = new EventEmitter();
  teste:boolean = true
  rowStatus = {
    'Ativo': true,
    'Inativo': false
  };

  constructor() { }

  ngOnInit() {
  }

  delete(value: any) {
    this.deleteCol.emit(value);
  }

  onStatusChange(event: any, idDriver: number) {
    this.changeStatus.emit({ status: event.checked, idDriver });
  }

}
