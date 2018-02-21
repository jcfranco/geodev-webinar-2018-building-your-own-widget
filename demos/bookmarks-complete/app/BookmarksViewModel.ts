/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import watchUtils = require("esri/core/watchUtils");

import Map = require("esri/Map");

import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import Collection = require("esri/core/Collection");

import BookmarkItem = require("./BookmarkItem");

const BookmarkItemCollection = Collection.ofType<BookmarkItem>(BookmarkItem);

@subclass("demo.BookmarksViewModel")
class BookmarksViewModel extends declared(Accessor) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  initialize() {
    // this._handles.push(
    //   watchUtils.init(this, "view", view => this._viewChange(view)),
    //   watchUtils.init(this, "layer", (newLayer, oldLayer) => this._layerChange(newLayer, oldLayer)),
    //   watchUtils.init(this, "enabled", enabled => this._enabledChange(enabled))
    // );
  }


  destroy() {
    //this._handles.destroy();
    //this._handles = null;
    this.view = null;
    this.bookmarkItems.removeAll();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @property({
    type: BookmarkItemCollection
  })
  bookmarkItems: Collection<BookmarkItem> = new BookmarkItemCollection;

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView | SceneView = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

}

export = BookmarksViewModel;