import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-rejestration',
  templateUrl: './rejestration.component.html',
  styleUrls: ['./rejestration.component.css']
})
export class RejestrationComponent implements OnInit {

  customer = {
    name: '',
    email:'',
    password:''
  };

  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  saveCustomer(): void {
    const data = {
      name: this.customer.name,
      email: this.customer.email,
      password: this.customer.password,
    };

    this.customerService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}

