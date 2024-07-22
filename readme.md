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
| easing    | The easing function (see easing.js)  | String |
| debug    | Log out some values  | boolean |
| modifiers    | See Modifier type below  | Modifier[] |

### Modifier

|             | Description | Type    | 
| ----------- | ----------- | ------- | 
| selector    | The css selector for the element to modify   | String |
| property    | The css property to modify (e.g. width)  | String |
| start    | The starting property  | number |
| end    | The destination property value  | number |
| unit    | The property unit (e.g. px, %)  | String |




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
