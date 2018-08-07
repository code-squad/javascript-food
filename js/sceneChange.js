export class SceneChange {
  /*
  @param {nodeList} sceneList
  */
  constructor({sceneList, leftButton, rightButton, indexButtonWrap, effect}) {
    this.sceneList = sceneList;
    this.elLeftButton = leftButton;
    this.elRightButton = rightButton;
    this.elIndexButtonWrap = indexButtonWrap;
    this.effect = effect;
    this.index = 0;
    this.len = this.sceneList.length;
  }

  init() {
    this.elLeftButton.addEventListener('click', () => {
      const index = ((this.index -1) + this.len) % this.len
      this._modifyIndex(index);
    });
    
    this.elRightButton.addEventListener('click', () => {
      const index = ((this.index +1) + this.len) % this.len
      this._modifyIndex(index);
    });

    this.elIndexButtonWrap.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;
      const index = Number(target.dataset.index);
      this._modifyIndex(index);
    })
  }

  _modifyIndex(index) {
    const previousScene = this.sceneList[this.index];
    const nextScene = this.sceneList[index];

    this.index = index;

    this._activateScene({previousScene, nextScene, effect: this.effect});
    this._activateIndexButton(index);
  }

  _activateScene({previousScene, nextScene, effect}) {
    requestAnimationFrame(() => {
      effect({previous: previousScene, next: nextScene})
    })
  }

  _activateIndexButton(index) {
    const indexButtonList = this.elIndexButtonWrap.childNodes;
    const indexButton = indexButtonList[index];

    this._removeClass({nodeList: indexButtonList, className: 'active_index_button'});

    indexButton.classList.add('active_index_button');
  }

  _removeClass({nodeList, className}) {
    nodeList.forEach(node => {
      node.classList.remove(className);
    });
  }
}