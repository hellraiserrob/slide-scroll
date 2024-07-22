/**
 * entry point showing generic usage
 */

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
    }]
  };
  const slides = new SlideScroll(options)

  slides.watch();
})
