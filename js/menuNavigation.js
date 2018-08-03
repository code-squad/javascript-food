export let MenuNavigation = (function() {
  let MenuNavigation = function({menuNavigation, template}) {
    this.eMenuNavigation = menuNavigation;
    this.oTemplate = template;
  }

  MenuNavigation.prototype = {
    render(menuData){
      this.eMenuNavigation.innerHTML = this.oTemplate.menuNavigation(menuData);
    }
  }

  return MenuNavigation
})();