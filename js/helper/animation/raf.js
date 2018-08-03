export const animation = (window => callback => window.requestAnimationFrame(callback))(window);


if (!window.requestAnimationFrame) {
  window. requestAnimationFrame = function (fn) {
      var timer = 16.66; // 60 fps
      setTimeout(fn,timer);
  }
}
else {
  const ani = {
    fadeOut(el) {
      let opacity = 1;
      function decrease() {
        opacity -= 0.05;
        if (opacity <= 0) {
          // complete
          element.style.opacity = 0;
          return true;
        }
        element.style.opacity = opacity;
        requestAnimationFrame(decrease);
      }
      decrease();
    },
  };
    
}


