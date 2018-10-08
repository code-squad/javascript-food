export class Engine {
  constructor(header, headerModel, main, mainModel) {
    this.header = header;
    this.headerModel = headerModel;
    this.main = main;
    this.mainModel = mainModel;
  }
  start() {
    this.render();
  }

  render() {
    this.header.renderNav(this.headerModel.getNavItemList());
    this.main.renderMenu(this.mainModel.getMenuList());
  }
}
