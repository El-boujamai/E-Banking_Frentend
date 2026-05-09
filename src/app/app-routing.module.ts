import { NgModule } from '@angular/core';
import { Login } from './login/login';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {AdminTemplate} from "./admin-template/admin-template";
import {AuthenticationGuard} from "./guards/authentication-guard";
import {AuthorizationGuard} from "./guards/authorization-guard";
import {NotAuthorized} from "./not-authorized/not-authorized";

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminTemplate,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'customers', component:CustomersComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'new-customer', component: NewCustomerComponent, canActivate: [AuthorizationGuard] , data : {role : "ADMIN"} },
      {path : 'notAuthorized' , component: NotAuthorized},
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
