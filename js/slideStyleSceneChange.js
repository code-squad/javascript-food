export class SlideStyleSceneChange {
  constructor({wrapper, SceneTemplate, leftButton, rightButton, uri, ajax, animationDuration}) {
    this.wrapper = wrapper;
    this.SceneTemplate = SceneTemplate;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.uri = uri;
    this.ajax = ajax;
    this.animationDuration = animationDuration;
    this.location = 0;
    this.distance = 0;
  }

  registerAllEventListener() {
    document.addEventListener('DOMContentLoaded', () => {
      this.ajax({uri: this.uri, callback: this._init.bind(this)});
    });

    this.leftButton.addEventListener('click', () => {
      this._move(this.distance);
    });

    this.rightButton.addEventListener('click', () => {
      this._move(-this.distance);
    });
  }

  _init(ajaxSceneData) {
    this._render(ajaxSceneData);
    this._setAnimationState({wrapper: this.wrapper, duration: this.animationDuration});
  }

  // @param {Array} ajaxSceneData
  _render(ajaxSceneData) {
    this.wrapper.innerHTML = ajaxSceneData.reduce((html, sceneData) => html + this.SceneTemplate(sceneData), '');
  }

  _setAnimationState({wrapper, duration}) {
    this._setAnmiationScale(wrapper);
    this._setAnimationDuration({wrapper, duration});
  }

  _setAnmiationScale(wrapper) {
    const sceneLength = wrapper.children.length;
    const wrapperWidth = wrapper.offsetWidth;
    const sceneWidth = wrapper.firstElementChild.offsetWidth;
    this.distance = (sceneLength % 4) ? sceneWidth : wrapperWidth;
  }

  _setAnimationDuration({wrapper, duration}) {
    const sceneList = wrapper.childNodes;
    sceneList.forEach(scene => {
      scene.style.transition = `transform ${duration}s`
    })
  }

  _move(distance) {
    const sceneList = this.wrapper.childNodes;

    this.location += distance;

    sceneList.forEach(scene => {
      scene.style.transform = `translate3d(${this.location}px,0,0)`;
    })
  }
}