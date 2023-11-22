export class Order{
    constructor(
        public sellerId: number,
        public productId: number,
        public addressLine: string,
        public zipCode: number
    ) {}
}