class MainBannerSlider {
  constructor() {
    this.btnRight = null;
    this.btnLeft = null;
    this.currentShowingBannerIdx = 1;
  }

  run() {
    this.findButton();
    this.addLeftBtnEvent();
    this.addRightBtnEvent();
  }

  findButton() {
    this.btnLeft = document.querySelector(".slide_prev");
    this.btnRight = document.querySelector(".slide_next");
  }

  addLeftBtnEvent() {
    this.btnLeft.addEventListener("click", () => {
      this.actionBannerAnimation("REMOVE", "opacity-show-active");
      this.currentShowingBannerIdx += this.changeCurrentShowingIdx("DECREASE");
      this.actionBannerAnimation("ADD", "opacity-show-active");
    });
  }

  addRightBtnEvent() {
    this.btnRight.addEventListener("click", () => {
      this.actionBannerAnimation("REMOVE", "opacity-hide-active");
      this.currentShowingBannerIdx += this.changeCurrentShowingIdx("INCREASE");
      this.actionBannerAnimation("ADD", "opacity-show-active");
    });
  }

  actionBannerAnimation(mode, className) {
    const element = this.getCurrentBannerElement(this.currentShowingBannerIdx);
    this.modifyElementClassList(element, mode, className);
  }

  changeCurrentShowingIdx(mode) {
    const run = {
      INCREASE() {
        return 1;
      },
      DECREASE() {
        return -1;
      }
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
      ADD() {
        element.classList.add(className);
      },
      REMOVE() {
        element.classList.remove(className);
      }
    };
    run[mode]();
  }

  checkPossibleRange() {}
}

export { MainBannerSlider };
