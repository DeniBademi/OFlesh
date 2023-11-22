import { Currency } from "./Currency";
import { ProductModel } from "./ProductModel";
import { ProductType } from "./ProductType";

export class Product {
    constructor(
      public id: string,
      public name: string,
      public price: number,
      public currencyCode: string = "",
      public description: string,
      public photosJSON: any,
      public productModel: ProductModel,
      public productType: ProductType,
      public currency: Currency) { }
}