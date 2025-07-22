import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ProductdetailedComponent } from './productdetailed/productdetailed.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderComponent } from './order/order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    {path:'', component:HomeLayoutComponent, canActivate:[authGuard]},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'products', component:ViewAllProductsComponent, canActivate:[authGuard]},
    {path:'category/:id', component:ViewAllProductsComponent, canActivate:[authGuard]},
    { path: 'product/:id', component:ProductdetailedComponent, canActivate:[authGuard]}, 
    {path:'cart', component:CartComponent, canActivate:[authGuard]},
    {path:'wishlist', component:WishlistComponent, canActivate:[authGuard]},
    {path:'checkout', component:OrderComponent, canActivate:[authGuard]},
    {path:'myorders', component:ViewOrdersComponent, canActivate:[authGuard]},
    {path:'userProfile', component:UserProfileComponent, canActivate:[authGuard]},
    { path: 'order-details/:orderID', component: OrderDetailsComponent, canActivate:[authGuard] },
];
