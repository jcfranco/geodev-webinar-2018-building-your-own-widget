# `Bookmarks` Widget: Sass Steps

Here is the Sass for our widget and it demonstrates how we can use Sass to simplify our widget styling.

```scss
// variables
$border: 1px solid rgba(0, 0, 0, 0.4);
$margin: 5px;
$background_color: #fff;

.demo-bookmarks {
  min-width: 250px;
  max-width: 350px;
  background-color: $background_color;
  border: $border;
  line-height: 16px;
  font-size: 14px;

  // nesting

  // reuse parent selector
  // .demo-bookmarks__loading
  &__loading {
    padding: 40px;
    text-align: center;
  }

  &__list {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    padding: 8px 12px;
    border-top: $border;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    &:hover {
      // function (color)
      background-color: darken($background-color, 10%);
    }

    &:first-child {
      border-top: none;
    }

    &-icon {
      margin-right: $margin;
    }

    &-name {
      flex: 1;
    }

    &--active,
    &--active:hover,
    &--active:focus {
      // function (color)
      color: darken($background-color, 80%);
      
      background-color: $background-color;
      cursor: default;
    }

    &--active:after {
      content: "";
      position: absolute;
      height: 2px;
      top: 0;
      // function (color)
      background-color: darken($background-color, 75%);
      
      width: 100%;
      z-index: 2;
      animation: looping-progresss-bar-ani 1500ms linear infinite
    }
  }

  &--fade-in {
    opacity: 0;
    transition: opacity 375ms ease-out;
  }

  &--fade-in-active {
    opacity: 1;
  }

  @keyframes looping-progresss-bar-ani {
    0% {
      left: 0%;
      width: 0%
    }
    20% {
      left: 0%;
      width: 20%
    }
    80% {
      left: 80%;
      width: 20%
    }
    100% {
      left: 100%;
      width: 0%
    }
  }

}

html[dir="rtl"] .demo-bookmarks {
  &__item {

    &--active:after {
      animation: looping-progresss-bar-ani-rtl 1500ms linear infinite
    }

    &-icon {
      margin-right: 0;
      margin-left: $margin;
    }

  }

  @keyframes looping-progresss-bar-ani-rtl {
    0% {
      right: 0%;
      width: 0%
    }
    20% {
      right: 0%;
      width: 20%
    }
    80% {
      right: 80%;
      width: 20%
    }
    100% {
      right: 100%;
      width: 0%
    }
  }
}
```
