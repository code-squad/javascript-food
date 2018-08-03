export let MenuNavigation = (function() {
  let MenuNavigation = function({menuNavigation, template}) {
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