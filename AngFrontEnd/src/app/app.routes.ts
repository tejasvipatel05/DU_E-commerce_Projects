import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ProductdetailedComponent } from './productdetailed/productdetailed.component';

export const routes: Routes = [
    {path:'', component:HomeLayoutComponent, canActivate:[authGuard]},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'products', component:ViewAllProductsComponent},
    { path: 'product/:id', component:ProductdetailedComponent }, // Route for product details page
//     { path: '', redirectTo: '/view-all-products', pathMatch: 'full' }, // Redirect to view all products by default
//   { path: '**', redirectTo: '/view-all-products' }
];
