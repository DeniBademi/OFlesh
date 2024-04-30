import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addLanguageHeader(request));
  }

  addLanguageHeader(request: HttpRequest<any>) {
    const language = this.translate.currentLang
    if(language==undefined) return request
    return request.clone({
      setHeaders: {
        "Language": language
      }
    })
  }
}
