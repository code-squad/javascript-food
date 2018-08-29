import {ajax, throttle} from "./helper.js";

export class SlideStyleSceneChange {
  constructor({wrapper, leftButton, rightButton, sceneTemplate, sceneDataUrl, animationDuration}) {
    this.elWrapper = wrapper;
    this.elLeftButton = leftButton;
    this.elRightButton = rightButton;
    this.sceneTemplate = sceneTemplate;
    this.sceneDataUrl = sceneDataUrl;
    this.animationDuration = animationDuration;
    this.sceneLocation = 0;
    this.animationDistance = 0;
    this.width = {
      wrapper: 0,
      scene: 0,
      sceneList: 0
    }
    this._registerAllEventListener();
  }

  _registerAllEventListener() {
    document.addEventListener('DOMContentLoaded', () => {
      ajax({responseDataHandler: JSON.parse, url: this.sceneDataUrl, callback: this._init.bind(this)});
    });

    this.elLeftButton.addEventListener('click', throttle({
      delay: this.animationDuration * 1000,
      callback: () => { this._move(this.animationDistance); }
    }));

    this.elRightButton.addEventListener('click', throttle({
      delay: this.animationDuration * 1000,
      callback: () => { this._move(-this.animationDistance); }
    }));

    this.elWrapper.addEventListener('transitionend', () => {
      if(this._isStartPosition()) this._initSceneLocation('start');
      else if(this._isEndPosition()) this._initSceneLocation('end');
    })
  }

  _init(ajaxSceneData) {
    this._render(ajaxSceneData);
    this._setWidth(this.elWrapper);
    this._renderDummyScene(this.elWrapper.innerHTML);
    this._initSceneLocation('start');
    this._setAnmiationDistance();
  }

  _initSceneLocation(position) {
    if(position === 'start') this.sceneLocation = -this.width.sceneList;
    else if(position === 'end') this.sceneLocation = -2*this.width.sceneList + this.width.wrapper;

    this.elWrapper.style.transition = '';
    this.elWrapper.style.transform = `translate3d(${this.sceneLocation}px, 0, 0)`;
  }

  // @param {Array} ajaxSceneData
  _render(ajaxSceneData) {
    this.elWrapper.innerHTML = ajaxSceneData.reduce((html, sceneData) => html + this.sceneTemplate(sceneData), '');
  }

  _renderDummyScene(sceneListHtml) {
    this.elWrapper.insertAdjacentHTML('afterbegin', sceneListHtml);
    this.elWrapper.insertAdjacentHTML('beforeend', sceneListHtml);
  }

  _setWidth(wrapper) {
    const sceneNumber = wrapper.childNodes.length;
    const sceneWidth = wrapper.firstChild.offsetWidth;

    this.width.wrapper = wrapper.offsetWidth;
    this.width.scene = sceneWidth;
    this.width.sceneList = sceneNumber * sceneWidth;
  }

  _setAnmiationDistance() {
    const sceneLength = this.elWrapper.children.length;
    const maxSceneNumOfWrapper = Math.floor(this.width.wrapper / this.width.scene);

    this.animationDistance = (sceneLength % maxSceneNumOfWrapper) ? this.width.scene : this.width.wrapper;
  }

  _move(distance) {
    this.sceneLocation += distance;

    this.elWrapper.style.transition = `transform ${this.animationDuration}s`;
    this.elWrapper.style.transform = `translate3d(${this.sceneLocation}px,0,0)`;
  }

  _isStartPosition() {
    return this.sceneLocation === -2*this.width.sceneList
  }

  _isEndPosition() {
    return this.sceneLocation === -this.width.sceneList + this.width.wrapper
  }
}