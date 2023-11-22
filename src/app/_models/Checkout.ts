import { ProductModel } from "./ProductModel";
import { Coupon } from "./Coupon";
import { Customer } from "./Customer";

export class Checkout {
    constructor(
      public id: string,
      public cartJSON: string,
      public customerId: string,
      public customer: Customer,
      public couponId: string,
      public coupon: Coupon) { }
}