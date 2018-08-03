export class BestDishesView {
  constructor({bestDishesView}) {
    this.elBestDishesView = bestDishesView;
    this.bestDishImages = this.elBestDishesView.querySelectorAll('.best_dish_img');
    this.bestDishNames = this.elBestDishesView.querySelectorAll('.best_dish_name');
    this.bestDishSlogans = this.elBestDishesView.querySelectorAll('.best_dish_slogan');
    this.bestDishPrices = this.elBestDishesView.querySelectorAll('.best_dish_price');
  }

  render(data) {
    data.items.forEach((item, idx) => {
      const imageURI = item.image;
      const name = item.title;
      const slogan = item.description;
      const price = item.s_price.slice(0,-1);

      this.bestDishImages[idx].setAttribute('src', imageURI);
      this.bestDishNames[idx].innerHTML = name;
      this.bestDishSlogans[idx].innerHTML = slogan;
      this.bestDishPrices[idx].innerHTML = price;
    })
  }
}