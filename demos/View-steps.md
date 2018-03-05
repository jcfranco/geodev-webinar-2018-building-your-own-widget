# `Bookmarks` Widget: View Steps

Let's create the View for our `Bookmarks` widget. We'll extend `esri/widgets/Widget` and leverage the ViewModel APIs for widget's UI/UX.

#### Open up `Bookmarks.tsx`

#### We'll add some boilerplate to create our widget class

  ```tsx
  /// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
  /// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
  
  import {
    declared,
    subclass
  } from "esri/core/accessorSupport/decorators";
  
  import Widget = require("esri/widgets/Widget");
  
  @subclass("demo.Bookmarks")
  class Bookmarks extends declared(Widget) {
  
  }
  
  export = Bookmarks;         
  ```

#### Add `render` method

```tsx
import { tsx } from "esri/widgets/support/widget";
```

```tsx
const CSS = {
  base: "demo-bookmarks"
};
```

```tsx
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div class={CSS.base}></div>
    );
  }
```

#### Render bookmark item

```tsx
import BookmarkItem = require("./Bookmarks/BookmarkItem");
```

```tsx
const CSS = {
  base: "demo-bookmarks",
  iconClass: "esri-icon-labels",
  bookmarkItem: "demo-bookmarks__item",
  bookmarkItemIcon: "demo-bookmarks__item-icon",
  bookmarkItemName: "demo-bookmarks__item-name",
  bookmarkItemActive: "demo-bookmarks__item--active"
};
```

```tsx
//--------------------------------------------------------------------------
//
//  Private Methods
//
//--------------------------------------------------------------------------

private _renderBookmark(bookmarkItem: BookmarkItem): any {
  const { active, name } = bookmarkItem;

  const bookmarkItemClasses = {
    [CSS.bookmarkItemActive]: active
  };

  return (
    <li bind={this}
        data-bookmark-item={bookmarkItem}
        class={this.classes(CSS.bookmarkItem, bookmarkItemClasses)}>
      <span class={this.classes(CSS.iconClass, CSS.bookmarkItemIcon)} /><span class={CSS.bookmarkItemName}>{name}</span>
    </li>
  );
}
```

### wire up VM to get bookmarks

```tsx
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

import MapView = require("esri/views/MapView");

import BookmarksViewModel = require("./Bookmarks/BookmarksViewModel");
```

```tsx
//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

//----------------------------------
//  view
//----------------------------------

@aliasOf("viewModel.view")
view: MapView = null;

//----------------------------------
//  viewModel
//----------------------------------

@property({
  type: BookmarksViewModel
})
@renderable([
  "state"
])
viewModel: BookmarksViewModel = new BookmarksViewModel();
```

```tsx
private _renderBookmarks(): any {
  const { bookmarkItems } = this.viewModel;

  return bookmarkItems.toArray().map(bookmarkItem => this._renderBookmark(bookmarkItem));
}
```

### Add interactivity

```tsx
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";
```

```tsx
private _renderBookmark(bookmarkItem: BookmarkItem): any {
  const { active, name } = bookmarkItem;

  const bookmarkItemClasses = {
    [CSS.bookmarkItemActive]: active
  };

  return (
    <li bind={this}
        data-bookmark-item={bookmarkItem}
        class={this.classes(CSS.bookmarkItem, bookmarkItemClasses)}
        onclick={this._goToBookmark}
        onkeydown={this._goToBookmark}
        tabIndex={0}>
      <span class={this.classes(CSS.iconClass, CSS.bookmarkItemIcon)} /><span class={CSS.bookmarkItemName}>{name}</span>
    </li>
  );
}
```

```tsx
@accessibleHandler()
private _goToBookmark(event: Event): void {
  const node = event.currentTarget as Element;
  const bookmarkItem = node["data-bookmark-item"] as BookmarkItem;
  this.viewModel.goTo(bookmarkItem);
}
```

### Wire up items to render when updated

```tsx
import HandleRegistry = require("esri/core/HandleRegistry");
import watchUtils = require("esri/core/watchUtils");
```

```tsx
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
    watchUtils.on(this, "viewModel.bookmarkItems", "change", () => this._bookmarkItemsChanged())
  );

  this._bookmarkItemsChanged();
}
```

```tsx
//--------------------------------------------------------------------------
//
//  Variables
//
//--------------------------------------------------------------------------

_handles: HandleRegistry = new HandleRegistry();
```

```tsx
private _bookmarkItemsChanged(): void {
  const itemsKey = "items";
  const { bookmarkItems } = this.viewModel;
  const { _handles } = this;

  _handles.remove(itemsKey);

  const handles = bookmarkItems.map(bookmarkItem => {
    return watchUtils.watch(bookmarkItem, [
      "active",
      "name"
    ], () => this.scheduleRender());
  });

  _handles.add(handles, itemsKey);

  this.scheduleRender();
}
```

### Let's fine tune the UI for a richer experience


#### Add loader

```tsx
render() {
  const loadingNode = (
    <div class={CSS.loading}>
      <span class={CSS.loadingIcon} />
    </div>
  );
  
  const bookmarkNodes = this._renderBookmarks();

  const { state } = this.viewModel;

  const bookmarkListNode = state === "ready" && bookmarkNodes.length ? (
    <ul class={CSS.bookmarkList}>{bookmarkNodes}</ul>
  ) : state === "loading" ?
      loadingNode : 
      null;

  return (
    <div class={CSS.base}>{bookmarkListNode}</div>
  );
}
```

```tsx
const CSS = {
  base: "demo-bookmarks",
  loading: "demo-bookmarks__loading",
  loadingIcon: "esri-icon-loading-indicator esri-rotating",
  iconClass: "esri-icon-labels",
  bookmarkList: "demo-bookmarks__list",
  bookmarkItem: "demo-bookmarks__item",
  bookmarkItemIcon: "demo-bookmarks__item-icon",
  bookmarkItemName: "demo-bookmarks__item-name",
  bookmarkItemActive: "demo-bookmarks__item--active"
};
```

### Add enter animation for items

```tsx
render() {
  const fadeInAnimation = cssTransition("enter", CSS.fadeIn);

  const loadingNode = (
    <div class={CSS.loading}>
      <span class={CSS.loadingIcon} />
    </div>
  );

  const bookmarkNodes = this._renderBookmarks();

  const { state } = this.viewModel;

  const bookmarkListNode = state === "ready" && bookmarkNodes.length ? [
      <ul enterAnimation={fadeInAnimation}
          class={CSS.bookmarkList}
      >{bookmarkNodes}</ul>
    ] :
                           state === "loading" ?
                           loadingNode :
                           null;

  return (
    <div class={CSS.base}>{bookmarkListNode}</div>
  );
}
```

```tsx
import { accessibleHandler, cssTransition, renderable, tsx } from "esri/widgets/support/widget";
```

```tsx
const CSS = {
  base: "demo-bookmarks",
  loading: "demo-bookmarks__loading",
  loadingIcon: "esri-icon-loading-indicator esri-rotating",
  fadeIn: "demo-bookmarks--fade-in",
  iconClass: "esri-icon-labels",
  bookmarkList: "demo-bookmarks__list",
  bookmarkItem: "demo-bookmarks__item",
  bookmarkItemIcon: "demo-bookmarks__item-icon",
  bookmarkItemName: "demo-bookmarks__item-name",
  bookmarkItemActive: "demo-bookmarks__item--active"
};
```

### Let's improve our widget by making it accessible and add support for multiple locales

```tsx
render() {
  const fadeInAnimation = cssTransition("enter", CSS.fadeIn);

  const loadingNode = (
    <div class={CSS.loading}>
      <span class={CSS.loadingIcon} />
    </div>
  );

  const bookmarkNodes = this._renderBookmarks();

  const { state } = this.viewModel;

  const bookmarkListNode = state === "ready" && bookmarkNodes.length ? [
      <ul enterAnimation={fadeInAnimation}
          aria-label={i18n.label}
          class={CSS.bookmarkList}
      >{bookmarkNodes}</ul>
    ] :
                           state === "loading" ?
                           loadingNode :
                           null;

  return (
    <div class={CSS.base}>{bookmarkListNode}</div>
  );
}
```

```tsx
private _renderBookmark(bookmarkItem: BookmarkItem): any {
  const { active, name } = bookmarkItem;

  const bookmarkItemClasses = {
    [CSS.bookmarkItemActive]: active
  };

  return (
    <li bind={this}
        data-bookmark-item={bookmarkItem}
        class={this.classes(CSS.bookmarkItem, bookmarkItemClasses)}
        onclick={this._goToBookmark}
        onkeydown={this._goToBookmark}
        role="button"
        title={i18n.goToBookmark}
        aria-label={name}>
      <span class={this.classes(CSS.iconClass, CSS.bookmarkItemIcon)} /><span class={CSS.bookmarkItemName}>{name}</span>
    </li>
  );
}
```

```tsx
import i18n = require("dojo/i18n!./Bookmarks/nls/Bookmarks");
```

### Finally, let's define our widget's `iconClass` and `label` properties to give hints to other widgets on the icon/label to display

```tsx
//----------------------------------
//  iconClass
//----------------------------------

@property()
iconClass = CSS.iconClass;

//----------------------------------
//  label
//----------------------------------

@property()
label = i18n.label;
```

