import { Component, HostListener } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiCartService } from '../api-cart.service';
import { Product } from '../product';
import Swal from 'sweetalert2';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-view-all-products',
  imports: [CommonModule],
  templateUrl: './view-all-products.component.html',
  styleUrl: './view-all-products.component.css'
})
export class ViewAllProductsComponent {

  products: Product[] = [];
  wishlistProductIds:string[] = [];
  quantity: number = 1;
  cat_id:any;

  constructor(private productService: ApiProductService, private _router: Router, private cartService: ApiCartService, private _activatedRoute: ActivatedRoute, private wishlistService: WishlistService){ }

  ngOnInit() {
    this.cat_id = this._activatedRoute.snapshot.params['id'];
    this.loadWishlist()
    if(this.cat_id){
      this.getProductsByCategory(this.cat_id);
    } else{
      this.getAllProducts();
    }
  }

  loadWishlist(){
    this.wishlistService.getWishlist().subscribe((res:any)=>{
      if(res.products){
        this.wishlistProductIds = res.products.map((p:any)=> p.product_id?._id);
      }
    })
  }

  isInWishlist(id:any){
    return this.wishlistProductIds.includes(id);
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data: any) => {      
      this.products = data;
    }, (error) => {
      console.error('Error fetching products', error);
    });
  }

  getProductsByCategory(id:any){
    this.productService.getProductByCat(id).subscribe((res:any)=>{
      this.products = res;
      
    })
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

  addToWishlist(id: any) {    
    this.wishlistService.addtoWishlist(id).subscribe((res:any) => {
      Swal.fire({
        title: res.message,
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

  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe(
      (response: any) => {
        Swal.fire({
                title: 'Product Removed from Wishlist!',
                text: 'Your item has been removed successfully.',
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
              });  // Refresh the wishlist after removal
      }
    );
  }

  // removeFromWishlist(id: any) {    
  //   this.wishlistService.removeFromWishlist(id).subscribe(res => {
  //     Swal.fire({
  //       title: 'Product Removed from Wishlist!',
  //       text: 'Your item has been removed successfully.',
  //       icon: 'success',
  //       toast: true,  // Makes it a toast (non-blocking popup)
  //       position: 'top-end',  // Positions it in the top-right corner
  //       showConfirmButton: false,  // Hides the confirm button
  //       timer: 2000,  // Auto-closes after 2 seconds
  //       timerProgressBar: false,  // Shows a progress bar
  //       background: '#f9f9f9',  // Light background
  //       color: '#333',  // Text color
  //       iconColor: '#4CAF50',  // Green icon color
  //       showClass: {
  //         popup: 'animate__animated animate__fadeInRight'  // Animation for showing
  //       },
  //       hideClass: {
  //         popup: 'animate__animated animate__fadeOutRight'  // Animation for hiding
  //       }
  //     });
  //   })
  // }

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
