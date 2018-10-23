export const RequestAnimations = {
  fadeIn(element, time) {
    var opacity = 0;
    var fps = (16 / time) * 10;
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
    var opacity = 1;
    var fps = (16 / time) * 10;
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