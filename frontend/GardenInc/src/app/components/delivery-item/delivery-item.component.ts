import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent implements OnInit {

  @Input() specificDelivery : any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
