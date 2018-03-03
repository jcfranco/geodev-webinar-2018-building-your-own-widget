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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/core/HandleRegistry", "esri/widgets/support/widget", "./Bookmarks/BookmarksViewModel", "dojo/i18n!./Bookmarks/nls/Bookmarks"], function (require, exports, __extends, __decorate, watchUtils, decorators_1, Widget, HandleRegistry, widget_1, BookmarksViewModel, i18n) {
    "use strict";
    var CSS = {
        base: "demo-bookmarks",
        loading: "demo-bookmarks__loading",
        loadingIcon: "esri-icon-loading-indicator esri-rotating",
        fadeIn: "demo-bookmarks--fade-in",
        iconClass: "esri-icon-labels",
        bookmarkList: "demo-bookmarks__list",
        bookmarkItem: "demo-bookmarks__item",
        bookmarkItemIcon: "demo-bookmarks__item-icon",
        bookmarkItemActive: "demo-bookmarks__item--active"
    };
    var Bookmarks = /** @class */ (function (_super) {
        __extends(Bookmarks, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function Bookmarks(params) {
            var _this = _super.call(this) || this;
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
            //  iconClass
            //----------------------------------
            _this.iconClass = CSS.iconClass;
            //----------------------------------
            //  label
            //----------------------------------
            _this.label = i18n.label;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new BookmarksViewModel();
            return _this;
        }
        Bookmarks.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.on(this, "viewModel.bookmarkItems", "change", function () { return _this._bookmarkItemsChanged(); }));
            this._bookmarkItemsChanged();
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Bookmarks.prototype.render = function () {
            var fadeInAnimation = widget_1.cssTransition("enter", CSS.fadeIn);
            var loadingNode = (widget_1.tsx("div", { class: CSS.loading },
                widget_1.tsx("span", { class: CSS.loadingIcon })));
            var bookmarkNodes = this._renderBookmarks();
            var state = this.viewModel.state;
            var bookmarkListNode = state === "ready" && bookmarkNodes.length ? [
                widget_1.tsx("ul", { enterAnimation: fadeInAnimation, "aria-label": i18n.label, class: CSS.bookmarkList }, bookmarkNodes)
            ] :
                state === "loading" ?
                    loadingNode :
                    null;
            return (widget_1.tsx("div", { class: CSS.base }, bookmarkListNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Bookmarks.prototype._renderBookmarks = function () {
            var _this = this;
            var bookmarkItems = this.viewModel.bookmarkItems;
            return bookmarkItems.toArray().map(function (bookmarkItem) { return _this._renderBookmark(bookmarkItem); });
        };
        Bookmarks.prototype._renderBookmark = function (bookmarkItem) {
            var active = bookmarkItem.active, name = bookmarkItem.name;
            var bookmarkItemClasses = (_a = {},
                _a[CSS.bookmarkItemActive] = active,
                _a);
            return (widget_1.tsx("li", { bind: this, "data-bookmark-item": bookmarkItem, class: CSS.bookmarkItem, classes: bookmarkItemClasses, onclick: this._goToBookmark, onkeydown: this._goToBookmark, tabIndex: 0, role: "button", title: i18n.goToBookmark, "aria-label": name },
                widget_1.tsx("span", { class: widget_1.join(CSS.iconClass, CSS.bookmarkItemIcon) }),
                " ",
                name));
            var _a;
        };
        Bookmarks.prototype._bookmarkItemsChanged = function () {
            var _this = this;
            var itemsKey = "items";
            var bookmarkItems = this.viewModel.bookmarkItems;
            var _handles = this._handles;
            _handles.remove(itemsKey);
            var handles = bookmarkItems.map(function (bookmarkItem) {
                return watchUtils.watch(bookmarkItem, [
                    "active",
                    "name"
                ], function () { return _this.scheduleRender(); });
            });
            _handles.add(handles, itemsKey);
            this.scheduleRender();
        };
        Bookmarks.prototype._goToBookmark = function (event) {
            var node = event.currentTarget;
            var bookmarkItem = node["data-bookmark-item"];
            this.viewModel.goTo(bookmarkItem);
        };
        __decorate([
            decorators_1.property()
        ], Bookmarks.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Bookmarks.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Bookmarks.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: BookmarksViewModel
            }),
            widget_1.renderable([
                "state"
            ])
        ], Bookmarks.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Bookmarks.prototype, "_goToBookmark", null);
        Bookmarks = __decorate([
            decorators_1.subclass("demo.Bookmarks")
        ], Bookmarks);
        return Bookmarks;
    }(decorators_1.declared(Widget)));
    return Bookmarks;
});
//# sourceMappingURL=Bookmarks.js.map