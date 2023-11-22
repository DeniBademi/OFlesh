(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@ngx-gallery/core'), require('@ngx-gallery/lightbox')) :
    typeof define === 'function' && define.amd ? define('@ngx-gallery/gallerize', ['exports', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/core', '@ngx-gallery/core', '@ngx-gallery/lightbox'], factory) :
    (factory((global['ngx-gallery'] = global['ngx-gallery'] || {}, global['ngx-gallery'].gallerize = {}),global.ng.common,global.rxjs,global.rxjs.operators,global.ng.core,global.core$1,global.lightbox));
}(this, (function (exports,common,rxjs,operators,core,core$1,lightbox) { 'use strict';

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
            if (common.isPlatformBrowser(platform)) {
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
                this._detector$ = new rxjs.Subject();
                // Query image elements
                this._detector$.pipe(operators.debounceTime(300), operators.switchMap(function () {
                    /**
                     * get all img elements from content
                     * @type {?}
                     */
                    var imageElements = _this._el.nativeElement.querySelectorAll(_this.selector);
                    if (imageElements && imageElements.length) {
                        /** @type {?} */
                        var images_1 = [];
                        return rxjs.from(imageElements).pipe(operators.map(function (el, i) {
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
                        }), operators.tap(function (data) { return images_1.push(new core$1.ImageItem(data)); }), operators.finalize(function () { return galleryRef.load(images_1); }));
                    }
                    else {
                        return rxjs.EMPTY;
                    }
                })).subscribe();
                // Observe content changes
                this._observer$ = new MutationObserver(function () { return _this._detector$.next(); });
                this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
            };
        GallerizeDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[gallerize]'
                    },] }
        ];
        /** @nocollapse */
        GallerizeDirective.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: core.ElementRef },
                { type: core$1.Gallery },
                { type: lightbox.Lightbox },
                { type: core.Renderer2 },
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
                { type: core$1.GalleryComponent, decorators: [{ type: core.Host }, { type: core.Self }, { type: core.Optional }] }
            ];
        };
        GallerizeDirective.propDecorators = {
            gallerize: [{ type: core.Input }],
            selector: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            core$1.GalleryModule,
                            lightbox.LightboxModule
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

    exports.GallerizeDirective = GallerizeDirective;
    exports.GallerizeModule = GallerizeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-gallery-gallerize.umd.js.map