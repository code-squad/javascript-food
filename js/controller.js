export const Controller = (function() {
  let _selectBestDishesCategory = function(categoryId) {
    if(this.oView.bestDishesView.hasBestDish(categoryId)) this.oView.bestDishesView.displayBestDish(categoryId);
    else {
      const x = new XMLHttpRequest();
      x.addEventListener('load', () => {
        const bestDishesData = JSON.parse(x.response);
        this.oView.bestDishesView.render(bestDishesData);
        this.oView.bestDishesView.displayBestDish(categoryId);
      })
      x.open('GET', this.baseURI + '/best/' + categoryId);
      x.send();
    }
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