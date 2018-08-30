export class BestDishesView {
  constructor({bestDishesView, template, ajax, baseURI}) {
    this.elBestDishesView = bestDishesView;
    this.template = template;
    this.ajax = ajax;
    this.baseURI = baseURI;
  }

  displayBestDish(categoryId) {
    this._deactivateAllBestDishes(this.elBestDishesView);
    
    this._hasBestDish(categoryId) ? this._activateBestDish(categoryId)
     : this.ajax({url: this.baseURI + categoryId, callback: this._render.bind(this)});
  }

  _render(bestDishData) {
    this.elBestDishesView.insertAdjacentHTML('beforeend', this.template(bestDishData))
  }

  _hasBestDish(categoryId) {
    return this.elBestDishesView.querySelector(`[data-id='${categoryId}']`)
  }

  _activateBestDish(categoryId) {
    const targetBestDishes = this.elBestDishesView.querySelector(`[data-id='${categoryId}']`);

    targetBestDishes.classList.add('visible');
  }

  _deactivateAllBestDishes(bestDishesView) {
    const bestDishesList = bestDishesView.childNodes;
    bestDishesList.forEach(bestDishes => {
      bestDishes.classList.remove('visible');
    })
  }
}