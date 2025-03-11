import { Component, HostListener } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiCartService } from '../api-cart.service';
import { Product } from '../product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-products',
  imports: [CommonModule],
  templateUrl: './view-all-products.component.html',
  styleUrl: './view-all-products.component.css'
})
export class ViewAllProductsComponent {

  products: Product[] = [];
  quantity: number = 1;

  constructor(private productService: ApiProductService, private _router: Router, private cartService: ApiCartService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      
      this.products = data;
      console.log(this.products)
    }, (error) => {
      console.error('Error fetching products', error);
    });
  }

  addToCart(id: any, seller_id: any) {
    console.log(seller_id)
    this.cartService.addToCart(id, seller_id, this.quantity).subscribe(res => {
      Swal.fire({
        title: 'Product Added to Cart!',
        text: 'Your item has been added successfully.',
        icon: 'success',
        toast: true,  // Makes it a toast (non-blocking popup)
        position: 'top-end',  // Positions it in the top-right corner
        showConfirmButton: false,  // Hides the confirm button
        timer: 2000,  // Auto-closes after 2 seconds
        timerProgressBar: false,  // Shows a progress bar
        background: '#f9f9f9',  // Light background
        color: '#333',  // Text color
        iconColor: '#4CAF50',  // Green icon color
        showClass: {
          popup: 'animate__animated animate__fadeInRight'  // Animation for showing
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutRight'  // Animation for hiding
        }
      });
    })
  }

  goToProductDetails(productId: any) {
    this._router.navigate(['/product', productId]);
  }

  // products: any[] = [];
  // page: number = 1;
  // loading: boolean = false;
  // allLoaded: boolean = false;

  // constructor(private productService: ApiProductService) {}

  // ngOnInit(): void {
  //   this.fetchProducts();
  // }

  // fetchProducts(): void {
  //   if (this.allLoaded) return;
  //   this.loading = true;

  //   this.productService.getAllProducts().subscribe((data: any) => {
  //     if (data.length === 0) {
  //       this.allLoaded = true;
  //     } else {
  //       this.products = [...this.products, ...data];
  //     }
  //     this.loading = false;
  //   }, (error) => {
  //     console.error('Error fetching products', error);
  //     this.loading = false;
  //   });
  // }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
  //     this.page++;
  //     this.fetchProducts();
  //   }
  // }
}
