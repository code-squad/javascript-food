export class MenuNavigation{
  constructor({menuNavigation, template}) {
    this.eMenuNavigation = menuNavigation;
    this.oTemplate = template;    
  }

  bindMouseOver(handler) {
    this.eMenuNavigation.addEventListener('mouseover', ({target, relatedTarget}) => {
      if(target.className !== 'menu') return;
      if(target.contains(relatedTarget)) return;

      handler(target.dataset.name);
    })
  }

  bindMouseOut(handler){
    this.eMenuNavigation.addEventListener('mouseout', ({target, relatedTarget}) => {
      let targetMenu = target.closest('.menu');

      if(!targetMenu) return;
      if(targetMenu.contains(relatedTarget)) return;

      handler(targetMenu.dataset.name);
    })
  }

  renderMenuLayer({name, subMenuData}) {
    let targetMenu = this.eMenuNavigation.querySelector(`[data-name='${name}']`);
    targetMenu.insertAdjacentHTML('beforeend', this.oTemplate.menuLayer({name, subMenuData}));
  }

  renderMenu(name){
    let targetMenu = this.eMenuNavigation.querySelector(`[data-name='${name}']`);
    targetMenu.innerHTML = this.oTemplate.menu(name);
  }
}