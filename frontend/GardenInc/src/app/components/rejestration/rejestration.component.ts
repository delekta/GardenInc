import { Component, OnInit } from '@angular/core';
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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveCustomer(): void {
    const data = {
      name: this.customer.name,
      email: this.customer.email,
      password: this.customer.password,
    };

  //   this.itemService.create(data)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.submitted = true;
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  }
}
