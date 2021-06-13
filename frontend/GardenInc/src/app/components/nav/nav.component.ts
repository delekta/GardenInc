import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
  }

  ifLogged() {
    return !this.customerService.logged;
  }

}
