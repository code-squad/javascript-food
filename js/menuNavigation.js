export class MenuNavigation{
  constructor({menuNavigation, template}) {
    this.eMenuNavigation = menuNavigation;
    this.oTemplate = template;
  }

  render(menuData){
    this.eMenuNavigation.innerHTML = this.oTemplate.menuNavigation(menuData);
  }
}