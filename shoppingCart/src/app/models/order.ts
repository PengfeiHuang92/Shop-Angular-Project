import { Shipping } from './shipping';
import { PaymentInfo } from './paymentInfo';
import { ShoppingCart } from './shopping-cart';

export class Order {

    public datePlaced: number;
    public orderTotalPrice : number;

    constructor(public userId: string, public shipping: Shipping, private paymentInfo: PaymentInfo, public shoppingCart: ShoppingCart,public email?:string) {
        this.datePlaced = new Date().getTime();
        this.orderTotalPrice = shoppingCart.totalPrice;
        
    }

    
}