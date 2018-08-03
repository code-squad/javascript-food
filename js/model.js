export const Model = (function() {
  const Model = function({menuData}) {
    this.menuData = menuData;
  }

  Model.prototype = {
    getMenuData() {
      return this.menuData;
    }
  }

  return Model;
})();