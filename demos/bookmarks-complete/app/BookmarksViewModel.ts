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

  updateView(): void {

  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _removeViewpointHandle(): void {

  }



  export = BookmarksViewModel;