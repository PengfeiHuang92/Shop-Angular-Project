export class PaymentInfo{
    constructor(
        private cardHolder : string,
        private cardNumber : number, 
        private expirationMonth: number,
        private expirationYear: number,
        private cvv: number ){}
}