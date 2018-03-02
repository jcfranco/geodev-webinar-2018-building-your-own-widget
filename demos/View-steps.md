# `Bookmarks` Widget: View Steps

Let's the UI aspect for our widget.a ViewModel for our Magnifier widget. The ViewModel will extend `esri/core/Accessor` and be the brains of the widget.

#### Open up `Bookmarks.tsx`

#### We'll add some boilerplate to create our widget class

  ```tsx
  /// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
  /// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
  
  import {
    declared,
    property,
    subclass
  } from "esri/core/accessorSupport/decorators";
  
  import Widget = require("esri/core/Accessor");
  
  @subclass("demo.Bookmarks")
  class Bookmarks extends declared(Widget) {
  
  }
  
  export = Bookmarks;         
  ```

## To be continued...
