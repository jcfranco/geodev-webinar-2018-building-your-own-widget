# `Bookmarks` Widget: Sass Steps

We'll create the Sass file for our widget. The steps are mostly to demonstrate the different pieces and how BEM can help keep our styles clean and clear.

## Add **block** class

```scss
.demo-bookmarks {
  min-width: 250px;
  max-width: 350px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 16px;
  font-size: 14px;
}
```

## Add **element** classes

**nest under `.demo-bookmarks`**
```scss

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
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    cursor: pointer;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    &:hover {
      background-color: #eee;
    }

    &:first-child {
      border-top: none;
    }

    &-icon {
      margin-right: 5px;
    }

    &-name {
      flex: 1;
    }
  }
  
```

## Add **modifier** classes (including with supporting animations)

**nest under `.demo-bookmarks__item` (`&__item`)**
```scss
    &--active,
    &--active:hover,
    &--active:focus {
      color: #333;
      background-color: #fff;
      cursor: default;
    }

    &--active:after {
      content: "";
      position: absolute;
      height: 2px;
      top: 0;
      background-color: #4c4c4c;
      width: 100%;
      z-index: 2;
      animation: looping-progresss-bar-ani 1500ms linear infinite
    }
```
**nest under `.demo-bookmarks`**
```scss
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
```

## Finally, we'll add some overrides to support RTL

**place after `.demo-bookmarks`**
```scss
html[dir="rtl"] .demo-bookmarks {
  &__item {

    &--active:after {
      animation: looping-progresss-bar-ani-rtl 1500ms linear infinite
    }

    &-icon {
      margin-right: 0;
      margin-left: 5px;
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

## The complete Sass should be:

```scss
.demo-bookmarks {
  min-width: 250px;
  max-width: 350px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 16px;
  font-size: 14px;

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
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    cursor: pointer;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    &:hover {
      background-color: #eee;
    }

    &:first-child {
      border-top: none;
    }

    &-icon {
      margin-right: 5px;
    }

    &-name {
      flex: 1;
    }

    &--active,
    &--active:hover,
    &--active:focus {
      color: #333;
      background-color: #fff;
      cursor: default;
    }

    &--active:after {
      content: "";
      position: absolute;
      height: 2px;
      top: 0;
      background-color: #4c4c4c;
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
      margin-left: 5px;
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

## Compile Sass

```
grunt sass
```
