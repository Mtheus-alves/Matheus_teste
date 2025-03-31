import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule],
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent implements OnInit {
  @Input() desc: string = ""
  @Input() header: string = ""
  @Input() link: string = ""

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changePage() {
    this.router.navigate([`/${this.link}`]);
  }

}
