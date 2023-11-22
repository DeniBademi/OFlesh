import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
  } from "@angular/core";
  import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
  import { loadStripe } from "@stripe/stripe-js";
import { Observable, Subscription } from "rxjs";
  
  @Component({
    selector: "app-stripe-payment",
    templateUrl: "./stripe-payment.component.html",
    styleUrls: ["./stripe-payment.component.css"],
  })
  export class StripePaymentComponent implements OnInit {
    @ViewChild("cardInfo") cardInfo: ElementRef;
    @Input() totalAmount: any;
    @Input() purchaseEvent: Observable<void>;
    purchaseEventSubscription: Subscription;
    card: any;
    cardHandler = this.onChange.bind(this);
    cardError: string;
    dialog: any;
    elements: any;
    stripe: any;
    constructor(
      private cd: ChangeDetectorRef,
      @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
      @Optional() private dialogRef: MatDialogRef<StripePaymentComponent>
    ) {}
  
    ngOnInit(): void {
      loadStripe(
        "pk_live_51KUEGcE2HlANu4KrXM0utncLwR3EZlr5MWvY8LaNZJqIL5U34pBroReVbJ01HfVJb5QNsxRjkYtDfktzxvCjHoEw00lfp2tmZc"
      ).then((stripe) => {
        this.stripe = stripe;
            const appearance = {
                theme: 'flat'
        };
        //"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", appearance
        //this.elements = this.stripe.elements({ clientSecret: "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"});
        this.elements = this.stripe.elements();

        this.initiateCardElement();
      });
      this.purchaseEventSubscription = this.purchaseEvent.subscribe(() => this.createStripeToken());
    }
    ngOnDestroy() {
      if (this.card) {
        // We remove event listener here to keep memory clean
        this.card.removeEventListener("change", this.cardHandler);
        this.card.destroy();
      }
    }
    initiateCardElement() {
      // Giving a base style here, but most of the style is in scss file
      const cardStyle = {
        base: {
          Color: "#fff",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          color: "white",
          fontSize: "16px",
          "::placeholder": {
            color: "#d1d1d1",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };
      this.card = this.elements.create("card", {style:cardStyle});
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener("change", this.cardHandler);
    }
    onChange({ error }) {
      if (error) {
        this.cardError = error.message;
      } else {
        this.cardError = null;
      }
      this.cd.detectChanges();
    }
    async createStripeToken() {
      const { token, error } = await this.stripe.createToken(this.card);
      if (token) {
        this.onSuccess(token);
      } else {
        this.onError(error);
      }
    }
    onSuccess(token) {
      this.dialogRef.close({ token });
    }
    onError(error) {
      if (error.message) {
        this.cardError = error.message;
      }
    }
    checkout() {
      const dialogRef = this.dialog.open(StripePaymentComponent, {
        // opening dialog here which will give us back stripeToken
        data: { totalAmount: this.getTotal() },
      });
      dialogRef
        .afterClosed()
        // waiting for stripe token that will be given back
        .subscribe((result: any) => {
          if (result) {
            this.createOrder(result.token.id);
          }
        });
    }
    getTotal() {}
    createOrder(id: any) {}
  }
  