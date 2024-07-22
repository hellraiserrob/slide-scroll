/**
 * base library for parallax effects when scrolling
 */

import fastdom from "fastdom";
import InView from "./in-view";
import easings from "./easings";
import { Options } from "./interfaces";

/**
 * css classes
 */
const css = {
  top: "slides--top",
  active: "slides--active",
  slidesBelow: "slides--below",
  slide: "slides__slide",
  slideActive: "slides__slide--active",
  progress: "slides__slide__progress",
};

/**
 * default options
 */
const defaults = {
  easing: "linear",
  slide: css.slide,
  debug: false
}

export default class Slides extends InView {
  el: any;
  els: any;
  vw: number;
  vh: number;
  top: boolean;
  elTop: any;
  height: number;
  total: number;
  portion: number;
  options: Options;

  constructor(ops) {
    super();

    this.options = { ...defaults, ...ops}
    this.el = this.options.el;
    this.els = {
      slides: this.el.querySelectorAll(`.${this.options.slide}`)
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.top = false;

    window.scrollTo(0, 0);
  }

  // kick off function 
  watch() {
    this.checkTop();
    this.setHeight();
    this.reset();
    this.bind();

    // call the scroll event straight away
    this.handleScroll();
  }

  checkTop() {
    this.top = this.el.getBoundingClientRect().top < this.vh;

    if (this.top) {
      this.el.classList.add(css.top);
    }
    else {
      this.el.classList.remove(css.top);
    }
  }

  // set / reset initial values
  reset() {
    this.elTop = this.el.getBoundingClientRect().top;
    this.height = this.el.offsetHeight;
    this.total = this.els.slides.length;
    this.portion = 100 / this.total;
  }

  // for iOS devices
  setHeight() {
    this.el.style = `height: ${this.els.slides.length * 100}vh`
    document.documentElement.style.setProperty("--vh", `${this.vh * 0.01}px`);
  }

  // event bindings
  bind() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, true);
  }

  // handler for the user resizing their browser
  handleResize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vh !== this.vh) {
      this.vw = vw;
      this.vh = vh;

      this.checkTop();
      this.setHeight();
      this.reset();
      this.handleScroll();
    }
  }

  // scolling handler 
  handleScroll() {
    const scrolled = window.scrollY;
    const top = this.el.getBoundingClientRect().top + scrolled;
    const progress = ((scrolled - top + this.vh) / this.height) * 100;
    const offTheBottom = progress > 100;

    if(this.options.debug) {
      console.log(`scrolled ${scrolled}`);
      console.log(`elTop ${this.elTop}`);
      console.log(`top ${top}`);
      console.log(`height ${this.height}`);
      console.log(`progress ${progress}`);
    }

    if (!offTheBottom) {
      this.el.classList.remove(css.slidesBelow);

      // loop through all of the slides
      this.els.slides.forEach((el, index) => {
        const min = index * this.portion;
        const max = min + this.portion;
        const progressEl = el.querySelector(`.${css.progress}`);

        // this particular slide is in the viewport
        if (progress > min && progress <= max) {
          const sectionProgress = (progress - min) * this.total;
          const easing = easings[this.options.easing](sectionProgress / 100);
          
          const slideOffset = this.vh - (easing * this.vh);
          const progressOpacity = easing;
          const progressOffset = 100 - (100 * easing);
          
          fastdom.mutate(() => {
            el.style.opacity = "1";
            el.style.transform = `translate3d(0, ${slideOffset}px, 0)`;

            progressEl.innerHTML = Math.round(sectionProgress);
            progressEl.style.opacity = progressOpacity;
            progressEl.style.transform = `translate3d(0, ${progressOffset}px, 0)`;
          });
        }
        else {
          // slide is not in viewport
          if (progress > max) {
            // we've scrolled passed it
            fastdom.mutate(() => {
              el.style.transform = "translate3d(0, 0, 0)";
              progressEl.innerHTML = "100"
            });
          }
          else {
            // hide slide for performance
            el.style.opacity = "0";
          }
        }
      });
    }
    else {
      // when a user has scrolled all the way past we can set the bottom item to absolute instead of fixed
      this.el.classList.add(css.slidesBelow);
    }
  }
}
