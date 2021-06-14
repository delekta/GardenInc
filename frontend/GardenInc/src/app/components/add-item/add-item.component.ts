import { Component, OnInit, Output, EventEmitter} from '@angular/core';
// import * as EventEmitter from 'events';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item = {
    name: '',
    price: 0,
    categories: Array(),
    on_stock : 0,
    photo : ''
  };

  data : any;
  submitted = false;
  @Output() newItemEvent = new EventEmitter<Object>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  saveItem(): void {

    this.data = {
      name: this.item.name,
      price: this.item.price,
      categories: this.item.categories,
      on_stock : this.item.on_stock,
      photo : this.item.photo
    };

    if(this.item.name)
    {
      this.itemService.findByName(this.item.name)
      .subscribe(
        response => {
          console.log(response);
          if(response.length == 0 && this.item.photo && this.item.on_stock>0)
          {
          
              this.itemService.create(this.data)
                .subscribe(
                  resp => {
                    console.log(resp);
                    this.submitted = true;
                  },
                  error => {
                    console.log(error);
                  });

              this.newItemEvent.emit({item_id : response.id, amout : this.data.on_stock});
          }
          else
          {
            if(this.data.on_stock>0)
              this.newItemEvent.emit({item_id : response.id, amout : this.data.on_stock})
          }
        },
        error => {
          console.log("Error while getting data by name");
        })
    }
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      name: '',
      price: 0,
      categories: [],
      on_stock : 0,
      photo : ''
    };
  }

}
