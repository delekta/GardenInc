import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: any;
  currentItem = null;
  currentIndex = -1;
  name = '';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveItems();
    this.currentItem = null;
    this.currentIndex = -1;
  }

  setActiveItem(item: any, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAllItems(): void {
    this.itemService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveItems();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.itemService.findByName(this.name)
      .subscribe(
        data => {
          this.items = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

