export class MenuNavigation{
  constructor({menuNavigation, template}) {
    this.eMenuNavigation = menuNavigation;
    this.template = template;    
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
    targetMenu.insertAdjacentHTML('beforeend', this.template.menuLayer({name, subMenuData}));
  }

  reRenderMenuLayer(name){
    let targetMenu = this.eMenuNavigation.querySelector(`[data-name='${name}']`);
    let fiststLastElementChild = targetMenu.children[1];
    let secondLastElementChild = targetMenu.children[2];

    targetMenu.removeChild(fiststLastElementChild);
    targetMenu.removeChild(secondLastElementChild);
  }
}