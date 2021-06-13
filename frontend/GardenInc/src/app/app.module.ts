import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RejestrationComponent } from './components/rejestration/rejestration.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ContainerListComponent,
    ItemCardComponent,
    NavComponent,
    LoginComponent,
    RejestrationComponent,
    AddItemComponent,
    EmployeesListComponent,
    EmployeeCardComponent,
    MainSiteComponent,
    FooterComponent,
    AddEmployeeComponent,
    AddDeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
