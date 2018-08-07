export const Controller = (function() {
  let _selectBestDishesCategory = function(categoryId) {
    this.oView.bestDishesView.displayBestDish(categoryId);
  };

  const Controller = function({model, view}) {
    this.oModel = model;
    this.oView = view;
  };

  Controller.prototype = {
    init({menuData}) {
      this.oView.menuNavigation.render(menuData);
      this.oView.bestDishesNavigation.init();
      this.oView.bestDishesNavigation.bindSelectBestDishesCategory(_selectBestDishesCategory.bind(this));
      this.oView.bestDishesNavigation.triggerEvent();
    }
  }

  return Controller;
})();