export const MenuNavigation = (function() {
  const MenuNavigation = function({menuNavigation, template}) {
    this.elMenuNavigation = menuNavigation;
    this.oTemplate = template;
  }

  MenuNavigation.prototype = {
    render(menuData){
      this.elMenuNavigation.innerHTML = this.oTemplate.menuNavigation(menuData);
    }
  }

  return MenuNavigation
})();