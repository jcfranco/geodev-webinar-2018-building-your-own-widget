# `Bookmarks` Widget: ViewModel Steps

We'll create a ViewModel for our `Bookmarks` widget. The ViewModel will extend `esri/core/Accessor` and be the brains of the widget.

### 1. Open up the empty ViewModel file

### 2. Put in a very basic class that extends Accessor

```ts
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");


@subclass("demo.BookmarksViewModel")
class BookmarksViewModel extends declared(Accessor) {

  

}

export = BookmarksViewModel;
```

### 3. Import Collection and BookmarkItem

Import the BookmarkItem Accessor class that we created and `esri/core/Collection` which we will use to store the bookmark items.

Also create a constant to be used for the Collection of BookmarkItems.

```ts
import Collection = require("esri/core/Collection");
import BookmarkItem = require("./BookmarkItem");

const BookmarkItemCollection = Collection.ofType<BookmarkItem>(BookmarkItem);
```

### 4. Let's add the properties our widget needs

Our widget will need...

- an `esri/core/Collection` of `BookmarkItem`s
- a `state` property for letting the widget view know what is going on. The state will be "ready" when the view is ready, "loading" when the view is loading and "disabled" when there is no view on the ViewModel.
- a `view` property that a user will set a `esri/views/MapView`. We will get the bookmarks from the view's map and populate the `Collection` of `BookmarkItem`s from this.

```ts
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
```

### 5. Create a type for the State property

```ts
  type State = "ready" | "loading" | "disabled";
```

### 6. Import MapView

We need the MapView module for typing our `view` property

```ts
import MapView = require("esri/views/MapView");
```

### ***** Progress report *****

Now our properties are setup.

The next step is to populate the `Collection` of `BookmarkItem`s once the `view` property has been set on the ViewModel. To do that, we're going to need to import a few modules that will help us.

### 7. Import HandleRegistry and watchUtils.

`HandleRegistry` lets us easily group and manage watchers and listeners. We can easly remove a group of event listeners with this class.

`watchUtils` offers various utilities and convenience functions for watching Accessor properties.

```ts
import HandleRegistry = require("esri/core/HandleRegistry");
import watchUtils = require("esri/core/watchUtils");
```

### 8. Create a handles variable

We'll store our handles on this variable.

```ts
  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  _handles: HandleRegistry = new HandleRegistry();
```

### 9. Add Lifecycle methods to our widget

- In our initialize lifecycle method,  we'll want to watch for the view to be changed.
- In our destroy lifecycle method, we'll want to do any necessary cleanup of handles and properties.

```ts
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  initialize() {
    this._handles.add(
      watchUtils.init(this, "view", view => this._viewUpdated(view))
    );
  }

  destroy() {
    this._handles.destroy();
    this._handles = null;
    this.view = null;
    this.bookmarkItems.removeAll();
  }
```

### 10. Create private method for when view is added or changed

```ts
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _viewUpdated(view: MapView): void {
    const { _handles } = this;
    const mapHandleKey = "map";

    _handles.remove(mapHandleKey);

    if (!view) {
      return;
    }

    view.when(() => {
      _handles.add(
        watchUtils.init(view, "map", map => this._mapUpdated(map))
        , mapHandleKey);
    });
  }
```

### 11. Create private method for when map has been added or changed

```ts
  private _mapUpdated(map: Map): void {
    if (!map) {
      return;
    }

    const { bookmarkItems } = this;

    const bookmarks = map.get<BookmarkItem[]>("bookmarks");
    bookmarkItems.removeAll();
    bookmarkItems.addMany(bookmarks);
  }
```

### 12. Import the Map class

We'll need this for typing the `Map`.

```ts
import Map = require("esri/Map");
```

### Progress report

So now once a view has been added to the ViewModel, it will watch the view for its `map` and then get the `map.bookmarks` and create a `Collection` of `BookmarkItem`s.

The next and last thing we need to do is to add a public method that will zoom to a `BookmarkItem`.


### 13. Add public goTo method for going to a bookmark extent

This method will also set the `BookmarkItem`'s `active` property to `true` when the zoom animation is occuring and back to `false` when finished.

```ts
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  goTo(bookmarkItem: BookmarkItem): IPromise<any> {
    const { view } = this;

    if (!bookmarkItem) {
      return promiseUtils.reject(new Error("BookmarkItem is required"));
    }

    if (!view) {
      return promiseUtils.reject(new Error("View is required"));
    }

    bookmarkItem.active = true;

    const goTo = view.goTo(bookmarkItem.extent);

    goTo.then(() => {
      bookmarkItem.active = false;
    }).otherwise(() => {
      bookmarkItem.active = false;
    });

    return goTo;
  }
```

### 14. Import esri/core/promiseUtils

Our `goTo` method returns a promise which is either the view's animation or a promise that resolves with an error.

We'll need to use `esri/core/promiseUtils` to easily return a promise when an error occurs.

```ts
import promiseUtils = require("esri/core/promiseUtils");
```

### Progress report

Now we've assembled our ViewModel and the brains of our widget is finished! We can use this ViewModel to build a View.

## Next steps

Next, we'll need to [setup the View](View-steps.md).
