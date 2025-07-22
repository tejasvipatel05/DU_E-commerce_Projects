export class Product {
    _id: number = -1;
    category_id: string = '';
    discount_id: string = '';
    seller_id: string = '';
    product_name: string = '';
    description?: string = '';
    price: number = 0;
    stock_quantity: number = 0;
    product_img: string[] = [];
    brand: string = '';
    ingredients: string = '';
    status: boolean = false;
    original_price: number = 0;
    final_price: number = 0;
    average_rating: number = 0;
    total_ratings: number = 0;
    stars?: number[]; 
    product_created_at?: Date;
    product_updated_at?: Date;
}
