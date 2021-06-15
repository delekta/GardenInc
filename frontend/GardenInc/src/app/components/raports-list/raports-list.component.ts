import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-raports-list',
  templateUrl: './raports-list.component.html',
  styleUrls: ['./raports-list.component.css']
})
export class RaportsListComponent implements OnInit {

  items: any;
  raports : any;

  period ={
    from : "January 1, 2021, 00:00:00",
    to :  "December 31, 2021, 23:59:59"
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.retrieveItems();
    this.Filter();
  }

  retrieveItems(): void {
    this.orderService.getAll()
      .subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        },
        error => {
          console.log(error);
        });
  }

  Filter()
  {
    console.log(this.period);

    if(this.period.from != " " || this.period.to != " ")
    {
      this.orderService.getReportDates(this.period)
      .subscribe(
        response => {
          console.log(response);
          this.raports = response;
        },
        error => {
          console.log("Error");
        }
      )
    }
    else{
      this.retrieveItems();
    }
  }


}
