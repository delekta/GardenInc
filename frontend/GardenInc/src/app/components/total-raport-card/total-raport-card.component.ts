import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-raport-card',
  templateUrl: './total-raport-card.component.html',
  styleUrls: ['./total-raport-card.component.css']
})
export class TotalRaportCardComponent implements OnInit {

  @Input() specificItem : any;
  constructor() { }

  ngOnInit(): void {
  }

}
