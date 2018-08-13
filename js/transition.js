export class t_NavigatorStyleSceneChange {
  constructor({
    sceneList,
    leftButton, rightButton,
    leftAnimation, rightAnimation,
    navigatorWrap, navigatorButtonTemplate, activeNavigatorButtonStyle
  }) {
    this.sceneList = sceneList;
    this.elLeftButton = leftButton;
    this.elRightButton = rightButton;
    this.leftAnimation = leftAnimation;
    this.rightAnimation = rightAnimation;
    this.elNavigatorWrap = navigatorWrap;
    this.navigatorButtonTemplate = navigatorButtonTemplate;
    this.activeStyle = activeNavigatorButtonStyle;
    this.currentIndex = 0;
    this.sceneLength = sceneList.length;
  }

  init() {
    this._renderNavigatorButton({
      sceneLength: this.sceneList.length,
      navigatorWrap: this.elNavigatorWrap,
      template: this.navigatorButtonTemplate
    });
    this._registerAllEventListener();
    this._activateScene(this.sceneList[this.currentIndex]);
    this._activateNavigatorButton({index: this.currentIndex, style: this.activeStyle});
  }

  _renderNavigatorButton({sceneLength, navigatorWrap, template}) {
    for(let i = 0; i < sceneLength; i++) {
      navigatorWrap.innerHTML += template(i);
    }
  }

  _registerAllEventListener() {
    this.elLeftButton.addEventListener('click', () => {
      const nextIndex = this._calculateNextIndex(-1);
      this._animateScene({previousIndex: this.currentIndex, nextIndex, animation: this.leftAnimation})
      this._activateNavigatorButton({index: nextIndex, style: this.activeStyle});
      this.currentIndex = nextIndex;
    })

    this.elRightButton.addEventListener('click', () => {
      const nextIndex = this._calculateNextIndex(1);
      this._animateScene({previousIndex: this.currentIndex, nextIndex, animation: this.rightAnimation})
      this._activateNavigatorButton({index: nextIndex, style: this.activeStyle});
      this.currentIndex = nextIndex;
    })

    this.elNavigatorWrap.addEventListener('click', ({target}) => {
      if(target.tagName !== 'LI') return;

      const nextIndex = Number(target.dataset.index);
      const animation = this.currentIndex < nextIndex ? this.rightAnimation : this.leftAnimation;

      this._animateScene({previousIndex: this.currentIndex, nextIndex, animation});
      this._activateNavigatorButton({index: nextIndex, style: this.activeStyle});
      this.currentIndex = nextIndex;
    })
  }

  _calculateNextIndex(number) {
    return ((this.currentIndex + number) + this.sceneLength) % this.sceneLength;
  }

  _animateScene({previousIndex, nextIndex, animation}) {
    const previousScene = this.sceneList[previousIndex];
    const nextScene = this.sceneList[nextIndex];

    this._activateScene(previousScene, nextScene);
    
    previousScene.classList.remove(animation.in);
    previousScene.classList.add(animation.out);
    nextScene.classList.remove(animation.out);
    nextScene.classList.add(animation.in);
  }

  _activateScene(...targetSceneList) {
    this.sceneList.forEach(scene => {
      scene.classList.add('opacity_zero');
    })

    targetSceneList.forEach(scene => {
      scene.classList.remove('opacity_zero');
    })
  }

  _activateNavigatorButton({index, style}) {
    const navigatorButtons = this.elNavigatorWrap.childNodes;
    
    navigatorButtons.forEach(button => {
      const buttonIndex = Number(button.dataset.index);
      buttonIndex === index ? button.classList.add(style) : button.classList.remove(style);
    })
  }
}