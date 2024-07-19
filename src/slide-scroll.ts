import fastdom from "fastdom";
import InView from "./in-view";
import easings from "./easings";

const css = {
  top: "slides--top",
  active: "slides--active",
  slidesBelow: "slides--below",
  slide: "slides__slide",
  slideActive: "slides__slide--active",
  progress: "slides__slide__progress",
};


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
  active: HTMLElement | null;

  constructor(ops) {
    super();

    this.el = ops.el;
    this.els = {
      slides: this.el.querySelectorAll(`.${css.slide}`)
    };

    this.scrollHandler = this.scrollHandler.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.top = false;

    window.scrollTo(0, 0);

    if (this.top) {
      this.el.classList.add(css.top);
    }
  }

  reset() {
    this.elTop = this.el.getBoundingClientRect().top;
    this.height = this.el.offsetHeight;
    this.total = this.els.slides.length;
    this.portion = 100 / this.total;
    this.active = null;
  }

  handleResize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vh !== this.vh) {
      this.vw = vw;
      this.vh = vh;

      this.setHeight();
      this.reset();
      this.scrollHandler();
    }
  }

  setHeight() {
    document.documentElement.style.setProperty('--vh', `${this.vh * 0.01}px`);
  }

  watch() {
    this.setHeight();
    this.reset();
    this.unbind();
    this.bind();

    // call the scroll event straight away
    this.scrollHandler();
  }

  bind() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.scrollHandler, true);
  }

  unbind() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.scrollHandler, true);
  }

  scrollHandler() {
    const scrolled = window.scrollY;
    const top = this.el.getBoundingClientRect().top + scrolled;
    const progress = ((scrolled - top + this.vh) / this.height) * 100;
    const offTheBottom = progress > 100;

    if (!offTheBottom) {
      this.el.classList.remove(css.slidesBelow);

      this.els.slides.forEach((el, index) => {
        const min = index * this.portion;
        const max = min + this.portion;
        const progressEl = el.querySelector(`.${css.progress}`);

        if (progress > min && progress <= max) {
          const sectionProgress = (progress - min) * this.total;
          const easing = easings.linear(sectionProgress / 100);
          const slideOffset = this.vh - (easing * this.vh);
          
          progressEl.innerHTML = Math.round(sectionProgress);
          el.style.opacity = '1';
          
          // the first slide is always at the top for now
          if (index === 0 && this.top) {
            fastdom.mutate(() => {
              el.style.transform = `translate3d(0, ${this.elTop}, 0)`;
            });
          }
          else {
            fastdom.mutate(() => {
              el.style.transform = `translate3d(0, ${slideOffset}px, 0)`;
            });
          }

          this.active = el;
        }
        else {
          if (progress > max) {
            // we've scrolled passed it
            fastdom.mutate(() => {
              el.style.transform = "translate3d(0, 0, 0)";
              progressEl.innerHTML = "100"
            });
          }
          else {
            el.style.opacity = "0";
          }
        }
      });
    }
    else {
      this.el.classList.add(css.slidesBelow);
    }
  }
}
