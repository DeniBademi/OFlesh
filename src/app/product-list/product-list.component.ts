import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SkipSelf, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { Currency } from '../_models/Currency';
import { GlobalsService } from '../_services/globals.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  pageSize: any = "12";
  totalPages: any = "100";
  currentPage: any = "1";

  filters: any = {};
  types: any;
  models: any;
  
  direction: any = "arrow_downward"

  productList: Product[] = [];
  @Output() onProductSelected: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() changeFilters: Observable<{}> = new Observable<{}>();


  private currentProduct: any;
  typesLoaded: boolean = false;
  changeFiltersSubscription: any;
  
  constructor(@SkipSelf() private http: HttpClient, 
    public cartService: CartService,
    public toastr: ToastrService,
    private Globals: GlobalsService,
    private translate: TranslateService) { 

    
  
}

  ngOnInit() {

    this.filters = {"ProductTypeId":["d9e9e846-7a39-4aec-b065-88b9e22ff526"],"ProductModelId":["e752ef04-304f-49f2-b1ff-166309ea34fd","9c37bd3a-8ce5-42b2-8128-e0713beb7122","0638adf0-6e03-4715-b717-e3cad9b28ec0"]}

    this.changeFiltersSubscription = this.changeFilters.subscribe(res => {
      this.filters = res;
      console.log(this.filters)
      this.getProducts();
    });
    
    this.getProducts();
    
  }

  getProducts() {


    this.productList = [];

    this.http.get(this.Globals.baseURL+'product/getAll', 
    {
      observe: 'response',
      params: new HttpParams().set("pageNumber", this.currentPage)
                              .set("pageSize", this.pageSize)
                              .set("orderBy", this.filters.orderBy == undefined ? "id" : this.filters.orderBy)
                              .set("filters", JSON.stringify(this.filters))
                              .set("direction", this.direction=="arrow_downward" ? "asc" : "desc")
    }).pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {
      this.typesLoaded=true;


      
      let products = response.body.map((item: any) => {
          return new Product(item.id, 
          item.name, 
          item.price, 
          "", 
          item.description, 
          JSON.parse(item.photosJSON.replaceAll("'","\"").replaceAll("\\\"", "\"")),
          new ProductModel(item.productModel.id, item.productModel.name),
          new ProductType(item.productType.id, item.productType.name),
          new Currency(1, this.translate.currentLang == "bg" ? "Leva" : "EUR",
                          this.translate.currentLang == "bg" ? "лв" : "EUR", 
                          ""))
          })
      products.sort((n1,n2) => {
        if (n1.productType.name === "Spare Part" && n2.productType.name === "Machine")
          return 1;

        if (n1.productType.name === "Machine" && n2.productType.name === "Spare Part")
          return -1;
        
        return 0;
      });
      this.productList = products;

      // this.productList = response.body.sort((n1,n2) => {
      //   if (n1.productType.name === "Spare Part" && n2.productType.name === "Machine")
      //     return 1;

      //   if (n1.productType.name === "Machine" && n2.productType.name === "Spare Part")
      //       return -1;
        
      //   return 0;
      // }).map((item: any) => {
      //   //console.log(item)
      //   return new Product(item.id, 
      //     item.name, 
      //     item.price, 
      //     "", 
      //     item.description, 
      //     JSON.parse(item.photosJSON.replaceAll("'","\"").replaceAll("\\\"", "\"")),
      //     new ProductModel(item.productModel.id, item.productModel.name),
      //     new ProductType(item.productType.id, item.productType.name),
      //     new Currency(1, this.translate.currentLang == "bg" ? "Leva" : "EUR",
      //                     this.translate.currentLang == "bg" ? "лв" : "EUR", 
      //                     ""))
      // });
      var pag = JSON.parse(response.headers.get("Pagination"))
      this.totalPages = String(pag["TotalItems"])
    }, error => {
      console.log(error.error);
    })
  }

  getTypes(){
    this.http.get(this.Globals.baseURL+'product/types/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {

      this.typesLoaded=true;
      this.types = response;
      //console.log(response[0])
    }, error => {
      //console.log(error.error);
    })
  }

  getModels(){
    this.http.get(this.Globals.baseURL+'product/productmodel/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {

      this.models = response;
      //console.log(response[0])
    }, error => {
      console.log(error.error);
    })
  }

  clicked(product: Product): void {
    this.currentProduct = product
    this.onProductSelected.emit(product)
    if(!this.cartService.productInCart(product)) {
      this.toastr.info("Product added to cart", "Cart changed")
      this.cartService.addItem(product);
    }
    else {
      this.toastr.error("Product already in cart")
    }
    this.cartService.printCart();
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false
    }
    return product.id === this.currentProduct.id
  }
  onChangePage(pageOfItems: any) {
    // update current page of items
    //console.log(pageOfItems)
    this.currentPage = pageOfItems["pageIndex"]+1;
    this.pageSize = String(pageOfItems["pageSize"]);
    this.getProducts();

}
  onChangeDirection(){
    if (this.direction=="arrow_downward"){
      this.direction="arrow_upward"
    }else{
      this.direction="arrow_downward"
    }

    this.getProducts();
  }

  clearFilters() {
    this.filters = [];
    this.types = [];
    this.models = [];

    //console.log(this.filters)

    this.getProducts()    
  }

  
  ngOnDestroy() {
    this.changeFiltersSubscription.unsubscribe();
  }
}
