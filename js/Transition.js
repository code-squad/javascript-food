/*
  USE TRANSITION ANIMATION
*/

class MainBannerSlider {
  constructor(model) {
    this.model = model;

    this.btnRight = null;
    this.btnLeft = null;
    this.currentShowingBannerIdx = 1;

    this.leftClickEventMode = {
      'mode': 'LEFT',
      'changeMode': 'DECREASE',
      'removeClassName': 'opacity-show-active',
      'addClassName': 'opacity-show-active',
    };
    this.rightClickEventMode = {
      'mode': 'RIGHT',
      'changeMode': 'INCREASE',
      'removeClassName': 'opacity-show-active',
      'addClassName': 'opacity-show-active',
    };
  }

  run() {
    this.findButton();
    this.addEvent();
  }

  findButton() {
    this.btnLeft = document.querySelector(".slide_prev");
    this.btnRight = document.querySelector(".slide_next");
  }

  addEvent() {
    this.btnLeft.addEventListener('click', () => {
      this.changeBannerEventListener(this.leftClickEventMode);
    }, false);
    this.btnRight.addEventListener('click', () => {
      this.changeBannerEventListener(this.rightClickEventMode);
    }, false);
  }

  changeBannerEventListener(obj) {
    if (!this.checkPossibleRange(obj.mode, this.currentShowingBannerIdx)) return;
    this.actionBannerAnimation("REMOVE", obj.removeClassName);
    this.currentShowingBannerIdx += this.changeCurrentShowingIdx(obj.changeMode);
    this.model.setMainBannerIdx(this.currentShowingBannerIdx);
    this.actionBannerAnimation("ADD", obj.addClassName);
  }

  actionBannerAnimation(mode, className) {
    const element = this.getCurrentBannerElement(this.currentShowingBannerIdx);
    this.modifyElementClassList(element, mode, className);
  }

  changeCurrentShowingIdx(mode) {
    const run = {
      INCREASE() { return 1; },
      DECREASE() { return -1; },
    };
    return run[mode]();
  }

  getCurrentBannerElement(idx) {
    const className = `.banner-0${idx}`;
    const element = document.querySelector(className);
    return element;
  }

  modifyElementClassList(element, mode, className) {
    const run = {
      ADD() { element.classList.add(className); },
      REMOVE() { element.classList.remove(className); }
    };
    run[mode]();
  }

  checkPossibleRange(mode, data) {
    const first = 1;
    const last = document.querySelectorAll(".banner-common-property").length;

    if (mode === "LEFT" && data === first) return false;
    if (mode === "RIGHT" && data === last) return false;

    return true;
  }
}

export { MainBannerSlider };