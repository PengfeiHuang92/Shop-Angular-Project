import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    constructor(public items: ShoppingCartItem[]) { }

    get productId(){
        return Object.keys(this.items);
    }
    get totalItemQuantity() {
        let totalQuantity = 0;
        for (let productId in this.items) {
            totalQuantity += this.items[productId].quantity;
        }
        return totalQuantity;
    }
}