import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  currentItem = null;
  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.paramMap.get('id'));
  }

  getItem(id): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.currentItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(categories): void {
    const data = {
      name: this.currentItem.name,
      price: this.currentItem.price,
      categoties: categories
    };

    // to id trzeba bedzie zmienic
    this.itemService.update(this.currentItem.id, data)
      .subscribe(
        response => {
          this.currentItem.categories = categories;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {
    this.itemService.update(this.currentItem.id, this.currentItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The item was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteItem(): void {
    this.itemService.delete(this.currentItem.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/items']);
        },
        error => {
          console.log(error);
        });
  }
}