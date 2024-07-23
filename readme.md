[![Slide scroll banner](./.github/assets/banner.svg)](https://hellraiserrob.github.io/slide-scroll)

# Slide scroll

A library that modifies element properties as you scroll to achieve parallax motion

[Demo](https://hellraiserrob.github.io/slide-scroll/)

## Features

- Vanilla Typescript
- Light & Responsive
- Use in your projects or as learning material


## Options

|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| el    | The slides elements  | HTMLElement |
| easing?    | The easing function (see easing.js)  | String |
| debug?    | Log out some values  | boolean |
| modifiers?    | See Modifier type below  | Modifier[] |

### Modifier

|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| selector    | The css selector for the element to modify   | String |
| property?    | The css property to modify (e.g. width)  | String |
| start?    | The starting property  | Number |
| end?    | The destination property value  | Number |
| unit?    | The property unit (e.g. px, %)  | String |
| callback?    | A callback function which receives two parameters, the html element, and the progress through the active slide | Function |



### Usage

e.g.

```javascript
import "./main.scss";

import SlideScroll from "./slide-scroll"
import { Options } from "./interfaces";

const slides = document.querySelectorAll<HTMLElement>(`.slides`);

slides.forEach(el => {
  const options: Options = {
    el,
    easing: "easeInOutCubic",
    modifiers: [{
      selector: ".line",
      property: "width",
      start: 0,
      end: 100,
      unit: "%"
    }, {
      selector: ".box",
      property: "height",
      start: 0,
      end: 100,
      unit: "%"
    }, {
      selector: ".progress",
      callback: function(el, progress) {
        el.innerHTML = `${Math.ceil(progress)}%`
      }
    }]
  };
  const slides = new SlideScroll(options)

  slides.watch();
})

```
