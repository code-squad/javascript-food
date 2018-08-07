export class SceneChange {
  /*
  @param {nodeList} sceneList
  */
  constructor({sceneList, leftButton, rightButton, indexButtonWrap}) {
    this.sceneList = sceneList;
    this.elLeftButton = leftButton;
    this.elRightButton = rightButton;
    this.elIndexButtonWrap = indexButtonWrap;
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
    this.index = index;
    this._activate(this.index);
  }

  _activate(index) {
    this._activateScene(index);
    this._activateIndexButton(index);
  }

  _activateScene(index) {
    const scene = this.sceneList[index];

    this._removeClass({nodeList: this.sceneList, className: 'visible_ad'});

    scene.classList.add('visible_ad');
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