import { Component, OnInit } from '@angular/core';
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
    categories: []
  };
  submitted = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      price: this.item.price,
      categories: this.item.categories
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      name: '',
      price: 0,
      categories: []
    };
  }

}