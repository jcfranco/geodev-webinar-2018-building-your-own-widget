# `Bookmarks` Widget: HTML Steps

### 1. Add a stylesheet for our `Bookmarks` widget.

```html
<link rel="stylesheet" href="app/css/Bookmarks.css">
```

### 2. Setup Dojo Config for custom package.

```html
<script>
  var href = location.href;
  var demoLocation = href.slice(0, href.lastIndexOf("/"));
  var dojoConfig = {
    async: true,
    //locale: "es",
    packages: [{
      name: "demo",
      location: demoLocation + "/app"
    }]
  };

</script>
```

### 3. Require our `Bookmarks` and `Expand` widgets, along with our other dependencies.

```js
"esri/widgets/Expand",
"demo/Bookmarks",
```

### 4. Initialize `Bookmarks`

```js
var bookmarks = new Bookmarks({
  view: view
});
```

### 5. Add `Bookmarks` instance to the Expand widget and place in the view UI

```js
var expand = new Expand({
  view: view,
  content: bookmarks
});

view.ui.add(expand, "top-right");
```

## Next steps

Next, we'll need to [setup a support class BookmarkItem](BookmarkItem-steps.md).
