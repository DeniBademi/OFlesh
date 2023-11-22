/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, Optional, Self, Host, NgZone, ElementRef, Renderer2, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Gallery, ImageItem, GalleryComponent } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Subject, from, EMPTY } from 'rxjs';
import { tap, map, switchMap, finalize, debounceTime } from 'rxjs/operators';
/** @enum {string} */
var GallerizeMode = {
    Detector: 'detector',
    Gallery: 'gallery',
};
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
export { GallerizeDirective };
if (false) {
    /**
     * Default gallery id
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._galleryId;
    /**
     * Gallerize mode
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._mode;
    /**
     * Stream that emits to fire the detection stream the image elements has changed
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._observer$;
    /**
     * Stream that emits when image is discover
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._detector$;
    /**
     * Gallery events (if used on a gallery component)
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._itemClick$;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._itemChange$;
    /**
     * If set, it will become the gallery id
     * @type {?}
     */
    GallerizeDirective.prototype.gallerize;
    /**
     * The selector used to query images elements
     * @type {?}
     */
    GallerizeDirective.prototype.selector;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._gallery;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._lightbox;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._document;
    /**
     * @type {?}
     * @private
     */
    GallerizeDirective.prototype._galleryCmp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZ2FsbGVyeS9nYWxsZXJpemUvIiwic291cmNlcyI6WyJsaWIvZ2FsbGVyaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFOUQsT0FBTyxFQUFFLE9BQU8sRUFBYyxTQUFTLEVBQUUsZ0JBQWdCLEVBQTZCLE1BQU0sbUJBQW1CLENBQUM7QUFDaEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE9BQU8sRUFBRSxPQUFPLEVBQWdCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0lBUzNFLFVBQVcsVUFBVTtJQUNyQixTQUFVLFNBQVM7O0FBR3JCO0lBaUNFLDRCQUFvQixLQUFhLEVBQ2IsR0FBZSxFQUNmLFFBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW9CLEVBQ1AsUUFBZ0IsRUFDWCxTQUFjLEVBQ0osV0FBNkI7UUFQekQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUVGLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFDSixnQkFBVyxHQUFY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Ozs7SUFDeEMseUNBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGYsXG4gIEhvc3QsXG4gIE5nWm9uZSxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEdhbGxlcnksIEdhbGxlcnlSZWYsIEltYWdlSXRlbSwgR2FsbGVyeUNvbXBvbmVudCwgR2FsbGVyeVN0YXRlLCBHYWxsZXJ5SXRlbSB9IGZyb20gJ0BuZ3gtZ2FsbGVyeS9jb3JlJztcbmltcG9ydCB7IExpZ2h0Ym94IH0gZnJvbSAnQG5neC1nYWxsZXJ5L2xpZ2h0Ym94JztcblxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBtYXAsIHN3aXRjaE1hcCwgZmluYWxpemUsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBoYXMgMiBtb2RlczpcbiAqIDEgLSBJZiBob3N0IGVsZW1lbnQgaXMgYSBIVE1MRWxlbWVudCwgaXQgZGV0ZWN0cyB0aGUgaW1hZ2VzIGFuZCBob29rcyB0aGVpciBjbGlja3MgdG8gbGlnaHRib3hcbiAqIDIgLSBJZiBob3N0IGVsZW1lbnQgaXMgYSBHYWxsZXJ5Q29tcG9uZW50LCBpdCBob29rcyB0aGUgaW1hZ2VzIGNsaWNrIHRvIHRoZSBsaWdodGJveFxuICovXG5cbmNvbnN0IGVudW0gR2FsbGVyaXplTW9kZSB7XG4gIERldGVjdG9yID0gJ2RldGVjdG9yJyxcbiAgR2FsbGVyeSA9ICdnYWxsZXJ5J1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2FsbGVyaXplXSdcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKiBEZWZhdWx0IGdhbGxlcnkgaWQgKi9cbiAgcHJpdmF0ZSBfZ2FsbGVyeUlkID0gJ2xpZ2h0Ym94JztcblxuICAvKiogR2FsbGVyaXplIG1vZGUgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfbW9kZTogR2FsbGVyaXplTW9kZTtcblxuICAvKiogSWYgaG9zdCBlbGVtZW50IGlzIGEgSFRNTEVsZW1lbnQsIHdpbGwgdXNlIHRoZSBmb2xsb3dpbmcgdmFyaWFibGVzOiAqL1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB0byBmaXJlIHRoZSBkZXRlY3Rpb24gc3RyZWFtIHRoZSBpbWFnZSBlbGVtZW50cyBoYXMgY2hhbmdlZCAqL1xuICBwcml2YXRlIF9vYnNlcnZlciQ6IGFueTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBpbWFnZSBpcyBkaXNjb3ZlciAqL1xuICBwcml2YXRlIF9kZXRlY3RvciQ6IFN1YmplY3Q8YW55PjtcblxuICAvKiogSWYgaG9zdCBlbGVtZW50IGlzIGEgR2FsbGVyeUNvbXBvbmVudCwgd2lsbCB1c2UgdGhlIGZvbGxvd2luZyB2YXJpYWJsZXM6ICovXG5cbiAgLyoqIEdhbGxlcnkgZXZlbnRzIChpZiB1c2VkIG9uIGEgZ2FsbGVyeSBjb21wb25lbnQpICovXG4gIHByaXZhdGUgX2l0ZW1DbGljayQ6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfaXRlbUNoYW5nZSQ6IFN1YnNjcmlwdGlvbjtcblxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAvKiogSWYgc2V0LCBpdCB3aWxsIGJlY29tZSB0aGUgZ2FsbGVyeSBpZCAqL1xuICBASW5wdXQoKSBnYWxsZXJpemU6IHN0cmluZztcblxuICAvKiogVGhlIHNlbGVjdG9yIHVzZWQgdG8gcXVlcnkgaW1hZ2VzIGVsZW1lbnRzICovXG4gIEBJbnB1dCgpIHNlbGVjdG9yID0gJ2ltZyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZ2FsbGVyeTogR2FsbGVyeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbGlnaHRib3g6IExpZ2h0Ym94LFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybTogT2JqZWN0LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBASG9zdCgpIEBTZWxmKCkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZ2FsbGVyeUNtcDogR2FsbGVyeUNvbXBvbmVudCkge1xuXG4gICAgLy8gU2V0IGdhbGxlcml6ZSBtb2RlXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtKSkge1xuICAgICAgdGhpcy5fbW9kZSA9IF9nYWxsZXJ5Q21wID8gR2FsbGVyaXplTW9kZS5HYWxsZXJ5IDogR2FsbGVyaXplTW9kZS5EZXRlY3RvcjtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2dhbGxlcnlJZCA9IHRoaXMuZ2FsbGVyaXplIHx8IHRoaXMuX2dhbGxlcnlJZDtcbiAgICAgIGNvbnN0IHJlZiA9IHRoaXMuX2dhbGxlcnkucmVmKHRoaXMuX2dhbGxlcnlJZCk7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5fbW9kZSkge1xuICAgICAgICBjYXNlIEdhbGxlcml6ZU1vZGUuRGV0ZWN0b3I6XG4gICAgICAgICAgdGhpcy5kZXRlY3Rvck1vZGUocmVmKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHYWxsZXJpemVNb2RlLkdhbGxlcnk6XG4gICAgICAgICAgdGhpcy5nYWxsZXJ5TW9kZShyZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3dpdGNoICh0aGlzLl9tb2RlKSB7XG4gICAgICBjYXNlIEdhbGxlcml6ZU1vZGUuRGV0ZWN0b3I6XG4gICAgICAgIHRoaXMuX2RldGVjdG9yJC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLl9vYnNlcnZlciQuZGlzY29ubmVjdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2FsbGVyaXplTW9kZS5HYWxsZXJ5OlxuICAgICAgICB0aGlzLl9pdGVtQ2xpY2skLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX2l0ZW1DaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdhbGxlcnkgbW9kZTogbWVhbnMgYGdhbGxlcml6ZWAgZGlyZWN0aXZlIGlzIHVzZWQgb24gYDxnYWxsZXJ5PmAgY29tcG9uZW50XG4gICAqIEFkZHMgYSBjbGljayBldmVudCB0byBlYWNoIGdhbGxlcnkgaXRlbSBzbyBpdCBvcGVucyBpbiBsaWdodGJveCAqL1xuICBwcml2YXRlIGdhbGxlcnlNb2RlKGdhbGxlcnlSZWY6IEdhbGxlcnlSZWYpIHtcbiAgICAvLyBDbG9uZSBpdHMgaXRlbXMgdG8gdGhlIG5ldyBnYWxsZXJ5IGluc3RhbmNlXG4gICAgdGhpcy5faXRlbUNsaWNrJCA9IHRoaXMuX2dhbGxlcnlDbXAuZ2FsbGVyeVJlZi5pdGVtQ2xpY2suc3Vic2NyaWJlKChpOiBudW1iZXIpID0+IHRoaXMuX2xpZ2h0Ym94Lm9wZW4oaSwgdGhpcy5fZ2FsbGVyeUlkKSk7XG4gICAgdGhpcy5faXRlbUNoYW5nZSQgPSB0aGlzLl9nYWxsZXJ5Q21wLmdhbGxlcnlSZWYuaXRlbXNDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gZ2FsbGVyeVJlZi5sb2FkKHN0YXRlLml0ZW1zKSk7XG4gIH1cblxuICAvKiogRGV0ZWN0b3IgbW9kZTogbWVhbnMgYGdhbGxlcml6ZWAgZGlyZWN0aXZlIGlzIHVzZWQgb24gYSBub3JtYWwgSFRNTEVsZW1lbnRcbiAgICogIERldGVjdHMgaW1hZ2VzIGFuZCBhZGRzIGEgY2xpY2sgZXZlbnQgdG8gZWFjaCBpbWFnZSBzbyBpdCBvcGVucyBpbiB0aGUgbGlnaHRib3ggKi9cbiAgcHJpdmF0ZSBkZXRlY3Rvck1vZGUoZ2FsbGVyeVJlZjogR2FsbGVyeVJlZikge1xuICAgIHRoaXMuX2RldGVjdG9yJCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgLy8gUXVlcnkgaW1hZ2UgZWxlbWVudHNcbiAgICB0aGlzLl9kZXRlY3RvciQucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcblxuICAgICAgICAvKiogZ2V0IGFsbCBpbWcgZWxlbWVudHMgZnJvbSBjb250ZW50ICovXG4gICAgICAgIGNvbnN0IGltYWdlRWxlbWVudHMgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKGltYWdlRWxlbWVudHMgJiYgaW1hZ2VFbGVtZW50cy5sZW5ndGgpIHtcblxuICAgICAgICAgIGNvbnN0IGltYWdlczogR2FsbGVyeUl0ZW1bXSA9IFtdO1xuXG4gICAgICAgICAgcmV0dXJuIGZyb20oaW1hZ2VFbGVtZW50cykucGlwZShcbiAgICAgICAgICAgIG1hcCgoZWw6IGFueSwgaSkgPT4ge1xuICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgZXZlbnQgdG8gdGhlIGltYWdlXG4gICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwsICdvbmNsaWNrJywgKCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLl9saWdodGJveC5vcGVuKGksIHRoaXMuX2dhbGxlcnlJZCkpXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGVsZW1lbnQgaXMgdHlwZSBvZiBpbWcgdXNlIHRoZSBzcmMgcHJvcGVydHlcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgc3JjOiBlbC5nZXRBdHRyaWJ1dGUoJ2ltYWdlU3JjJykgfHwgZWwuc3JjLFxuICAgICAgICAgICAgICAgICAgdGh1bWI6IGVsLmdldEF0dHJpYnV0ZSgndGh1bWJTcmMnKSB8fCBlbC5zcmNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgdXNlIGVsZW1lbnQgYmFja2dyb3VuZC1pbWFnZSB1cmxcbiAgICAgICAgICAgICAgICBjb25zdCBlbFN0eWxlID0gZWwuY3VycmVudFN0eWxlIHx8IHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBlbFN0eWxlLmJhY2tncm91bmRJbWFnZS5zbGljZSg0LCAtMSkucmVwbGFjZSgvXCIvZywgJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IGVsLmdldEF0dHJpYnV0ZSgnaW1hZ2VTcmMnKSB8fCBiYWNrZ3JvdW5kLFxuICAgICAgICAgICAgICAgICAgdGh1bWI6IGVsLmdldEF0dHJpYnV0ZSgndGh1bWJTcmMnKSB8fCBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoKGRhdGE6IGFueSkgPT4gaW1hZ2VzLnB1c2gobmV3IEltYWdlSXRlbShkYXRhKSkpLFxuICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gZ2FsbGVyeVJlZi5sb2FkKGltYWdlcykpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIE9ic2VydmUgY29udGVudCBjaGFuZ2VzXG4gICAgdGhpcy5fb2JzZXJ2ZXIkID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdGhpcy5fZGV0ZWN0b3IkLm5leHQoKSk7XG4gICAgdGhpcy5fb2JzZXJ2ZXIkLm9ic2VydmUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xuICB9XG59XG4iXX0=