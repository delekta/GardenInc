import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: any;
  categories: any;
  currentItem = null;
  currentIndex = -1;
  selectedCategory=" ";
  printedCategory = "Wszystko"
  name = '';

  constructor(private itemService: ItemService, private categoryService : CategoriesService) { }

  ngOnInit(): void {
    this.retrieveItems();
    this.retrieveCategories();
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

retrieveCategories(): void {
  this.categoryService.getAll()
    .subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      error => {
        console.log(error);
      });
}

Filter()
{
  console.log(this.selectedCategory);
  const categ = {category : this.selectedCategory};
  console.log(categ);
  if(categ.category != 'Wszystko')
  {
     this.itemService.getByCategory(categ)
    .subscribe(
      data => {
        console.log(data);
        this.items = data;
        this.printedCategory = this.selectedCategory;
      },
      error => {
        console.log("Error");
      })
  }
  else
  {
    this.retrieveItems();
  }
 
}

}
