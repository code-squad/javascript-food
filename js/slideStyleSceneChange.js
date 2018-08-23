export class SlideStyleSceneChange {
  constructor({wrapper, SceneTemplate, leftButton, rightButton, uri, ajax, throttle, animationDuration}) {
    this.wrapper = wrapper;
    this.SceneTemplate = SceneTemplate;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.uri = uri;
    this.ajax = ajax;
    this.throttle = throttle;
    this.animationDuration = animationDuration;
    this.sceneLocation = 0;
    this.animationDistance = 0;
    this.wrapperWidth = 0;
    this.sceneWidth = 0;
    this.sceneListWidth = 0;
  }

  registerAllEventListener() {
    const MILLISECOND = 1000;

    document.addEventListener('DOMContentLoaded', () => {
      this.ajax({uri: this.uri, callback: this._init.bind(this)});
    });

    this.leftButton.addEventListener('click', this.throttle({
      delay: MILLISECOND * this.animationDuration,
      callback: () => { this._move(this.animationDistance); }
    }));

    this.rightButton.addEventListener('click', this.throttle({
      delay: MILLISECOND * this.animationDuration,
      callback: () => { this._move(-this.animationDistance); }
    }));

    this.wrapper.addEventListener('transitionend', () => {
      if(this._isStartPosition()) this._initSceneLocation('start');
      else if(this._isEndPosition()) this._initSceneLocation('end');
    })
  }

  _init(ajaxSceneData) {
    this._render(ajaxSceneData);
    this._setWidth(this.wrapper);
    this._renderDummyScene(this.wrapper.innerHTML);
    this._initSceneLocation('start');
    this._setAnmiationDistance();
  }

  _initSceneLocation(position) {
    if(position === 'start') this.sceneLocation = -this.sceneListWidth;
    else if(position === 'end') this.sceneLocation = -2*this.sceneListWidth + this.wrapperWidth;

    this.wrapper.childNodes.forEach(scene => {
      scene.style.transition = '';
      scene.style.transform = `translate3d(${this.sceneLocation}px, 0, 0)`;
    })
  }

  // @param {Array} ajaxSceneData
  _render(ajaxSceneData) {
    this.wrapper.innerHTML = ajaxSceneData.reduce((html, sceneData) => html + this.SceneTemplate(sceneData), '');
  }

  _renderDummyScene(sceneListHtml) {
    this.wrapper.insertAdjacentHTML('afterbegin', sceneListHtml);
    this.wrapper.insertAdjacentHTML('beforeend', sceneListHtml);
  }

  _setWidth(wrapper) {
    const sceneNumber = wrapper.childNodes.length;
    const sceneWidth = wrapper.firstChild.offsetWidth;

    this.wrapperWidth = wrapper.offsetWidth;
    this.sceneWidth = sceneWidth;
    this.sceneListWidth = sceneNumber * sceneWidth;
  }

  _setAnmiationDistance() {
    const sceneLength = this.wrapper.children.length;
    const maxSceneNumOfWrapper = Math.floor(this.wrapperWidth / this.sceneWidth);

    this.animationDistance = (sceneLength % maxSceneNumOfWrapper) ? this.sceneWidth : this.wrapperWidth;
  }

  _move(distance) {
    const sceneList = this.wrapper.childNodes;

    this.sceneLocation += distance;

    sceneList.forEach(scene => {
      scene.style.transition = `transform ${this.animationDuration}s`;
      scene.style.transform = `translate3d(${this.sceneLocation}px,0,0)`;
    })
  }

  _isStartPosition() {
    return this.sceneLocation === -2*this.sceneListWidth
  }

  _isEndPosition() {
    return this.sceneLocation === -this.sceneListWidth + this.wrapperWidth
  }
}