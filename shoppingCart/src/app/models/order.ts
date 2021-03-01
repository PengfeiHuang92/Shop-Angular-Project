import { ShoppingCart } from './shopping-cart';

export class Order{

    datePlaced: number;
    constructor(public userId: string, public shpping:any, public shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();
    }
}