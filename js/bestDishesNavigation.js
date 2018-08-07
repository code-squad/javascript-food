export class BestDishesNavigation {
  constructor({bestDishesNavigation}){
    this.elBestDishesNavigation = bestDishesNavigation;
  }

  init() {
    this.elBestDishesNavigation.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;
      this._activateCategory(target);
    })
  }
  
  bindSelectBestDishesCategory(handler) {
    this.elBestDishesNavigation.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;
      handler(target.dataset.id);
    })
  }

  triggerEvent() {
    let evt = new Event('click', {bubbles: true});
    this.elBestDishesNavigation.firstElementChild.dispatchEvent(evt);
  }

  _activateCategory(category) {
    this._deactivateAllCategories(this.elBestDishesNavigation);
    category.classList.add('ativated_best_dishes_nav');
  }

  _deactivateAllCategories(navigation) {
    navigation.querySelectorAll('li').forEach(category => {
      category.classList.remove('ativated_best_dishes_nav');
    })
  }
}