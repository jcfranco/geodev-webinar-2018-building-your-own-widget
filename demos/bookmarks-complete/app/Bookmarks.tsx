/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import watchUtils = require("esri/core/watchUtils");
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import AttributionViewModel = require("esri/widgets/Attribution/AttributionViewModel");

import View = require("esri/views/View");

const CSS = {
  base: "esri-custom-attribution esri-widget",
};

@subclass("esri.widgets.Attribution")
class Attribution extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: any) {
    super();
  }

  postInitialize() {
    this.own(
      watchUtils.on(this, "viewModel.items", "change", () => this.scheduleRender())
    );
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
    type: AttributionViewModel
  })
  @renderable([
    "state",
    "view.size"
  ])
  viewModel: AttributionViewModel = new AttributionViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div
        class={CSS.base}>
        <table>
          <tr>
            <th>Layer</th>
            <th>Source(s)</th>
          </tr>
          {this._renderItems()}
        </table>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _renderItem(item: __esri.AttributionItem) {
    const { text, layers } = item;

    const layerNodes = layers.map(layer => {
      return (
        <td><a href={layer.url} target="_blank">{layer.title}</a></td>
      );
    });

    return (
      <tr key={item}>
        {layerNodes}
        <td rowspan={layers.length}>{text}</td>
      </tr>
    );
  }

  private _renderItems(): any {
    const { items } = this.viewModel;
    return (items as any).toArray().map((item: __esri.AttributionItem) => this._renderItem(item));
  }

}

export = Attribution;
