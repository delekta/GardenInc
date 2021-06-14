import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  access ={
    login : ' ',
    password : ' '
  }

  submitted = false;

  constructor(private employeeService: EmployeeService, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  submit(): void {
    const data = {
      email: this.access.login,
      password: this.access.password
    };
    this.authentication(data);
  }

  authentication(data : any): void {
    console.log(data.email, data.password);
    this.customerService.auth(data)
      .subscribe(
        response => {
          console.log(response.auth);
          if(response.auth)
          {
             console.log(response.customer_id)
             this.customerService.currID = response.customer_id;
             console.log(this.customerService.currID);
             this.customerService.logged =true;
          }
         
        },
        error => {
          console.log("Error while auth");
        });
  }
}
