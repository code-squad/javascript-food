export const RequestAnimations = {
  scrollUp(layerY, goal, speed) {
    speed /= 10;
    function decrease() {
      layerY -= speed;
      window.scrollTo(0, layerY);
      if (layerY <= goal) {
        window.scrollTo(0, goal);
        return true;
      }
      requestAnimationFrame(decrease);
    }
    decrease();
  },
  scrollDown(layerY, goal, speed) {
    speed /= 10;
    function increase() {
      layerY += speed;
      window.scrollTo(0, layerY);
      if (layerY >= goal) {
        window.scrollTo(0, goal);
        return true;
      }
      requestAnimationFrame(increase);
    }
    increase();
  },
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