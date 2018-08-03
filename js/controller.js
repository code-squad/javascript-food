export const Controller = (function() {
  const Controller = function({model, view}) {
    this.oModel = model;
    this.oView = view;
  };

  Controller.prototype = {
    init() {
      const menuData = this.oModel.getMenuData();
      this.oView.render(menuData);
    }
  }

  return Controller;
})();