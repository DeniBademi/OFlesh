import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subject, from, EMPTY } from 'rxjs';
import { tap, map, switchMap, finalize, debounceTime } from 'rxjs/operators';
import { Directive, Input, Inject, Optional, Self, Host, NgZone, ElementRef, Renderer2, PLATFORM_ID, NgModule } from '@angular/core';
import { Gallery, ImageItem, GalleryComponent, GalleryModule } from '@ngx-gallery/core';
import { Lightbox, LightboxModule } from '@ngx-gallery/lightbox';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GallerizeDirective = /** @class */ (function () {
    function GallerizeDirective(_zone, _el, _gallery, _lightbox, _renderer, platform, _document, _galleryCmp) {
        this._zone = _zone;
        this._el = _el;
        this._gallery = _gallery;
        this._lightbox = _lightbox;
        this._renderer = _renderer;
        this._document = _document;
        this._galleryCmp = _galleryCmp;
        /**
         * Default gallery id
         */
        this._galleryId = 'lightbox';
        /**
         * The selector used to query images elements
         */
        this.selector = 'img';
        // Set gallerize mode
        if (isPlatformBrowser(platform)) {
            this._mode = _galleryCmp ? "gallery" /* Gallery */ : "detector" /* Detector */;
        }
    }
    /**
     * @return {?}
     */
    GallerizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._galleryId = _this.gallerize || _this._galleryId;
            /** @type {?} */
            var ref = _this._gallery.ref(_this._galleryId);
            switch (_this._mode) {
                case "detector" /* Detector */:
                    _this.detectorMode(ref);
                    break;
                case "gallery" /* Gallery */:
                    _this.galleryMode(ref);
            }
        });
    };
    /**
     * @return {?}
     */
    GallerizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        switch (this._mode) {
            case "detector" /* Detector */:
                this._detector$.complete();
                this._observer$.disconnect();
                break;
            case "gallery" /* Gallery */:
                this._itemClick$.unsubscribe();
                this._itemChange$.unsubscribe();
        }
    };
    /** Gallery mode: means `gallerize` directive is used on `<gallery>` component
     * Adds a click event to each gallery item so it opens in lightbox */
    /**
     * Gallery mode: means `gallerize` directive is used on `<gallery>` component
     * Adds a click event to each gallery item so it opens in lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    GallerizeDirective.prototype.galleryMode = /**
     * Gallery mode: means `gallerize` directive is used on `<gallery>` component
     * Adds a click event to each gallery item so it opens in lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    function (galleryRef) {
        var _this = this;
        // Clone its items to the new gallery instance
        this._itemClick$ = this._galleryCmp.galleryRef.itemClick.subscribe(function (i) { return _this._lightbox.open(i, _this._galleryId); });
        this._itemChange$ = this._galleryCmp.galleryRef.itemsChanged.subscribe(function (state) { return galleryRef.load(state.items); });
    };
    /** Detector mode: means `gallerize` directive is used on a normal HTMLElement
     *  Detects images and adds a click event to each image so it opens in the lightbox */
    /**
     * Detector mode: means `gallerize` directive is used on a normal HTMLElement
     *  Detects images and adds a click event to each image so it opens in the lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    GallerizeDirective.prototype.detectorMode = /**
     * Detector mode: means `gallerize` directive is used on a normal HTMLElement
     *  Detects images and adds a click event to each image so it opens in the lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    function (galleryRef) {
        var _this = this;
        this._detector$ = new Subject();
        // Query image elements
        this._detector$.pipe(debounceTime(300), switchMap(function () {
            /**
             * get all img elements from content
             * @type {?}
             */
            var imageElements = _this._el.nativeElement.querySelectorAll(_this.selector);
            if (imageElements && imageElements.length) {
                /** @type {?} */
                var images_1 = [];
                return from(imageElements).pipe(map(function (el, i) {
                    // Add click event to the image
                    _this._renderer.setStyle(el, 'cursor', 'pointer');
                    _this._renderer.setProperty(el, 'onclick', function () {
                        return _this._zone.run(function () { return _this._lightbox.open(i, _this._galleryId); });
                    });
                    if (el instanceof HTMLImageElement) {
                        // If element is type of img use the src property
                        return {
                            src: el.getAttribute('imageSrc') || el.src,
                            thumb: el.getAttribute('thumbSrc') || el.src
                        };
                    }
                    else {
                        // Otherwise, use element background-image url
                        /** @type {?} */
                        var elStyle = el.currentStyle || _this._document.defaultView.getComputedStyle(el, null);
                        /** @type {?} */
                        var background = elStyle.backgroundImage.slice(4, -1).replace(/"/g, '');
                        return {
                            src: el.getAttribute('imageSrc') || background,
                            thumb: el.getAttribute('thumbSrc') || background
                        };
                    }
                }), tap(function (data) { return images_1.push(new ImageItem(data)); }), finalize(function () { return galleryRef.load(images_1); }));
            }
            else {
                return EMPTY;
            }
        })).subscribe();
        // Observe content changes
        this._observer$ = new MutationObserver(function () { return _this._detector$.next(); });
        this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
    };
    GallerizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[gallerize]'
                },] }
    ];
    /** @nocollapse */
    GallerizeDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Gallery },
        { type: Lightbox },
        { type: Renderer2 },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: GalleryComponent, decorators: [{ type: Host }, { type: Self }, { type: Optional }] }
    ]; };
    GallerizeDirective.propDecorators = {
        gallerize: [{ type: Input }],
        selector: [{ type: Input }]
    };
    return GallerizeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GallerizeModule = /** @class */ (function () {
    function GallerizeModule() {
    }
    GallerizeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        GalleryModule,
                        LightboxModule
                    ],
                    declarations: [GallerizeDirective],
                    exports: [GallerizeDirective]
                },] }
    ];
    return GallerizeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { GallerizeDirective, GallerizeModule };

//# sourceMappingURL=ngx-gallery-gallerize.js.map