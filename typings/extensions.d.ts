/// <reference path="../node_modules/dojo-typings/dojo/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dojox/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dijit/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dojo/1.11/loader.d.ts" />

declare module "esri/widgets/BasemapGallery/support/BasemapGalleryItem" {
  import BasemapGalleryItem = __esri.widgets.BasemapGallery.support.BasemapGalleryItem;
  export = BasemapGalleryItem;
}

declare namespace __esri {

  namespace widgets {

    namespace BasemapGallery {

      namespace support {

        export interface BasemapGalleryItem extends Accessor {
          basemap: Basemap;
          state: "error" | "loading" | "ready";
        }

      }

    }

  }

}
