/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/HandleRegistry", "esri/core/promiseUtils", "esri/core/watchUtils", "esri/core/Collection", "./BookmarkItem"], function (require, exports, __extends, __decorate, decorators_1, Accessor, HandleRegistry, promiseUtils, watchUtils, Collection, BookmarkItem) {
    "use strict";
    var BookmarkItemCollection = Collection.ofType(BookmarkItem);
    var BookmarksViewModel = /** @class */ (function (_super) {
        __extends(BookmarksViewModel, _super);
        function BookmarksViewModel() {
            //--------------------------------------------------------------------------
            //
            //  Lifecycle
            //
            //--------------------------------------------------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._handles = new HandleRegistry();
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  bookmarkItems
            //----------------------------------
            _this.bookmarkItems = new BookmarkItemCollection;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            return _this;
        }
        BookmarksViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add(watchUtils.init(this, "view", function (view) { return _this._viewUpdated(view); }));
        };
        BookmarksViewModel.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
            this.view = null;
            this.bookmarkItems.removeAll();
        };
        Object.defineProperty(BookmarksViewModel.prototype, "state", {
            //----------------------------------
            //  state
            //----------------------------------
            get: function () {
                var view = this.get("view");
                var ready = this.get("view.ready");
                return ready ? "ready" :
                    view ? "loading" : "disabled";
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        BookmarksViewModel.prototype.goTo = function (bookmarkItem) {
            var view = this.view;
            if (!bookmarkItem) {
                return promiseUtils.reject();
            }
            if (!view) {
                return promiseUtils.reject();
            }
            bookmarkItem.active = true;
            var goTo = view.goTo(bookmarkItem.extent);
            goTo.then(function () {
                bookmarkItem.active = false;
            });
            goTo.otherwise(function () {
                bookmarkItem.active = false;
            });
            return goTo;
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        BookmarksViewModel.prototype._viewUpdated = function (view) {
            var _this = this;
            if (!view) {
                return;
            }
            var _handles = this._handles;
            var mapHandleKey = "map";
            _handles.remove(mapHandleKey);
            view.when(function () {
                _handles.add(watchUtils.init(view, "map", function (map) { return _this._mapUpdated(map); }), mapHandleKey);
            });
        };
        BookmarksViewModel.prototype._mapUpdated = function (map) {
            if (!map) {
                return;
            }
            var bookmarkItems = this.bookmarkItems;
            var bookmarks = map.get("bookmarks");
            bookmarkItems.removeAll();
            bookmarkItems.addMany(bookmarks);
        };
        __decorate([
            decorators_1.property({
                type: BookmarkItemCollection
            })
        ], BookmarksViewModel.prototype, "bookmarkItems", void 0);
        __decorate([
            decorators_1.property({
                dependsOn: ["view.ready"],
                readOnly: true
            })
        ], BookmarksViewModel.prototype, "state", null);
        __decorate([
            decorators_1.property()
        ], BookmarksViewModel.prototype, "view", void 0);
        BookmarksViewModel = __decorate([
            decorators_1.subclass("demo.BookmarksViewModel")
        ], BookmarksViewModel);
        return BookmarksViewModel;
    }(decorators_1.declared(Accessor)));
    return BookmarksViewModel;
});
//# sourceMappingURL=BookmarksViewModel.js.map