import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MenuOption } from 'src/app/product-filters/MenuOption';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';
import { ModalService } from 'src/app/_services/modal.service';
import { ProductModel } from 'src/app/_models/ProductModel';
import { ProductType } from 'src/app/_models/ProductType';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  changeFilters: Subject<{}> = new Subject<{}>();
  currentRoute: string = "";

  routesForBreadcrumbs: string[] = [];
  currentCategory: any = null;
  featureList: string[] = [];

  categoryTree = {
        "id": 1,
        "name": "Catalog",
        "description": "The collections of your favourite models.",
        "descriptionBG": "Колекциите на любимите ви модели.",
        "checked": false,
        "count": 0,
        "behavior": "category",
        "children": [
          {
            "id": 2,
            "name": "Andjela",
            "description": "The Collection of \"Andjela Tasheva\" Ofleshy is made of high quality materials that\
            provide not only a pleasant feeling, but also safety in use. Each toy is accurately replicated with\
            a cast of your favorite star, giving you the opportunity to relax and enjoy the unique experience\
            and intimacy you can achieve.",
            "descriptionBG": "Колекцията на \"Анджела Ташева\" Ofleshy е изработена от висококачествени материали,\
            които осигуряват не само приятно усещане, но и безопасност при употреба. Всяка играчка е точно\
            репликирана с отливка на любимата ви звезда, като ви дава възможност да се отпуснете и да се насладите\
            на уникалното изживяване и близост, които можете да постигнете.",
            "checked": false,
            "count": 0,
            "behavior": "category",
            "children": [
              {
                "id": 4,
                "name": "Ofleshy",
                "description": "",
                "descriptionBG": "",
                "checked": false,
                "count": 0,
                "behavior": "feature",
                "children": []
              },
              {
                "id": 5,
                "name": "Autofleshy",
                "description": "",
                "descriptionBG": "",
                "checked": false,
                "count": 0,
                "behavior": "feature",
                "children": []
              }

            ]
          }
        ]
  }





  categories: MenuOption[] = []
  breadCrumbs: any[] = []

  navigationSubscription: any;

  constructor(GlobalsService: GlobalsService,
    public route: ActivatedRoute,
    public router: Router,
    public translate:TranslateService,
    public modalService: ModalService) {

    this.navigationSubscription = router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url.startsWith("/"+this.route.snapshot.paramMap.get("languageCode")+"/catalog")){
        this.readRoute();

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))
  }

  ngOnDispose() {
    if(this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  readRoute() {
    let routeParts = this.router.url.replace("/"+this.route.snapshot.paramMap.get("languageCode")+"/", "").split("?")[0].split("/")

    //get query parameters
    let queryParams = this.route.snapshot.queryParamMap;
    this.featureList = queryParams.get("features") ? queryParams.get("features").split(",") : [];


    this.loadBreadCrumbs(routeParts);
    this.currentRoute = routeParts[routeParts.length - 1];
    this.loadCategories();
  }

  loadCategories() {
    // find the current category from the route
    this.categories = [];
    this.currentCategory = this.bfs(this.categoryTree, this.currentRoute)
    for(let i=0;i<this.currentCategory.children.length;i++) {
      this.categories.push(new MenuOption(this.currentCategory.children[i].id,
        this.currentCategory.children[i].name,
        false,
        0,
        this.currentCategory.children[i].behavior))
    }

    for(let i=0;i<this.categories.length;i++) {

      this.categories[i].checked = this.featureList.includes(this.categories[i].name.toLowerCase())
    }


    if(this.categories.length > 0)
      if(this.categories[0].behavior == "feature") {
        this.categories = [new MenuOption(1, "All", this.featureList.length==this.categories.length, 0, "feature"), ...this.categories]
        //activate all categories
        //this.categories.forEach(c => c.checked = true)
      }
  }

  loadBreadCrumbs(routeParts: string[] = []) {
    this.breadCrumbs = [];
    for(let i=0;i<routeParts.length;i++) {
      this.breadCrumbs.push({
        "name": this.formatBreadbrumb(routeParts[i]),
        "url": routeParts.slice(0, i+1).join("/")
      })
    }
  }

  onChangeFilters(newFilters: {}) {

    this.changeFilters.next(newFilters);
  }

  onAddToCart(product: Product) {
    this.modalService.open("modal-1");
  }

  onCategoryClick(category: MenuOption) {

    // if the category is a category, then we need to change the route
    if(category.behavior == "category") {
      this.router.navigate([this.router.url + '/' + category.name.toLowerCase()])
      return;
    } else {
      category.checked = !category.checked;

      // all change the state of all categories
      if(category.id == 1) {
        this.categories.forEach(c => c.checked = category.checked)
      } else {
        // if all categories are checked, then we need to check the "All" category
        if(this.categories.filter(c => c.checked).length == this.categories.length - 1 && category.checked) {
          this.categories[0].checked = true;
        } else {
          this.categories[0].checked = false;
        }
      }
    }

    this.featureList = this.categories.slice(1).filter(c => c.checked).map(c => c.name.toLowerCase())
    let features = this.featureList.join(",")

    this.router.navigate([this.router.url.split("?")[0]], { queryParams: { features: features } })
  }

  bfs(node: any, name: string) {
    let queue = [];
    queue.push(node);
    while(queue.length > 0) {
      let current = queue.shift();
      if(current.name.toLowerCase() == name)
        return current;
      else
        queue.push(...current.children)
    }
    return null;
  }

  formatBreadbrumb(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
