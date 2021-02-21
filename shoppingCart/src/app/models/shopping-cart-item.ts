import { Product } from "./product";

export class ShoppingCartItem{

    constructor(public title:string, public price: number, public imgUrl:string,public category:string,public quantity:number,public key?:string){}
}