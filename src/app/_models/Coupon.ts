export class Coupon {
    constructor(
      public id: string,
      public discount: number,
      public validFrom: string,
      public validUntil: string,
      public remainingUses: number,
      public isPercentage: boolean,
      public isPeriodBased: boolean,
      public isActive: boolean) { }
}