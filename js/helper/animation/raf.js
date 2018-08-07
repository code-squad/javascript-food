const animations = {
  fadeOut(el) {
    let opacity = 1;
    (function decreaseOpacity() {
      opacity -= 0.05;
      el.style.opacity = opacity;
      if (opacity <= 0) {
        el.style.opacity = 0;
        return true;
      }
      requestAnimationFrame(decreaseOpacity);
    }());
  },
  fadeIn(el) {
    let opacity = 0;
    (function IncreaseOpacity() {
      opacity += 0.05;
      el.style.opacity = opacity;
      if (opacity > 1) {
        el.style.opacity = 1;
        return true;
      }
      requestAnimationFrame(IncreaseOpacity);
    }());
  },
};

export default animations;
