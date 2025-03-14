import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GetAllCategory from "./Components/GetAllCategory";
import BestSellingProducts from "./Components/BestSellingProducts";
import FeaturedProducts from "./Components/FeaturedProducts";
import PopularProducts from "./Components/PopularProducts";
import NewArrivals from "./Components/JustArrivedProducts";

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    useEffect(() => {
        // console.log(token);
        
        if (!token || token === 'undefined') {
            navigate('/login')
        }
        var initPreloader = function () {
            $(document).ready(function ($) {
                var Body = $('body');
                Body.addClass('preloader-site');
            });
            $(window).load(function () {
                $('.preloader-wrapper').fadeOut();
                $('body').removeClass('preloader-site');
            });
        }

        // init Chocolat light box
        var initChocolat = function () {
            Chocolat(document.querySelectorAll('.image-link'), {
                imageSize: 'contain',
                loop: true,
            })
        }

        var initSwiper = function () {

            var swiper = new Swiper(".main-swiper", {
                speed: 500,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });

            var category_swiper = new Swiper(".category-carousel", {
                slidesPerView: 8,
                spaceBetween: 30,
                speed: 500,
                navigation: {
                    nextEl: ".category-carousel-next",
                    prevEl: ".category-carousel-prev",
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 5,
                    },
                    1500: {
                        slidesPerView: 8,
                    },
                }
            });

            $(".products-carousel").each(function () {
                var $el_id = $(this).attr('id');

                var products_swiper = new Swiper("#" + $el_id + " .swiper", {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    speed: 500,
                    navigation: {
                        nextEl: "#" + $el_id + " .products-carousel-next",
                        prevEl: "#" + $el_id + " .products-carousel-prev",
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        991: {
                            slidesPerView: 4,
                        },
                        1500: {
                            slidesPerView: 5,
                        },
                    }
                });

            });


            // product single page
            var thumb_slider = new Swiper(".product-thumbnail-slider", {
                slidesPerView: 5,
                spaceBetween: 20,
                // autoplay: true,
                direction: "vertical",
                breakpoints: {
                    0: {
                        direction: "horizontal"
                    },
                    992: {
                        direction: "vertical"
                    },
                },
            });

            var large_slider = new Swiper(".product-large-slider", {
                slidesPerView: 1,
                // autoplay: true,
                spaceBetween: 0,
                effect: 'fade',
                thumbs: {
                    swiper: thumb_slider,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }

        // input spinner
        var initProductQty = function () {

            $('.product-qty').each(function () {

                var $el_product = $(this);
                var quantity = 0;

                $el_product.find('.quantity-right-plus').click(function (e) {
                    e.preventDefault();
                    quantity = parseInt($el_product.find('#quantity').val());
                    $el_product.find('#quantity').val(quantity + 1);
                });

                $el_product.find('.quantity-left-minus').click(function (e) {
                    e.preventDefault();
                    quantity = parseInt($el_product.find('#quantity').val());
                    if (quantity > 0) {
                        $el_product.find('#quantity').val(quantity - 1);
                    }
                });

            });

        }

        // init jarallax parallax
        var initJarallax = function () {
            jarallax(document.querySelectorAll(".jarallax"));

            jarallax(document.querySelectorAll(".jarallax-keep-img"), {
                keepImg: true,
            });
        }

        initPreloader();
        initSwiper();
        initProductQty();
        initJarallax();
        initChocolat();

    }, [])
    return (
        <StyledWrapper>
            <section className="cls1">
                <div className="container-lg text-center">
                    {/* <div className="row"> */}
                    {/* <div className="col-lg-6 pt-5 mt-5"> */}
                    {/* <h2 className="display-2"><span className="fw-semibold text-center text-light">Discover Your Beauty</span></h2>
            <p className="fs-4 text-light">Dignissim massa diam elementum.</p>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-primary text-uppercase fs-6 text-center rounded-pill px-4 py-3 mt-3">Start Shopping</a>
              <a href="#" className="btn btn-dark text-uppercase fs-6 text-center rounded-pill px-4 py-3 mt-3">Join Now</a>
            </div> */}
                    {/* <div className="row my-5">
              <div className="col">
                <div className="row text-dark">
                  <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">14k+</p></div>
                  <div className="col"><p className="text-uppercase lh-sm mb-0">Product Varieties</p></div>
                </div>
              </div>
              <div className="col">
                <div className="row text-dark">
                  <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">50k+</p></div>
                  <div className="col"><p className="text-uppercase lh-sm mb-0">Happy Customers</p></div>
                </div>
              </div> */}
                    {/* <div className="col">
                <div className="row text-dark">
                  <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">10+</p></div>
                  <div className="col"><p className="text-uppercase lh-sm mb-0">Store Locations</p></div>
                </div>
              </div> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}

                    {/* <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3 g-0 justify-content-center">
          <div className="col">
            <div className="card border-0 bg-primary rounded-0 p-4 text-light">
              <div className="row">
                <div className="col-md-3 text-center">
                  <svg width="60" height="60"><use xlinkHref="#fresh"></use></svg>
                </div>
                <div className="col-md-9">
                  <div className="card-body p-0">
                    <h5 className="text-light">Fresh from farm</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0 bg-secondary rounded-0 p-4 text-light">
              <div className="row">
                <div className="col-md-3 text-center">
                  <svg width="60" height="60"><use xlinkHref="#organic"></use></svg>
                </div>
                <div className="col-md-9">
                  <div className="card-body p-0">
                    <h5 className="text-light">100% Organic</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0 bg-danger rounded-0 p-4 text-light">
              <div className="row">
                <div className="col-md-3 text-center">
                  <svg width="60" height="60"><use xlinkHref="#delivery"></use></svg>
                </div>
                <div className="col-md-9">
                  <div className="card-body p-0">
                    <h5 className="text-light">Free delivery</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

                </div>
            </section>

            <section className="py-5 overflow-hidden">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex flex-wrap justify-content-between">
                                <h2 className="section-title">Category</h2>

                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar">View All</button>
                                    <div className="swiper-buttons">
                                        <button className="swiper-prev category-carousel-prev btn btn-yellow">❮</button>
                                        <button className="swiper-next category-carousel-next btn btn-yellow">❯</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            <div className="category-carousel swiper">
                                <div className="swiper-wrapper">
                                    <GetAllCategory />
                                    {/* <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-1.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Fruits & Veges</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-2.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Breads & Sweets</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-3.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Fruits & Veges</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-4.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Beverages</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-5.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Meat Products</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-6.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Breads</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-7.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Fruits & Veges</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-8.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Breads & Sweets</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-1.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Fruits & Veges</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-1.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Beverages</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-1.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Meat Products</h4>
                </a>
                <a href="category.html" className="nav-link swiper-slide text-center">
                  <img src="images/category-thumb-1.jpg" className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">Breads</h4>
                </a> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-5">
                <div className="container-lg">

                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex flex-wrap justify-content-between my-4">

                                <h2 className="section-title">Best selling products</h2>

                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary rounded-1">View All</a>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div className="row">
                        {/* <div className="col-md-12">

                            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-1.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Wheat Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-2.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Grain Oatmeal</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(41)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$54.00</del>
                                                <span className="text-dark fw-semibold">$50.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-3.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sharp Cheddar Cheese Block</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(32)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$14.00</del>
                                                <span className="text-dark fw-semibold">$12.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-4.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic Baby Spinach</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-5.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic Spinach Leaves (Fresh Produce)</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-6.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Salmon</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-7.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Imported Italian Spaghetti Pasta</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-8.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Granny Smith Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-9.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic 2% Reduced Fat Milk </h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-10.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Greek Style Plain Yogurt</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <BestSellingProducts />
                    </div>
                </div>
            </section>

            <section className="py-3">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="banner-blocks">

                                <div className="banner-ad d-flex align-items-center large bg-info block-1 cls2">
                                    <div className="banner-content p-5">
                                        <div className="content-wrapper text-light">
                                            <h3 className="banner-title text-light">Items on SALE</h3>
                                            <p>Discounts up to 30%</p>
                                            <a href="#" className="btn-link text-white">Shop Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner-ad bg-success-subtle block-2 cls3">
                                    <div className="banner-content align-items-center p-5">
                                        <div className="content-wrapper text-light">
                                            <h3 className="banner-title text-light">Combo offers</h3>
                                            <p>Discounts up to 50%</p>
                                            <a href="#" className="btn-link text-white">Shop Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner-ad bg-danger block-3 cls4">
                                    <div className="banner-content align-items-center p-5">
                                        <div className="content-wrapper text-light">
                                            <h3 className="banner-title text-light">Discount Coupons</h3>
                                            <p>Discounts up to 40%</p>
                                            <a href="#" className="btn-link text-white">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="featured-products" className="products-carousel">
                <div className="container-lg overflow-hidden py-5">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex flex-wrap justify-content-between my-4">

                                <h2 className="section-title">Featured products</h2>

                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary me-2">View All</a>
                                    <div className="swiper-buttons">
                                        <button className="swiper-prev products-carousel-prev btn btn-primary">❮</button>
                                        <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-md-12">

                            <div className="swiper">
                                <div className="swiper-wrapper">

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-10.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Greek Style Plain Yogurt</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-11.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Pure Squeezed No Pulp Orange Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-12.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Oranges</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-13.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Gourmet Dark Chocolate Bars</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-14.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Green Celery</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-15.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-16.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Honeycrisp Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-17.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Wheat Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-18.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Honeycrisp Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <FeaturedProducts />
                    </div>
                </div>
            </section>

            <section>
                <div className="container-lg">

                    <div className="bg-secondary text-light py-5 my-5 cls5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-5 p-3">
                                    <div className="section-header">
                                        <h2 className="section-title display-5 text-light">Get 25% Discount on your first purchase</h2>
                                    </div>
                                    <p>Just Sign Up & Register it now to become member.</p>
                                </div>
                                <div className="col-md-5 p-3">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label d-none">Name</label>
                                            <input type="text" className="form-control form-control-md rounded-0" name="name" id="name" placeholder="Name" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label d-none">Email</label>
                                            <input type="email" className="form-control form-control-md rounded-0" name="email" id="email" placeholder="Email Address" />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-dark btn-md rounded-0">Submit</button>
                                        </div>
                                    </form>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <section id="popular-products" className="products-carousel">
                <div className="container-lg overflow-hidden py-5">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex justify-content-between my-4">

                                <h2 className="section-title">Most popular products</h2>

                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary me-2">View All</a>
                                    <div className="swiper-buttons">
                                        <button className="swiper-prev products-carousel-prev btn btn-primary">❮</button>
                                        <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-md-12">

                            <div className="swiper">
                                <div className="swiper-wrapper">

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-15.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-16.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Honeycrisp Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-17.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Wheat Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-18.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Honeycrisp Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-19.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sunstar Fresh Melon Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-10.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Greek Style Plain Yogurt</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-11.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Pure Squeezed No Pulp Orange Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-12.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Oranges</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-13.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Gourmet Dark Chocolate Bars</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div> */}
                        <PopularProducts/>
                    </div>
                </div>
            </section>

            <section id="latest-products" className="products-carousel">
                <div className="container-lg overflow-hidden pb-5">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex justify-content-between my-4">

                                <h2 className="section-title">Just arrived</h2>

                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary me-2">View All</a>
                                    <div className="swiper-buttons">
                                        <button className="swiper-prev products-carousel-prev btn btn-primary">❮</button>
                                        <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <NewArrivals/>

                                    {/* <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-20.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sunstar Fresh Melon Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-1.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Wheat Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-21.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sunstar Fresh Melon Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-22.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Gourmet Dark Chocolate</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-23.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sunstar Fresh Melon Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-10.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Greek Style Plain Yogurt</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-11.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Pure Squeezed No Pulp Orange Juice</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-12.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Oranges</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item swiper-slide">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-13.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Gourmet Dark Chocolate Bars</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-4 my-4">
                <div className="container-lg">

                    <div className="bg-warning pt-5 rounded-5">
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-4">
                                    <h2 className="mt-5">Download Organic App</h2>
                                    <p>Online Orders made easy, fast and reliable</p>
                                    <div className="d-flex gap-2 flex-wrap mb-5">
                                        <a href="#" title="App store"><img src="images/img-app-store.png" alt="app-store" /></a>
                                        <a href="#" title="Google Play"><img src="images/img-google-play.png" alt="google-play" /></a>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <img src="images/banner-onlineapp.png" alt="phone" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-4">
                <div className="container-lg">
                    <h2 className="my-4">People are also looking for</h2>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Blue diamon almonds</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Angie’s Boomchickapop Corn</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Salty kettle Corn</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chobani Greek Yogurt</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Sweet Vanilla Yogurt</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Foster Farms Takeout Crispy wings</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Warrior Blend Organic</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chao Cheese Creamy</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chicken meatballs</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Blue diamon almonds</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Angie’s Boomchickapop Corn</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Salty kettle Corn</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chobani Greek Yogurt</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Sweet Vanilla Yogurt</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Foster Farms Takeout Crispy wings</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Warrior Blend Organic</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chao Cheese Creamy</a>
                    <a href="#" className="btn me-2 mb-2" style={{background:"#CFB5D6", color:"#2c1a33"}}>Chicken meatballs</a>
                </div>
            </section>

            <section className="py-5">
                <div className="container-lg">
                    <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
                        <div className="col">
                            <div className="card mb-3 p-3" style={{ border: "1px solid #2c1a33" }}>
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32"><use xlinkHref="#package"></use></svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5 style={{ color: "#2c1a33"}}>Free delivery</h5>
                                    <p className="card-text" style={{ color: "#CFB5D6"}}>Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-3 p-3" style={{ border: "1px solid #2c1a33" }}>
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32"><use xlinkHref="#secure"></use></svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5 style={{ color: "#2c1a33"}}>100% secure payment</h5>
                                    <p className="card-text" style={{ color: "#CFB5D6"}}>Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-3 p-3" style={{ border: "1px solid #2c1a33" }}>
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32"><use xlinkHref="#quality"></use></svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5 style={{ color: "#2c1a33"}}>Quality guarantee</h5>
                                    <p className="card-text" style={{ color: "#CFB5D6"}}>Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-3 p-3" style={{ border: "1px solid #2c1a33" }}>
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32"><use xlinkHref="#savings"></use></svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5 style={{ color: "#2c1a33"}}>guaranteed savings</h5>
                                    <p className="card-text" style={{ color: "#CFB5D6"}}>Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-3 p-3" style={{ border: "1px solid #2c1a33" }}>
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32"><use xlinkHref="#offers"></use></svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5 style={{ color: "#2c1a33"}}>Daily offers</h5>
                                    <p className="card-text" style={{ color: "#CFB5D6"}}>Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-5">
                <div className="container-lg">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer-menu">
                                <img src="images/glowvana-logo-purple.png" width="240" height="70" alt="logo" />
                                <div className="social-links mt-3">
                                    <ul className="d-flex list-unstyled gap-2">
                                        <li>
                                            <a href="#" className="btn btn-outline-light">
                                                <svg width="16" height="16"><use xlinkHref="#facebook"></use></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn btn-outline-light">
                                                <svg width="16" height="16"><use xlinkHref="#twitter"></use></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn btn-outline-light">
                                                <svg width="16" height="16"><use xlinkHref="#youtube"></use></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn btn-outline-light">
                                                <svg width="16" height="16"><use xlinkHref="#instagram"></use></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn btn-outline-light">
                                                <svg width="16" height="16"><use xlinkHref="#amazon"></use></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title" style={{ color: "#2c1a33"}}>Organic</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>About us</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Conditions </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Our Journals</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Careers</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Affiliate Programme</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Ultras Press</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title" style={{ color: "#2c1a33"}}>Quick Links</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Offers</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Discount Coupons</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Stores</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Track Order</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Shop</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Info</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title" style={{ color: "#2c1a33"}}>Customer Service</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>FAQ</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Contact</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Privacy Policy</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Returns & Refunds</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Cookie Guidelines</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#" className="nav-link" style={{ color: "#CFB5D6"}}>Delivery Information</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title"  style={{ color: "#2c1a33"}}>Subscribe Us</h5>
                                <p style={{ color: "#CFB5D6"}}>Subscribe to our newsletter to get updates about our grand offers.</p>
                                <form className="d-flex mt-3 gap-0" action="index.html">
                                    <input className="form-control rounded-start rounded-0" type="email" placeholder="Email Address" aria-label="Email Address" />
                                    <button className="btn rounded-end rounded-0" type="submit"  style={{ background: "#CFB5D6", color:"#2c1a33"}}>Subscribe</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
            <div id="footer-bottom">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-6 copyright">
                            <p>© 2024 GlowVana. All rights reserved.</p>
                        </div>
                        {/* <div className="col-md-6 credit-link text-start text-md-end">
                            <p>HTML Template by <a href="https://templatesjungle.com/">TemplatesJungle</a> Distributed By <a href="https://themewagon.com">ThemeWagon</a> </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    .border-outline{
        border-color: #CFB5D6;
    }
`;

export default Home;