import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() specificItem : any;
  amountProduct =1;

  constructor(private itemService: ItemService, private customerService : CustomerService) { }

  ngOnInit(): void {
  }

  add_to_cart(): void  {
    console.log(this.specificItem)

    const data = {
      customer_id : this.customerService.currID,
      items : [{item_id : this.specificItem._id, amount : this.amountProduct}],
      add : true
    };

    console.log(data);
    this.customerService.add_to_cart(data)
      .subscribe(
        response => {
          console.log("Succesfully aded to the cart");
        },
        error => {
          console.log("Error while adding to the cart");
        });

  }

  addAmount()
  {
    this.amountProduct+=1;
  }

  decreaseAmount()
  {
    this.amountProduct-=1;
  }


}
