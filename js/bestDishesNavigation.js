export class BestDishesNavigation {
  constructor({bestDishesNavigation}){
    this.bestDishesNavigation = bestDishesNavigation;
  }

  init() {
    this.bestDishesNavigation.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;
      this._activateCategory(target);      
    })
  }
  
  bindSelectBestDishesCategory(handler) {
    this.bestDishesNavigation.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;
      handler(target.dataset.id);
    })
  }

  triggerEvent() {
    let evt = new Event('click', {bubbles: true});
    return this.bestDishesNavigation.firstElementChild.dispatchEvent(evt);
  }

  _activateCategory(category) {
    this._deactivateAllCategories(this.bestDishesNavigation);
    category.classList.add('ativated_best_dishes_nav');
  }

  _deactivateAllCategories(navigation) {
    navigation.querySelectorAll('li').forEach(category => {
      category.classList.remove('ativated_best_dishes_nav');
    })
  }
}