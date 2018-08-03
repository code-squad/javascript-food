export const Controller = (function() {
  let _selectBestDishesCategory = function(data) {
    this.oView.bestDishesView.render(data);
  };

  const Controller = function({model, view}) {
    this.oModel = model;
    this.oView = view;
  };

  Controller.prototype = {
    init() {
      this.oView.bestDishesNavigation.bindSelectBestDishesCategory(_selectBestDishesCategory.bind(this))
    }    
  }

  return Controller;
})();