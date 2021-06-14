import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { LoginComponent } from './components/login/login.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { RejestrationComponent } from './components/rejestration/rejestration.component';

const routes: Routes = [
  {path: '', redirectTo:'main', pathMatch: 'full'},
  {path: 'items-list', component: ContainerListComponent},
  {path: 'add-item', component:AddItemComponent},
  {path: 'employees-list', component: EmployeesListComponent},
  {path: 'main', component: MainSiteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'rejestration', component: RejestrationComponent},
  {path: 'delivery-list', component: DeliveryListComponent},
  {path: 'cart-list', component: CartListComponent},
  {path: 'add-supplier', component: AddSupplierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
