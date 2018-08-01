export class Controller {
  constructor({model, view}) {
    Object.assign(this, {model, view});
    this.view.bindMouseOver(this.mouseOverMenuNavigation.bind(this));
    this.view.bindMouseOut(this.mouseOutMenuNavigation.bind(this));
  }

  mouseOverMenuNavigation(name) {
    let subMenuData = this.model.getSubMenuData(name);
    this.view.renderMenuLayer({name, subMenuData});
  }

  mouseOutMenuNavigation(name) {
    this.view.reRenderMenuLayer(name);
  }
}