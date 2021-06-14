import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() specificItem : any;
  itemObj : any;
  
  constructor(private itemService : ItemService) { }

  ngOnInit(): void {
    this.getName();
  }

  getName(){
    this.itemService.get(this.specificItem.item_id)
    .subscribe(
      data => {
        this.itemObj = data;
        console.log(this.itemObj);
      }

    )
  }

}
