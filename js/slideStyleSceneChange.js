export class SlideStyleSceneChange {
  constructor({wrapper, SceneTemplate, uri, ajax}) {
    this.wrapper = wrapper;
    this.SceneTemplate = SceneTemplate;
    this.uri = uri;
    this.ajax = ajax;
  }

  registerAllEventListener() {
    document.addEventListener('DOMContentLoaded', this._init.bind(this));
  }

  _init() {
    this.ajax({uri: this.uri, callback: this._render.bind(this)});
  }

  // @param {Array} ajaxSceneData
  _render(ajaxSceneData) {
    this.wrapper.innerHTML = ajaxSceneData.reduce((html, sceneData) => html + this.SceneTemplate(sceneData), '');
  }

  _setAnimationStyle() {}
}