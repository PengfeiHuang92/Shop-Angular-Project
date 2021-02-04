
export class Product {
    title : String;
    price : string; 
    category : string;
    imgUrl : string;
    constructor(title: String, price: string, category: string, imgUrl: string,){
        this.title = title;
        this.price = price;
        this.category = category;
        this.imgUrl = imgUrl;
    }
}