/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");

import Map = require("esri/Map");

import MapView = require("esri/views/MapView");

import Extent = require("esri/geometry/Extent");

import Collection = require("esri/core/Collection");

import BookmarkItem = require("./BookmarkItem");

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
    this._viewHandle = watchUtils.init(this, "view", view => this._viewUpdated(view))
  }

  destroy() {
    this._viewHandle && this._viewHandle.remove();
    this._viewHandle = null;
    this._mapHandle && this._mapHandle.remove();
    this._mapHandle = null;
    this.view = null;
    this.bookmarkItems.removeAll();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  _viewHandle: IHandle = null;
  _mapHandle: IHandle = null;

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
      return promiseUtils.reject();
    }

    if (!view) {
      return promiseUtils.reject();
    }

    const goTo = view.goTo(bookmarkItem.extent);

    bookmarkItem.active = true;

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
    if (!view) {
      return;
    }

    const { _mapHandle } = this;

    if (_mapHandle) {
      _mapHandle.remove();
    }

    view.when(() => {
      this._mapHandle = watchUtils.init(view, "map", map => this._mapUpdated(map))
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