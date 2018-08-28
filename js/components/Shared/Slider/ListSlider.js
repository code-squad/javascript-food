import { qs, $on } from "../../../helper/helper.js";
import { cardTemplate, slidEButtonTemplate, padTemplate } from "./template/template.js";
import animations from "../../../helper/animation/raf.js";

export default class ListSlider {
  constructor({ slideSelector, dataHelper, url, cacheHelper, initPosition = -980, listItemCounts = 4 }) {
    this.slideEl = qs(slideSelector);
    this.url = url;
    this.dataHelper = dataHelper;
    this.maxIdx = null;
    this.slideButtonList = null;
    this.currentIdx = 0;
    this.padElCounts = 0;
    this.initPosition = initPosition;
    this.position = this.initPosition;
    this.listItemCounts = listItemCounts;
    this.cacheHelper = cacheHelper;
  }
  bindGetData(getDataHandler) {
    const listSlideData = getDataHandler(this.slideEl.id, {
      url: this.url,
      successCallback: this.getData.bind(this),
      method: "GET",
    });
    listSlideData && this.renderSlides(listSlideData.data);
  }
  setMaxIdx(length) {
    return (this.maxIdx = Math.ceil(length / this.listItemCounts) - 1);
  }
  getData(data) {
    this.renderSlides(data);
    this.notifyGetData(this.slideEl.id, data);
  }
  makeEdgeData(slideData) {
    let padSlide = "";
    if (this.padElCounts !== 0) {
      const padArr = [...new Array(this.padElCounts)];
      padSlide = padTemplate(padArr);
    }
    const firstSlide = padSlide + cardTemplate(slideData.slice(0, this.listItemCounts));
    const lastSlide = cardTemplate(slideData.slice(-this.listItemCounts + this.padElCounts)) + padSlide;

    this.slideEl.insertAdjacentHTML("beforeend", firstSlide);
    this.slideEl.insertAdjacentHTML("afterbegin", lastSlide);
  }
  setPadCounts(length) {
    const restSlides = length % this.listItemCounts;
    if (restSlides === 0) return (this.padElCounts = 0);
    else return (this.padElCounts = this.listItemCounts - restSlides);
  }
  renderSlides(slideData) {
    const slidesCounts = slideData.length;
    this.setMaxIdx(slidesCounts);
    this.renderRealSlideData(slideData);
    this.amendFakeEdgeData(slidesCounts, slideData);
    this.renderButtons();
    this.setTransformX();
    this.bindEvents();
  }
  renderRealSlideData(slideData) {
    this.slideEl.innerHTML = cardTemplate(slideData);
  }
  setTransformX() {
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
  }
  amendFakeEdgeData(slidesCounts, slideData) {
    this.setPadCounts(slidesCounts);
    this.makeEdgeData(slideData);
  }
  bindEvents() {
    this.slideButtonList = this.slideEl.parentElement.nextElementSibling;
    $on(qs(".right-button", this.slideButtonList), "click", e => this.handleButtonClicked(e));
    $on(qs(".left-button", this.slideButtonList), "click", e => this.handleButtonClicked(e));
    $on(this.slideEl, "transitionend", () => this.handleEdgeSlide());
  }
  setPosition(idx) {
    return (this.position = this.initPosition + idx * this.initPosition);
  }
  setCurrentIdx(idx) {
    return (this.currentIdx = idx);
  }
  isEdgeSlide() {
    return !!(this.currentIdx === -1 || this.currentIdx === this.maxIdx + 1);
  }
  renderButtons() {
    this.slideEl.parentElement.insertAdjacentHTML("afterend", slidEButtonTemplate);
  }
  handleEdgeSlide() {
    this.setDisableButton("remove");
    if (!this.isEdgeSlide()) return;
    this.slideEl.style.transitionDuration = "0s";
    const idx = this.currentIdx === -1 ? this.maxIdx : 0;
    this.setCurrentIdx(idx);
    this.setTransformX();
  }
  setDisableButton(type) {
    const leftBtn = qs(".left-button", this.slideButtonList);
    const rightBtn = qs(".right-button", this.slideButtonList);
    leftBtn.classList[type]("disable-btn");
    rightBtn.classList[type]("disable-btn");
  }
  setDisableButton(type) {
    const leftBtn = qs(".left-button", this.slideButtonList);
    const rightBtn = qs(".right-button", this.slideButtonList);
    leftBtn.classList[type]("disable-btn");
    rightBtn.classList[type]("disable-btn");
  }
  handleButtonClicked({ target }) {
    this.setDisableButton("add");
    const nextIdx = target.dataset.id === "left" ? this.currentIdx - 1 : this.currentIdx + 1;
    this.slideEl.style.transitionDuration = "0.5s";
    this.setCurrentIdx(nextIdx);
    this.setTransformX();
  }
}
