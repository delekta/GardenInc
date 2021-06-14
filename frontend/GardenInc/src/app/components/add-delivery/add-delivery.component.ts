import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  delivery = {
    name: '',
    supplier_id: '',
    products: [Object]
  };

  data : any;

  submitted = false;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  saveItem(): void {

    this.deliveryService.getAll()
    .subscribe(
      data => {
        console.log(data);

      }
    )

    this.deliveryService.create(this.data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  addItem(e: any)
  {
    var obj = {item_id : '90', amount: 4};
    //this.delivery.products.push(obj);

  }

    

}
