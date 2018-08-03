export class BestDishesNavigation {
  constructor({bestDishesNavigation}){
    this.bestDishesNavigation = bestDishesNavigation;
  }

  bindSelectBestDishesCategory(handler) {
    this.bestDishesNavigation.addEventListener('click', ({target}) => {
      const x = new XMLHttpRequest();
      x.addEventListener('load', () => {
        const data = JSON.parse(x.response);
        handler(data);
      })
      x.open('GET', `http://crong.codesquad.kr:8080/woowa/best/${target.dataset.id}`);
      x.send();
    })
  }
}