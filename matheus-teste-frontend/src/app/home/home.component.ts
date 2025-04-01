import { Component, OnInit } from '@angular/core';
import { CardHomeComponent } from './card-home/card-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CardHomeComponent],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardInfos: any[] = [
    { title: "Motoristas", desc:"Aqui você pode adicionar novos motoristas e consultar os motoristas já cadastrados."},
    { title: "Passageiros", desc:"Aqui você pode adicionar novos passageiros e consultar os passageiros já cadastrados."},
    { title: "Corridas", desc:"Aqui você pode criar novas corridas e consultar as viagens já cadastradas."},
  ]

  constructor() { }

  ngOnInit() {
  }

}
