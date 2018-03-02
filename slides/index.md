<!-- .slide: data-background="img/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Developing Your Own Widget with the ArcGIS API for JavaScript

### Matt Driscoll – [@driskull](https://twitter.com/driskull)
### JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Widgets
- Widget Framework
- Theming
- Putting it all together

---

# Widgets

---

# About

- What?                                         <!-- .element: class="fragment" data-fragment-index="1" -->
  - Encapsulated UI components                  <!-- .element: class="fragment" data-fragment-index="2" -->
  - Cohesive (integrated, unified)              <!-- .element: class="fragment" data-fragment-index="3" -->
  - Single-purpose pieces of functionality      <!-- .element: class="fragment" data-fragment-index="4" -->
- Why?                                          <!-- .element: class="fragment" data-fragment-index="5" -->
  - Reusable                                    <!-- .element: class="fragment" data-fragment-index="6" -->
  - Interchangeable                             <!-- .element: class="fragment" data-fragment-index="7" -->
- How?                                          <!-- .element: class="fragment" data-fragment-index="8" -->
  - Different frameworks are available          <!-- .element: class="fragment" data-fragment-index="9" -->

---

<!-- Presenter: JC -->

# Widget Framework

---

# Architecture

- Views + ViewModels         <!-- .element: class="fragment" data-fragment-index="1" -->
 - Separation of concerns    <!-- .element: class="fragment" data-fragment-index="2" -->
 - Reusable                  <!-- .element: class="fragment" data-fragment-index="3" -->
   - UI replacement            <!-- .element: class="fragment" data-fragment-index="4" -->
   - Easier integration     <!-- .element: class="fragment" data-fragment-index="5" -->
- Built with TypeScript     <!-- .element: class="fragment" data-fragment-index="6" -->

---

# Views

- <!-- .element: class="fragment" data-fragment-index="1" --> Extend `esri/widgets/Widget`
- Rely on ViewModel                 <!-- .element: class="fragment" data-fragment-index="2" -->
- Focus on UI                       <!-- .element: class="fragment" data-fragment-index="3" -->

---

# ViewModels

<!-- front-loaded to fade entire fragment -->
- <!-- .element: class="fragment" data-fragment-index="1" --> Extend `esri/core/Accessor`
- Provide APIs to support view                    <!-- .element: class="fragment" data-fragment-index="2" -->
- Focus on business logic                    <!-- .element: class="fragment" data-fragment-index="3" -->

---

# View + ViewModel in action

* View renders its state                          <!-- .element: class="fragment" data-fragment-index="1" -->
  * state = view + ViewModel props                <!-- .element: class="fragment" data-fragment-index="2" -->
* View calls VMs APIs                             <!-- .element: class="fragment" data-fragment-index="3" -->
  * causes a change (e.g., property or result)    <!-- .element: class="fragment" data-fragment-index="4" -->
* View updates                                    <!-- .element: class="fragment" data-fragment-index="5" -->

---

# `esri/widgets/Widget`

- Lifecycle         <!-- .element: class="fragment" data-fragment-index="1" -->
- API consistency    <!-- .element: class="fragment" data-fragment-index="2" -->
  - Unified object constructor          <!-- .element: class="fragment" data-fragment-index="3" -->
  - Properties                          <!-- .element: class="fragment" data-fragment-index="4" -->
  - Watching                            <!-- .element: class="fragment" data-fragment-index="5" -->

---

# Lifecycle

- constructor         <!-- .element: class="fragment" data-fragment-index="1" -->
- postInitialize      <!-- .element: class="fragment" data-fragment-index="2" -->
- render              <!-- .element: class="fragment" data-fragment-index="3" -->
- destroy             <!-- .element: class="fragment" data-fragment-index="8" -->

---

# `render`

- Defines UI                <!-- .element: class="fragment" data-fragment-index="1" -->
- Reacts to state           <!-- .element: class="fragment" data-fragment-index="2" -->
- Uses JSX                  <!-- .element: class="fragment" data-fragment-index="3" -->
- VDOM                      <!-- .element: class="fragment" data-fragment-index="4" -->

---

# VDOM

* DOM abstraction                                                                 <!-- .element: class="fragment" data-fragment-index="1" -->
  * single entry point for rendering                                              <!-- .element: class="fragment" data-fragment-index="2" -->
  * other part of VDOM system decides whether DOM was affected by diffing         <!-- .element: class="fragment" data-fragment-index="3" -->
  * only true changes cause DOM updates                                           <!-- .element: class="fragment" data-fragment-index="4" -->

---

# VDOM

* Key components                                                                                        <!-- .element: class="fragment" data-fragment-index="1" -->
  * projector - attaches to the DOM, does diffing and updates DOM when necessary                        <!-- .element: class="fragment" data-fragment-index="2" -->
  * vnode trees - virtual representation of the DOM between renders                                     <!-- .element: class="fragment" data-fragment-index="3" -->
  * in 4x each widget can be a projector                                                                <!-- .element: class="fragment" data-fragment-index="4" -->
    * <!-- .element: class="fragment" data-fragment-index="5" --> when given a `container` property
  * but doesn't have to act as one                                                                      <!-- .element: class="fragment" data-fragment-index="6" -->
    * <!-- .element: class="fragment" data-fragment-index="7" --> Using `render` produces a VNode for that widget that can be used in another widget's rendering

---

# Implementing

##  Widget decorators

- @subclass + declared      <!-- .element: class="fragment" data-fragment-index="1" -->
- @property                 <!-- .element: class="fragment" data-fragment-index="2" -->
  - autocast                <!-- .element: class="fragment" data-fragment-index="3" -->
  - computed                <!-- .element: class="fragment" data-fragment-index="4" -->
  - read-only               <!-- .element: class="fragment" data-fragment-index="5" -->
  - aliased                 <!-- .element: class="fragment" data-fragment-index="6" -->
- @aliasOf                  <!-- .element: class="fragment" data-fragment-index="7" -->
- @renderable               <!-- .element: class="fragment" data-fragment-index="8" -->
- @accessibleHandler        <!-- .element: class="fragment" data-fragment-index="9" -->

---

# Implementing

- <!-- .element: class="fragment" data-fragment-index="1" --> Extend `esri/widgets/Widget`

```js
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

@subclass("MyWidget")
class MyWidget extends declared(Widget) {
   
}

export = MyWidget;
```
<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Implementing

- <!-- .element: class="fragment" data-fragment-index="1" --> Implement `render`

```js
// ...
class MyWidget extends declared(Widget) {
  render() {
    return (
      <div>I'm a widget</div>
    );
  }
}
// ...
```
<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Implementing

- <!-- .element: class="fragment" data-fragment-index="1" --> Define properties

```js
// ...
  @property()
  @renderable()
  name: string = "I'm a widget";
  
  render() {
    return (
      <div>{this.name}</div>
    );
  }
// ...
```
<!-- .element: class="fragment" data-fragment-index="1" -->

---

<!-- Presenter: Matt -->

# Let's build a widget!

[Bookmarks](../demos/bookmarks-complete)

<img src="img/bookmarks.png" width="50%"/>

---

# Let's build a widget!

- [Demo Start](../demos/bookmarks-start/)
- [HTML Steps](https://github.com/jcfranco/dev-summit-2018-developing-your-own-widget/blob/master/demos/HTML-steps.md)
- [ViewModel Steps](https://github.com/jcfranco/dev-summit-2018-developing-your-own-widget/blob/master/demos/ViewModel-steps.md)
<!-- Presenter: JC -->
- [View Steps](https://github.com/jcfranco/dev-summit-2018-developing-your-own-widget/blob/master/demos/View-steps.md)
- [Sass Steps](https://github.com/jcfranco/dev-summit-2018-developing-your-own-widget/blob/master/demos/Sass-steps.md)

---

# Recap

- Views + ViewModels <!-- .element: class="fragment" data-fragment-index="1" -->
- <!-- .element: class="fragment" data-fragment-index="2" --> `esri/widgets/Widget`
- TypeScript     <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Widget Theming

---

# About

- Why?                  <!-- .element: class="fragment" data-fragment-index="1" -->
  - Consistency         <!-- .element: class="fragment" data-fragment-index="2" -->
    - Visual            <!-- .element: class="fragment" data-fragment-index="3" -->
    - Functional        <!-- .element: class="fragment" data-fragment-index="3" -->
  - User options        <!-- .element: class="fragment" data-fragment-index="4" -->
    - Out-of-the-box    <!-- .element: class="fragment" data-fragment-index="5" -->
    - Custom            <!-- .element: class="fragment" data-fragment-index="6" -->
- How?                  <!-- .element: class="fragment" data-fragment-index="7" -->
  - Sass                <!-- .element: class="fragment" data-fragment-index="8" -->
  - BEM                 <!-- .element: class="fragment" data-fragment-index="9" -->

---

# Out-of-the-box themes

[Theme Switcher](../demos/themes/)

<img src="images/theme-switcher.png" width="50%"/>

---

# Theming with Sass

- CSS preprocessor                  <!-- .element: class="fragment" data-fragment-index="1" -->
- Powered-up CSS                     <!-- .element: class="fragment" data-fragment-index="2" -->
  - Nesting                          <!-- .element: class="fragment" data-fragment-index="3" -->
  - Variables                         <!-- .element: class="fragment" data-fragment-index="4" -->
  - Functions                         <!-- .element: class="fragment" data-fragment-index="5" -->
  - Mixins                            <!-- .element: class="fragment" data-fragment-index="6" -->
  - Inheritance                       <!-- .element: class="fragment" data-fragment-index="7" -->

---

# Sass makes it easier to...

- Restyle                            <!-- .element: class="fragment" data-fragment-index="1" -->
- Organize                           <!-- .element: class="fragment" data-fragment-index="3" -->
- Write less code :)                 <!-- .element: class="fragment" data-fragment-index="4" -->

---

# Naming CSS classes: [BEM](http://getbem.com/)

#### Block Element Modifier

- Semantic                      <!-- .element: class="fragment" data-fragment-index="1" -->
- Low specificity               <!-- .element: class="fragment" data-fragment-index="2" -->
- Scopes styles to blocks       <!-- .element: class="fragment" data-fragment-index="3" -->

```scss
// block
.example-widget {}

// block__element
.example-widget__input {}

// block--modifier
.example-widget--loading {}

// block__element--modifier
.example-widget__input--disabled {}
```
<!-- .element: class="fragment" data-fragment-index="4" -->

---

# Recap

- Consistency              <!-- .element: class="fragment" data-fragment-index="1" -->
- User options             <!-- .element: class="fragment" data-fragment-index="2" -->
- Authoring                <!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- Presenter: Matt -->

# Let's Recap

- Widgets are single functionality UI components
- We use them for reusability/interchangeability
- Widget Framework
- Constructing a widget
  - ViewModels
  - Views
- Widget Themes
  - SASS

---

## Suggested Session

- [ArcGIS API for JavaScript: Customizing Widgets](https://devsummit2018.schedule.esri.com/schedule/1073688966)

---

## Additional Resources

- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JS API SDK](https://developers.arcgis.com/javascript/)

---

# Use the source, Luke

## [esriurl.com/buildwidgetsds2018](http://esriurl.com/buildwidgetsds2018)

---

# Questions?

---

<!-- .slide: data-background="img/bg-final.jpg" -->

# Thank you!

---


