/**
 * entry point showing generic usage
 */

import "./main.scss";

import SlideScroll from "./slide-scroll"
import { Options } from "./interfaces";

const slides = document.querySelectorAll<HTMLElement>(`.slides`);

slides.forEach(el => {
  const options: Options = {
    el
  };
  const c = new SlideScroll(options)

  c.watch();
})
