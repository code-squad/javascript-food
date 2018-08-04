export const MenuNavigation = (function() {
  const MenuNavigation = function({menuNavigation, template}) {
    this.elMenuNavigation = menuNavigation;
    this.template = template;
  }

  MenuNavigation.prototype = {
    render(menuData){
      this.elMenuNavigation.innerHTML = this.template(menuData);
    }
  }

  return MenuNavigation
})();