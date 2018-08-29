export class ScrollButton {
  constructor({scrollButtonWrap}) {
    this.scrollButtonWrap = scrollButtonWrap;
    this.buttonWrapOffsetTop = scrollButtonWrap.offsetTop;
    this._registerAllEventListener();
  }

  _registerAllEventListener() {
    this.scrollButtonWrap.addEventListener('click', ({target: {dataset: {direction}}}) => {
      if(!direction) return;
      this._scroll(direction);
    });
    
    document.addEventListener('scroll', () => {
      if(pageYOffset > 0) {
        this.scrollButtonWrap.classList.remove('deactive');
        this.scrollButtonWrap.classList.add('active');
      }
      else {
        this.scrollButtonWrap.classList.remove('active');
        this.scrollButtonWrap.classList.add('deactive');
      }
    })
  }

  _scroll(direction) {
    if(direction === 'up') this._scrollEaseIn(-1);
    else if(direction === 'down') this._scrollEaseIn(1);
  }

  _scrollEaseIn(volume) {
    scrollBy(0, volume);
    const endY = document.body.offsetHeight - innerHeight;
    if(pageYOffset > 0 && pageYOffset < endY) requestAnimationFrame(this._scrollEaseIn.bind(this, volume * 1.5));
  }
}