import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  supplier = {
    company_name: '',
    // price: 0,
    // categories: Array(),
    // on_stock : 0,
    // photo : ''
  };

  submitted = false;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
  }

  saveItem(): void {
    const data = {
      name: this.supplier.company_name,
      // price: this.item.price,
      // categories: this.item.categories,
      // on_stock : this.item.on_stock,
      // photo : this.item.photo
    };

    this.supplierService.create(data)
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
