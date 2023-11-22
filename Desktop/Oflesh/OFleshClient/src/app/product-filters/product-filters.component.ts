import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { DataService } from '../_services/data.service';
import { MenuOption } from './MenuOption';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})

export class ProductFiltersComponent implements OnInit, AfterViewInit {

  
  @Output() ChangeFilters = new EventEmitter<{}>();

  constructor(public dataService: DataService) { }

  productTypes : MenuOption[] = [];
  productModels : MenuOption[] = [];
  productFilters : any = {
    "ProductTypeId": [],
    "ProductModelId": []
  };

  ngOnInit() {
    this.dataService.getTypes().subscribe(response => {
      for(let i=0;i<response.length;i++)
        this.productTypes.push(new MenuOption(response[i].id, response[i].name, response[i].name != "Spare Part", response[i].count))
      //this.applyFilters();
      console.log("Loaded types");
      //if(this.productModels.length>0)  this.applyFilters();
    }, error => {
      console.log(error.error);
    })
    this.dataService.getModels().subscribe(response => {
      for(let i=0;i<response.length;i++)
        this.productModels.push(new MenuOption(response[i].id,response[i].name, true, response[i].count))

      console.log("Loaded models");
      console.log("applying filters");
      //if(this.productTypes.length>0) this.applyFilters();
    }, error => {
      console.log(error.error);
    })

  }

  ngAfterViewInit() {
    
  }

  applyFilters(){
    this.productFilters = {
      "ProductTypeId": [],
      "ProductModelId": []
    };
    for(let i=0;i<this.productTypes.length;i++) {
      if (this.productTypes[i].checked === true) 
        this.productFilters["ProductTypeId"].push(this.productTypes[i].id)
    }
    for(let i=0;i<this.productModels.length;i++) {
      if (this.productModels[i].checked === true) 
        this.productFilters["ProductModelId"].push(this.productModels[i].id)
    }

    this.ChangeFilters.next(this.productFilters)
  }

  changeTypeStatusOption(event: Event, item: MenuOption) {
    const isChecked = (<HTMLInputElement>event.target).checked;

    for(let i=0;i<this.productTypes.length;i++)
      if(item.id === this.productTypes[i].id) {
        this.productTypes[i].checked=isChecked;
      }
  }
  changeModelStatusOption(event: Event, item: MenuOption) {
    const isChecked = (<HTMLInputElement>event.target).checked;

    for(let i=0;i<this.productModels.length;i++)
      if(item.id === this.productModels[i].id) {
        this.productModels[i].checked=isChecked;
      }
  }
}
