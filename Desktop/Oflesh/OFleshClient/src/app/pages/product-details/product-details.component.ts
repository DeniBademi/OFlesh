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


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  photos: GalleryItem[] = [];
  product: Product // new Product(1,"Roller 250mm 5.40mm", 390, "USD", "", "../../asset/img/products/product2.jpg");
  innerWidth: number = 0;

  constructor(private route: ActivatedRoute, 
    public CartService: CartService, 
    public DataService: DataService,
    private router: Router, 
    public GlobalsService: GlobalsService,
    public translate: TranslateService) { }

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
  
          if(product == undefined)
            this.router.navigate(["not-found"]);
          
            console.log(product)
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
                            ""))
          //console.log(this.product)
        
  
          
          this.photos.push(new ImageItem({
            src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail,
            thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail
          }));

          console.log(this.product.photosJSON)
          //https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592200/product-photos/5.40mm-compressed/Top%20Roller/250mm_5.4mm_2023-Mar-15_12-40-34PM-000_CustomizedView9730449655_juzc56.jpg
          for(let i=0;i<this.product.photosJSON.gallery.length;i++){
            
            this.photos.push(new ImageItem({
                src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i],
                thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i]
            }));
          }
  
        //   this.translate.get('demo.greeting', {name: 'John'}).subscribe((res: string) => {
        //     console.log(res);
        // });
          
        })
    })
    })
    


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  buyInstant() {
    this.CartService.emptyCart();
    this.CartService.addItem(this.product, false)
    this.router.navigate(['/'+this.translate.currentLang+"/cart"])
  }




}
