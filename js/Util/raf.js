export const RequestAnimations = {
  fadeIn(element, time) {
    let opacity = 0;
    let fps = (16 / time) * 10;
    function increase() {
      opacity += fps;
      if (opacity >= 1) {
        element.style.opacity = 1;
        return true;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(increase);
    }
    increase();
  },
  fadeOut(element, time) {
    let opacity = 1;
    let fps = (16 / time) * 10;
    function decrease() {
      opacity -= fps;
      if (opacity <= 0) {
        element.style.opacity = 0;
        return true;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(decrease);
    }
    decrease();
  }
}