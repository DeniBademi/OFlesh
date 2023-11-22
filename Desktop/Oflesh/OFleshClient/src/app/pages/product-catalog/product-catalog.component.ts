import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MenuOption } from 'src/app/product-filters/MenuOption';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  changeFilters: Subject<{}> = new Subject<{}>();
  spareParts: any;

  constructor(GlobalsService: GlobalsService, private route: ActivatedRoute, private translate:TranslateService, public modalService: ModalService) { 
    this.spareParts = GlobalsService.spareParts;
  }
  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))
  }

  onChangeFilters(newFilters: {}) {
    //console.log(newFilters)
    this.changeFilters.next(newFilters);
  }

  onAddToCart(product: Product) {
    this.modalService.open("modal-1");
  }

}
