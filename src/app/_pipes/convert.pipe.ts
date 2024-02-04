import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


const rates = {
  "BGN": 1,
  "EUR":0.51,
  "USD":0.57
}
@Pipe({
  name: 'convert',
  pure: false
})
export class ConvertPipe implements PipeTransform {

  currentCurrency = "";
   constructor(private translate: TranslateService) {
    this.currentCurrency = translate.currentLang == "bg" ? "BGN" : "EUR"
   }

   transform(value: any, args?: any): any {
      if(args)
        return value * rates[args]
      else
        return value * rates[this.currentCurrency]
   }
}