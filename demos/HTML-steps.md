# `Bookmarks` Widget: HTML Steps

1. Add a stylesheet for our `Bookmarks` widget.

```html
<link rel="stylesheet" href="app/css/Bookmarks.css">
```

2. Setup Dojo Config for custom package.

```html
<script>
  var href = location.href;
  var demoLocation = href.slice(0, href.lastIndexOf("/"));
  var dojoConfig = {
    async: true,
    packages: [{
      name: "demo",
      location: demoLocation + "/app"
    }]
  };
</script>
```

3. Require our `Bookmarks` and `Expand` widgets, along with our map dependencies.

```js
"esri/WebMap",
"esri/views/MapView",
"esri/widgets/Expand",
"demo/Bookmarks",
```

4. Set up our map

```js
var webmap = new WebMap({
  portalItem: {
    id: "402451b7c31247a6a61d7f3d077139bf"
  }
});

view = new MapView({
  container: "viewDiv",
  map: webmap
});
```

5. Initialize `Bookmarks`

```js
bookmarks = new Bookmarks({
  view: view
});
```

6. Add `Bookmarks` instance to the Expand widget and place in the view UI

```js
var expand = new Expand({
  view: view,
  content: bookmarks
});

view.ui.add(expand, "top-right");
```
