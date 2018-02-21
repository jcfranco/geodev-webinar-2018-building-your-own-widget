/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import watchUtils = require("esri/core/watchUtils");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import BookmarksViewModel = require("./BookmarksViewModel");

import View = require("esri/views/View");

const CSS = {
  base: "esri-bookmarks",
};

@subclass("demo.Bookmarks")
class Bookmarks extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: any) {
    super();
  }

  postInitialize() {
    // this.own(
    //   watchUtils.on(this, "viewModel.items", "change", () => this.scheduleRender())
    // );
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

  @aliasOf("viewModel.view")
  view: View = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property({
    type: BookmarksViewModel
  })
  @renderable([
    //"state",
    //"view.size"
  ])
  viewModel: BookmarksViewModel = new BookmarksViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div>

      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // private _renderItem(item: __esri.AttributionItem) {
  //   const { text, layers } = item;

  //   const layerNodes = layers.map(layer => {
  //     return (
  //       <td><a href={layer.url} target="_blank">{layer.title}</a></td>
  //     );
  //   });

  //   return (
  //     <tr key={item}>
  //       {layerNodes}
  //       <td rowspan={layers.length}>{text}</td>
  //     </tr>
  //   );
  // }

  // private _renderItems(): any {
  //   const { items } = this.viewModel;
  //   return (items as any).toArray().map((item: __esri.AttributionItem) => this._renderItem(item));
  // }

}

export = Bookmarks;
