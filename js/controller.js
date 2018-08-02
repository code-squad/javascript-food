export class Controller {
  constructor({model, view}) {
    Object.assign(this, {model, view});
  }

  init(){
    let menuData = this.model.getMenuData();
    this.view.render(menuData);
  }
}