const animations = {
  fadeOut(el, change = 0.05) {
    let opacity = 1;
    (function decreaseOpacity() {
      opacity -= change;
      el.style.opacity = opacity;
      if (opacity <= 0) {
        el.style.opacity = 0;
        return true;
      }
      requestAnimationFrame(decreaseOpacity);
    }());
  },
  fadeIn(el, change = 0.05) {
    let opacity = 0;
    (function IncreaseOpacity() {
      opacity += change;
      el.style.opacity = opacity;
      if (opacity > 1) {
        el.style.opacity = 1;
        return true;
      }
      requestAnimationFrame(IncreaseOpacity);
    }());
  },
  scrollTop(window, min, accelration){
    let speed = 0.05;
    let scrollY = window.scrollY;
    (function scrollToTop() {
      const basicAcceleration = 1.5
      speed*=(basicAcceleration+accelration*0.2);
      scrollY-= speed;
      window.scrollTo(0,scrollY); 
      if (scrollY <=0) {
        return true;
      }
      requestAnimationFrame(scrollToTop);
    }());
  },
  scrollBottom(window, maxHeight, accelration){
    let speed = 0.05;
    let scrollY = window.scrollY;
    (function scrollToBottom() {
      const basicAcceleration = 1.5
      speed*=(basicAcceleration+accelration*0.2);
      scrollY+= speed;
      window.scrollTo(0,scrollY); 
      if (scrollY>maxHeight) {
        return true;
      }
      requestAnimationFrame(scrollToBottom);
    }());
  }
};

export default animations;
