import { Component } from '@angular/core';
import { ApiCategoryService } from '../api-category.service';
import { Category } from '../category';
import { CommonModule, NgFor } from '@angular/common';
import Swiper from 'swiper';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-category',
    imports: [CommonModule, RouterLink],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent {
    data : Category[] = [];
    constructor(private _api: ApiCategoryService, private _router: Router) { }
    ngOnInit(){
        this._api.getAllCategory().subscribe((ans: any) => {
            // console.log("getAll:",ans);
            
            this.data = ans;
            // console.log("DATA:",this.data);
            // setTimeout(() => this.initSwiper(), 500);

        })
    }

  getProductByCat(id:any){
    this._router.navigate(['category',id])
  }

    // ngAfterViewInit() {
    //     setTimeout(() => this.initSwiper(), 500);
    // }

    // initSwiper() {
    //     new Swiper('.category-carousel', {
    //         slidesPerView: 8,
    //         spaceBetween: 20,
    //         loop: true,
    //         navigation: {
    //             nextEl: '.category-carousel-next',
    //             prevEl: '.category-carousel-prev'
    //         }
    //     });
    // }
}
