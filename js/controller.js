export const Controller = (function() {
  let _selectBestDishesCategory = function(categoryId) {
    this.oView.bestDishesView.displayBestDish(categoryId);
  };

  const Controller = function({model, view, baseURI}) {
    this.oModel = model;
    this.oView = view;
    this.baseURI = baseURI;
  };

  Controller.prototype = {
    init() {
      this.oView.bestDishesNavigation.bindSelectBestDishesCategory(_selectBestDishesCategory.bind(this));
      this.oView.bestDishesNavigation.triggerEvent();
    }
  }

  return Controller;
})();