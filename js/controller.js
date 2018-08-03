export let Controller = (function() {
  let Controller = function({model, view}) {
    this.oModel = model;
    this.oView = view;
  };

  Controller.prototype = {
    init() {
      let menuData = this.oModel.getMenuData();
      this.oView.render(menuData);
    }
  }

  return Controller;
})();