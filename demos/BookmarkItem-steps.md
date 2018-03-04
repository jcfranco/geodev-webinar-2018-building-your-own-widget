# `Bookmarks` Widget: BookmarkItem Steps

We'll create a BookmarkItem class for our `Bookmarks` widget. This class will extend `esri/core/Accessor` and be a simple class to make bookmark properties watchable.

### 1. Open up the empty BookmarkItem file

### 2. Put in a very basic class that extends Accessor

This class will assist the ViewModel by making each bookmark entry an Accessor with watchable properties and adds an `active` property for when the bookmark is being navigated to.

```ts
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
```

## Next steps

Next, we'll need to [setup the BookmarksViewModel](ViewModel-steps.md).
