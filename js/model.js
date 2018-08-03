export let Model = (function() {
  let Model = function({menuData}) {
    this.menuData = menuData;
  }

  Model.prototype = {
    getMenuData() {
      return this.menuData;
    }
  }

  return Model;
})();