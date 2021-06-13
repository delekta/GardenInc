import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  clients_cart :any;

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.customerService.get(this.customerService.currID)
      .subscribe(
        data => {
          if(data){
            this.clients_cart = data.cart.items;
            console.log(this.clients_cart);
          }
        },
        error => {
          console.log(error);
        });
  }

  buy(): void {
    const person = {customer_id : this.customerService.currID};
    console.log(person);
    this.customerService.buy(person)
    .subscribe(
      response => {
        console.log("Succesfully bought");
      },
      error => {
        console.log("Error while buying");
      }
    )

  }

}
