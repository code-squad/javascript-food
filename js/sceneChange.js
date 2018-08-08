// sceneList의 개수대로 동적으로 indexButton을 생성
export class SceneChange {
  /*
  @param {NodeList} sceneList
  @param {Ojbect} indexButton - {wrap, template, activeButtonStyle}
  @param {Function} effect
  */
  constructor({sceneList, leftButton, rightButton, indexButton, effect}) {
    this.sceneList = sceneList;
    this.elLeftButton = leftButton;
    this.elRightButton = rightButton;
    this.effect = effect;
    // indexButtonInfo
    this.elIndexButtonWrap = indexButton.wrap;
    this.indexButtonTemplate = indexButton.template;
    this.activeIndexButtonStyle = indexButton.activeButtonStyle;

    this.currentIndex = 0;
    this.sceneLength = this.sceneList.length;
  }

  init() {
    this._renderIndexButton({
      indexButtonWrap: this.elIndexButtonWrap,
      template: this.indexButtonTemplate,
      sceneLength: this.sceneLength
    });
    this._addAllEventListener();
    this._triggerEvent({eventType: 'click', target: this.elIndexButtonWrap.firstElementChild})
  }

  _renderIndexButton({indexButtonWrap, template, sceneLength}) {
    for(let index = 0; index < sceneLength; index++) {
      indexButtonWrap.innerHTML += template(index);
    }
  }

  _addAllEventListener() {
    this.elLeftButton.addEventListener('click', () => {
      const nextIndex = ((this.currentIndex - 1) + this.sceneLength) % this.sceneLength;
      this._changeCurrentIndex({ previousIndex: this.currentIndex, nextIndex: nextIndex });
    });
    this.elRightButton.addEventListener('click', () => {
      const nextIndex = ((this.currentIndex + 1) + this.sceneLength) % this.sceneLength;
      this._changeCurrentIndex({ previousIndex: this.currentIndex, nextIndex: nextIndex });
    });
    this.elIndexButtonWrap.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'LI')
        return;
      const nextIndex = Number(target.dataset.index);
      this._changeCurrentIndex({ previousIndex: this.currentIndex, nextIndex: nextIndex });
    });
  }

  _triggerEvent({eventType, target}) {
    const evt = new Event(eventType, {bubbles: true});
    target.dispatchEvent(evt);
  }

  _changeCurrentIndex({previousIndex, nextIndex}) {
    this._changeCurrentScene({
      sceneList: this.sceneList,
      previousIndex, 
      nextIndex, 
      effect: this.effect
    });

    this._changeCurrentIndexButton({
      indexButtonList: this.elIndexButtonWrap.childNodes,
      previousIndex, 
      nextIndex, 
      style: this.activeIndexButtonStyle
    });

    this.currentIndex = nextIndex;
  }

  _changeCurrentScene({sceneList, previousIndex, nextIndex, effect}) {
    const previousScene = sceneList[previousIndex];
    const nextScene = sceneList[nextIndex];

    requestAnimationFrame(() => {
      effect({previous: previousScene, next: nextScene})
    })
  }

  _changeCurrentIndexButton({indexButtonList, previousIndex, nextIndex, style}) {
    const previousIndexButton = indexButtonList[previousIndex];
    const nextIndexButton = indexButtonList[nextIndex];

    previousIndexButton.classList.remove(style);
    nextIndexButton.classList.add(style);
  }
}