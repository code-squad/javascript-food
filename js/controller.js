export const Controller = (function() {
  const Controller = function({model, view}) {
    this.oModel = model;
    this.oView = view;
  };

  Controller.prototype = {}

  return Controller;
})();