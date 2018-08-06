export class BestDishesView {
  constructor({bestDishesView, template}) {
    this.elBestDishesView = bestDishesView;
    this.template = template;
  }

  render(bestDishData) {
    this.elBestDishesView.insertAdjacentHTML('beforeend', this.template(bestDishData))
  }

  hasBestDish(categoryId) {
    return this.elBestDishesView.querySelector(`[data-id='${categoryId}']`)
  }

  displayBestDish(categoryId) {
    this._unDisplayAllBestDishes(this.elBestDishesView);

    const targetBestDishes = this.elBestDishesView.querySelector(`[data-id='${categoryId}']`);

    targetBestDishes.classList.add('visible');
  }

  _unDisplayAllBestDishes(bestDishesView) {
    const bestDishesList = bestDishesView.childNodes;
    bestDishesList.forEach(bestDishes => {
      bestDishes.classList.remove('visible');
    })
  }
}