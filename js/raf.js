/*
    USE REQUEST ANIMATION FRAME
*/

let start;
let firstBanner;
let secondBanner;

const action = function(time) {
  if (!start) start = time;

  const progress = time - start;
  const calProgress = 1000 - progress * 5;

  firstBanner.style.opacity = calProgress;
  secondBanner.style.opacity = progress;

  if (progress < 1000) {
    window.requestAnimationFrame(action);
  }
};

class RequestAnimationFrame {
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
      if (!this.checkPossibleRange("LEFT", this.currentShowingBannerIdx))
        return;
      firstBanner = this.getCurrentBannerElement(this.currentShowingBannerIdx);
      secondBanner = this.getCurrentBannerElement(
        this.currentShowingBannerIdx - 1
      );
      this.currentShowingBannerIdx--;
      window.requestAnimationFrame(action);
    });
  }

  addRightBtnEvent() {
    this.btnRight.addEventListener("click", () => {
      if (!this.checkPossibleRange("RIGHT", this.currentShowingBannerIdx))
        return;
      firstBanner = this.getCurrentBannerElement(this.currentShowingBannerIdx);
      secondBanner = this.getCurrentBannerElement(
        this.currentShowingBannerIdx + 1
      );
      this.currentShowingBannerIdx++;
      window.requestAnimationFrame(action);
    });
  }

  getCurrentBannerElement(idx) {
    const className = `.banner-0${idx}`;
    const element = document.querySelector(className);
    return element;
  }

  checkPossibleRange(mode, data) {
    const first = 1;
    const last = document.querySelectorAll(".banner-common-property").length;

    if (mode === "LEFT" && data === first) return false;
    if (mode === "RIGHT" && data === last) return false;

    return true;
  }
}

export { RequestAnimationFrame };
