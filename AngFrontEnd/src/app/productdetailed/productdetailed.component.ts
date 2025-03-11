import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductService } from '../api-product.service';
import { CommonModule } from '@angular/common';
import { ApiCartService } from '../api-cart.service';

@Component({
  selector: 'app-productdetailed',
  imports: [CommonModule],
  templateUrl: './productdetailed.component.html',
  styleUrl: './productdetailed.component.css'
})
export class ProductdetailedComponent {
  product: any;

  constructor(private route: ActivatedRoute, private _api: ApiProductService, private _router: Router, private cartService: ApiCartService) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this._api.getProductById(productId).subscribe((data) => {
        this.product = data;
      }, (error) => {
        console.error('Error fetching product details', error);
      });
    }
  }

  addToCart(product: any) {
    // this.cartService.addToCart(product);
    alert(`${product.product_name} added to cart!`);
  }

  goBack() {
    this._router.navigate(['/products']);
  }
}
