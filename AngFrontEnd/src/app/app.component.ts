import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { PosterComponent } from "./poster/poster.component";
import { CategoryComponent } from "./category/category.component";
import { BestSellingComponent } from "./best-selling/best-selling.component";
import { DiscountCouponsComponent } from "./discount-coupons/discount-coupons.component";
import { FeaturedProductComponent } from "./featured-product/featured-product.component";
import { DiscountPurchaseComponent } from "./discount-purchase/discount-purchase.component";
import { MostPopularComponent } from "./most-popular/most-popular.component";
import { JustArrivedComponent } from "./just-arrived/just-arrived.component";
import { AppDownloadComponent } from "./app-download/app-download.component";
import { LookingForComponent } from "./looking-for/looking-for.component";
import { ServicesComponent } from "./services/services.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PosterComponent, CategoryComponent, BestSellingComponent, DiscountCouponsComponent, FeaturedProductComponent, DiscountPurchaseComponent, MostPopularComponent, JustArrivedComponent, AppDownloadComponent, LookingForComponent, ServicesComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngProject';
}
