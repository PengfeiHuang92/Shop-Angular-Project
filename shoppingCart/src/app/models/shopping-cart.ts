import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items : ShoppingCartItem[] = [];
    constructor(public itemMap:{[productId: string]:ShoppingCartItem}) {
        this.itemMap = itemMap || {};
        for(let productId in itemMap){
            let item = itemMap[productId];
            let x =new ShoppingCartItem(item.title,item.price,item.imgUrl,item.category,item.quantity);
            x.key = productId;
            this.items.push(x);
        }
     }
    
    get productId(){
        return Object.keys(this.items);
    }
    
    get totalItemQuantity() {
        let totalQuantity = 0;
        if(this.items){
            for (let productId in this.items) {
                totalQuantity += this.items[productId].quantity;
            }
        }
        return totalQuantity;
    }
}