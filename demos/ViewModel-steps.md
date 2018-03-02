# `Bookmarks` Widget: ViewModel Steps

We'll create a ViewModel for our `Bookmarks` widget. The ViewModel will extend `esri/core/Accessor` and be the brains of the widget.

1. Open up the empty ViewModel file

2. Put in a very basic class that extends Accessor

```
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");

@subclass("demo.MagnifierViewModel")
class MagnifierViewModel extends declared(Accessor) {

}

export = MagnifierViewModel;
```

## To be continued...
