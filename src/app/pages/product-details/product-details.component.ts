import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';
import { ProductModel } from 'src/app/_models/ProductModel';
import { ProductType } from 'src/app/_models/ProductType';
import { Currency } from 'src/app/_models/Currency';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  photos: GalleryItem[] = [];
  product: Product // new Product(1,"Roller 250mm 5.40mm", 390, "USD", "", "../../asset/img/products/product2.jpg");
  innerWidth: number = 0;



  productReviews: any[] = [];
  showReviewForm: boolean = false;

  reviewForm = new FormGroup({
    orderId: new FormControl('20942001-2D73-4B4D-95A7-0C8F000DECE6', [
      Validators.required
    ]),
    productId: new FormControl('', []),
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    rating: new FormControl(5, [
      Validators.required
    ]),
    text: new FormControl(''),
  });


  constructor(private route: ActivatedRoute,
    public CartService: CartService,
    public DataService: DataService,
    private router: Router,
    public GlobalsService: GlobalsService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private meta: Meta) {
      this.meta.addTags([
        {name: 'keywords', content: "Male, women, masturbator, маструбатор, мъжки маструбатор, мъжкимаструбатор, masturbatorcup \
        masturbator cup, cupmasturbator, cup, only fans, onlyfans, of, andjela tasheva, andjela tasheva only fans, andjela \
        tasheva onlyfans, onlyfans andjela tasheva, анджела ташева onlyfans, изкуствена вагина, маструбатори \
        вагини, секс играчки за мъже, Autofleshy, autofleshy, ofleshy, Ofleshy, OFLESH GROUP, Oflesh group, oflesh \
        group, make me freak, Freak, Make me Freak, The collection of Andjela Tasheva, lubricants, лубриканти, male \
        masturbator"
     }])
    }

  ngOnInit() {

    this.innerWidth = window.innerWidth;

       window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
    });

    this.translate.use(this.route.snapshot.paramMap.get("languageCode")).subscribe(res=>{
      this.route.paramMap.subscribe( paramMap => {
        this.productID = paramMap.get('id');
        this.DataService.getByIdFull(this.productID, "product").subscribe( product => {

          //console.log(product)
          if(product == undefined)
            this.router.navigate(["not-found"]);

          this.product = new Product(product.id,
            product.name,
            product.price,
            "",
            product.description,
            JSON.parse(product.photosJSON.replaceAll("'","\"").replaceAll("\\\"", "\"")),
            new ProductModel(product.productModel.id, product.productModel.name),
            new ProductType(product.productType.id, product.productType.name),
            new Currency(1, this.translate.currentLang == "bg" ? "Leva" : "Euro",
                            this.translate.currentLang == "bg" ? "лв" : "EUR",
                            ""), product.categoryRoute)


          this.photos.push(new ImageItem({
            src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail,
            thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail
          }));

          //console.log(this.product.photosJSON)
          //https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592200/product-photos/5.40mm-compressed/Top%20Roller/250mm_5.4mm_2023-Mar-15_12-40-34PM-000_CustomizedView9730449655_juzc56.jpg
          for(let i=0;i<this.product.photosJSON.gallery.length;i++){
            this.photos.push(new ImageItem({
                src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i],
                thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i]
            }));
          }

          this.DataService.getReviews(this.product.id).subscribe(res=>{
            this.productReviews = res;
            //console.log(this.productReviews)
          })
        //   this.translate.get('demo.greeting', {name: 'John'}).subscribe((res: string) => {
        //     console.log(res);
        });

        //})
    })
    })



  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  buyInstant() {
    this.CartService.emptyCart();
    this.CartService.addItem(this.product, false, false)
    this.router.navigate(['/'+this.translate.currentLang+"/checkout"])
  }


  addReview(){
    this.reviewForm.get('productId').setValue(this.product.id);
    this.DataService.sendReview(this.reviewForm.value).subscribe(res=>{
      this.showReviewForm = false;
      this.reviewForm.reset();
      this.toastr.success("Review sent successfully!");
      this.DataService.getReviews(this.product.id).subscribe(res=>{
        this.productReviews = res;
      }),
      err=>{
        this.toastr.error("Error sending review!");
      }
    });
  }

  setRating(rating){
    this.reviewForm.get('rating').setValue(rating);
  }


}
