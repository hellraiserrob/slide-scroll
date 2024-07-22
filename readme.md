[![Slide scroll banner](./.github/assets/banner.svg)](https://hellraiserrob.github.io/slide-scroll)

# Slide scroll

A library that slides things as you scroll.

[Demo](https://hellraiserrob.github.io/slide-scroll/)

## Features

- Vanilla Typescript
- Light & Responsive
- Use in your projects or as learning material


## Options

|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| el    | The slides elements  | HTMLElement |
| grid    | See Grid type below  | Grid[] |
| easing    | The easing function (see easing.js)  | String |
| debug    | Log out some values  | boolean |


### Usage

e.g.

```javascript
import SlideScroll from "./slide-scroll"

const slides = document.querySelectorAll<HTMLElement>(`.slides`);

slides.forEach(el => {
  const options: Options = {
    el,
    easing: "linear"
  };
  const slides = new SlideScroll(options)

  slides.watch();
})

```
