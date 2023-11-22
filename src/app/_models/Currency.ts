import { ProductModel } from "./ProductModel";
import { ProductType } from "./ProductType";

export class Currency {
    constructor(
      public id: number,
      public fullname: string,
      public currencyCode: string,
      public prefix: string) { }
}