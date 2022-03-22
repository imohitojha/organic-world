import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // To get all products
  // Should have RouteGuard
  {
    path: 'products/all',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  // To get products of particular category
  // Should have RouteGuard
  {
    path: 'products/:category',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  // // To get products being searched
  // // Should have RouteGuard
  {
    path: 'products/search/:name',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent },
  // // To get user account details
  // // Should have RouteGuard
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
