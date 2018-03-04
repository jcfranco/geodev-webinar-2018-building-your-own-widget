/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");

import Extent = require("esri/geometry/Extent");

@subclass("demo.BookmarkItem")
class BookmarkItem extends declared(Accessor) {

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  active
  //----------------------------------

  @property()
  active = false;

  //----------------------------------
  //  extent
  //----------------------------------

  @property({
    type: Extent
  })
  extent: Extent = null;

  //----------------------------------
  //  name
  //----------------------------------

  @property()
  name: string = null;

}

export = BookmarkItem;