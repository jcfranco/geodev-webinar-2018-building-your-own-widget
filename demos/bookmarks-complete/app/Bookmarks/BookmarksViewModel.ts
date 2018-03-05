/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import HandleRegistry = require("esri/core/HandleRegistry");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");

import Extent = require("esri/geometry/Extent");

import Collection = require("esri/core/Collection");
import BookmarkItem = require("./BookmarkItem");

import MapView = require("esri/views/MapView");

import Map = require("esri/Map");

const BookmarkItemCollection = Collection.ofType<BookmarkItem>(BookmarkItem);

type State = "ready" | "loading" | "disabled";

@subclass("demo.BookmarksViewModel")
class BookmarksViewModel extends declared(Accessor) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  initialize() {
    this._handles.add(
      watchUtils.init(this, "view", view => this._viewUpdated(view))
    );
  }

  destroy() {
    this._handles.destroy();
    this._handles = null;
    this.view = null;
    this.bookmarkItems.removeAll();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _handles: HandleRegistry = new HandleRegistry();

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  bookmarkItems
  //----------------------------------

  @property({
    type: BookmarkItemCollection
  })
  bookmarkItems: Collection<BookmarkItem> = new BookmarkItemCollection;

  //----------------------------------
  //  state
  //----------------------------------

  @property({
    dependsOn: ["view.ready"],
    readOnly: true
  })
  get state(): State {
    const view = this.get("view");
    const ready = this.get("view.ready");
    return ready ? "ready" :
      view ? "loading" : "disabled";
  }

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  goTo(bookmarkItem: BookmarkItem): IPromise<any> {
    const { view } = this;

    if (!bookmarkItem) {
      return promiseUtils.reject(new Error("BookmarkItem is required"));
    }

    if (!view) {
      return promiseUtils.reject(new Error("View is required"));
    }

    bookmarkItem.active = true;

    const goTo = view.goTo(bookmarkItem.extent);

    goTo.then(() => {
      bookmarkItem.active = false;
    }).otherwise(() => {
      bookmarkItem.active = false;
    });

    return goTo;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _viewUpdated(view: MapView): void {
    const { _handles } = this;
    const mapHandleKey = "map";

    _handles.remove(mapHandleKey);

    if (!view) {
      return;
    }

    view.when(() => {
      _handles.add(
        watchUtils.init(view, "map", map => this._mapUpdated(map))
        , mapHandleKey);
    });
  }

  private _mapUpdated(map: Map): void {
    if (!map) {
      return;
    }

    const { bookmarkItems } = this;

    const bookmarks = map.get<BookmarkItem[]>("bookmarks");
    bookmarkItems.removeAll();
    bookmarkItems.addMany(bookmarks);
  }

}

export = BookmarksViewModel;