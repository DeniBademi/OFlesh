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
class GallerizeDirective {
    /**
     * @param {?} _zone
     * @param {?} _el
     * @param {?} _gallery
     * @param {?} _lightbox
     * @param {?} _renderer
     * @param {?} platform
     * @param {?} _document
     * @param {?} _galleryCmp
     */
    constructor(_zone, _el, _gallery, _lightbox, _renderer, platform, _document, _galleryCmp) {
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
    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this._galleryId = this.gallerize || this._galleryId;
            /** @type {?} */
            const ref = this._gallery.ref(this._galleryId);
            switch (this._mode) {
                case "detector" /* Detector */:
                    this.detectorMode(ref);
                    break;
                case "gallery" /* Gallery */:
                    this.galleryMode(ref);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        switch (this._mode) {
            case "detector" /* Detector */:
                this._detector$.complete();
                this._observer$.disconnect();
                break;
            case "gallery" /* Gallery */:
                this._itemClick$.unsubscribe();
                this._itemChange$.unsubscribe();
        }
    }
    /**
     * Gallery mode: means `gallerize` directive is used on `<gallery>` component
     * Adds a click event to each gallery item so it opens in lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    galleryMode(galleryRef) {
        // Clone its items to the new gallery instance
        this._itemClick$ = this._galleryCmp.galleryRef.itemClick.subscribe((i) => this._lightbox.open(i, this._galleryId));
        this._itemChange$ = this._galleryCmp.galleryRef.itemsChanged.subscribe((state) => galleryRef.load(state.items));
    }
    /**
     * Detector mode: means `gallerize` directive is used on a normal HTMLElement
     *  Detects images and adds a click event to each image so it opens in the lightbox
     * @private
     * @param {?} galleryRef
     * @return {?}
     */
    detectorMode(galleryRef) {
        this._detector$ = new Subject();
        // Query image elements
        this._detector$.pipe(debounceTime(300), switchMap(() => {
            /**
             * get all img elements from content
             * @type {?}
             */
            const imageElements = this._el.nativeElement.querySelectorAll(this.selector);
            if (imageElements && imageElements.length) {
                /** @type {?} */
                const images = [];
                return from(imageElements).pipe(map((el, i) => {
                    // Add click event to the image
                    this._renderer.setStyle(el, 'cursor', 'pointer');
                    this._renderer.setProperty(el, 'onclick', () => this._zone.run(() => this._lightbox.open(i, this._galleryId)));
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
                        const elStyle = el.currentStyle || this._document.defaultView.getComputedStyle(el, null);
                        /** @type {?} */
                        const background = elStyle.backgroundImage.slice(4, -1).replace(/"/g, '');
                        return {
                            src: el.getAttribute('imageSrc') || background,
                            thumb: el.getAttribute('thumbSrc') || background
                        };
                    }
                }), tap((data) => images.push(new ImageItem(data))), finalize(() => galleryRef.load(images)));
            }
            else {
                return EMPTY;
            }
        })).subscribe();
        // Observe content changes
        this._observer$ = new MutationObserver(() => this._detector$.next());
        this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
    }
}
GallerizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gallerize]'
            },] }
];
/** @nocollapse */
GallerizeDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Gallery },
    { type: Lightbox },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: GalleryComponent, decorators: [{ type: Host }, { type: Self }, { type: Optional }] }
];
GallerizeDirective.propDecorators = {
    gallerize: [{ type: Input }],
    selector: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GallerizeModule {
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