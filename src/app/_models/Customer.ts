import { ProductModel } from "./ProductModel";
import { ProductType } from "./ProductType";

export class Customer {
    constructor(
      public id: string,
      public FirstName: string,
      public LastName: string,
      public Email: string,
      public PhoneNumber: string) { }
}