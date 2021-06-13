import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveries : any;

  constructor(private deliveryService : DeliveryService) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.deliveryService.getAll()
      .subscribe(
        data => {
          if(data){
            this.deliveries = data;
            console.log(this.deliveries);
          }
        },
        error => {
          console.log(error);
        });
  }

}
