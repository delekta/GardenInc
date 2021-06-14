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
          this.authentication(data);
        },
        error => {
          console.log(error);
        }); 
  }

  authentication(data : any): void {
    console.log(data.email, data.password);
    //const info = {"email" : data.email, "password" : data.password};
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

