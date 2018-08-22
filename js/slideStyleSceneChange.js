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
    this.distance = 0;
    this.sceneListWidth = 0;
    this.wrapperWidth = 0;
  }

  registerAllEventListener() {
    document.addEventListener('DOMContentLoaded', () => {
      this.ajax({uri: this.uri, callback: this._init.bind(this)});
    });

    this.leftButton.addEventListener('click', this.throttle({
      delay: 1000*this.animationDuration,
      callback: () => { this._move(this.distance); }
    }));

    this.rightButton.addEventListener('click', this.throttle({
      delay: 1000*this.animationDuration,
      callback: () => { this._move(-this.distance); }
    }));

    this.wrapper.addEventListener('transitionend', () => {
      this._checkLocation();
    })
  }

  _init(ajaxSceneData) {
    this._render(ajaxSceneData);
    this._setWidth(this.wrapper);
    this._renderDummyScene(this.wrapper.innerHTML);
    this._initSceneLocation('start');
    this._setAnimationState({wrapper: this.wrapper, duration: this.animationDuration});
  }

  _initSceneLocation(position) {
    if(position === 'start') this.sceneLocation = -this.sceneListWidth;
    if(position === 'end') this.sceneLocation = -2*this.sceneListWidth + this.wrapperWidth;

    // 애니메이션 없애고 translate 변경
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
    this.sceneListWidth = sceneNumber * sceneWidth;
  }

  _setAnimationState({wrapper, duration}) {
    this._setAnmiationScale(wrapper);
    // this._setAnimationDuration({wrapper, duration});
  }

  _setAnmiationScale(wrapper) {
    const sceneLength = wrapper.children.length;
    const wrapperWidth = wrapper.offsetWidth;
    const sceneWidth = wrapper.firstElementChild.offsetWidth;
    this.distance = (sceneLength % 4) ? sceneWidth : wrapperWidth; // 4
  }

  // _setAnimationDuration({wrapper, duration}) {
  //   const sceneList = wrapper.childNodes;
  //   sceneList.forEach(scene => {
  //     scene.style.transition = `transform ${duration}s`
  //   })
  // }

  _move(distance) {
    const sceneList = this.wrapper.childNodes;

    this.sceneLocation += distance;

    sceneList.forEach(scene => {
      scene.style.transition = `transform ${this.animationDuration}s`
      scene.style.transform = `translate3d(${this.sceneLocation}px,0,0)`;
    })
  }
  
  _checkLocation(target) {
    if(this.sceneLocation === -2*this.sceneListWidth) this._initSceneLocation('start');
    else if(this.sceneLocation === -this.sceneListWidth + this.wrapperWidth) this._initSceneLocation('end');
  }
}