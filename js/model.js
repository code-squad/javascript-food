export class Model {
  constructor({menuLayerData}) {
    this.menuLayerData = menuLayerData;
  }

  getSubMenuData(name) {
    return this.menuLayerData[name];
  }
}