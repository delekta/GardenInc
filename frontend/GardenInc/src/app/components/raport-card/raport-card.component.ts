import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-raport-card',
  templateUrl: './raport-card.component.html',
  styleUrls: ['./raport-card.component.css']
})
export class RaportCardComponent implements OnInit {

  @Input() specificItem : any;
  currProduct : any;
  constructor(private itemService : ItemService) { }

  ngOnInit(): void {
  }

  getProduct(item_id : any){
      this.itemService.get(item_id)
      .subscribe(
        data => {
          console.log(data.name);
          this.currProduct= data.name;
          return data.name;
          
        },
        error => {
          console.log("Error");
        }
      )
  }

}
