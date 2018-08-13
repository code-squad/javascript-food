const _fade = function({speed, previous, next}) {
  if(previous === next) return;

  previous.style.opacity = previous.style.opacity ? Number(previous.style.opacity) - speed : 1;
  next.style.opacity = next.style.opacity ? Number(next.style.opacity) + speed : 0;

  if(previous.style.opacity <= 0) {
    previous.style.opacity = 0;
    next.style.opacity = 1;
    return;
  }

  requestAnimationFrame(() => {
    _fade({speed, previous, next});
  })
};

const _slide = function ({speed, type, previous, next}) {
  if(previous === next) return;
  
  if(previous.style.transform === '') previous.style.transform = `translateX(0%)`;
  if(next.style.transform === '') next.style.transform = `translateX(${type === 'left' ? -100 : 100}%)`;

  let nextTranslateValue = Math.abs(next.style.transform.match(/-?\d{1,}/)[0]);

  if(nextTranslateValue < 1) {
    previous.style.transform = '';
    next.style.transform = '';
    previous.style.visibility = 'hidden';
    return;
  }

  nextTranslateValue = nextTranslateValue * speed;
  let previousTranslateValue = nextTranslateValue - 100;

  if(type === 'left') {
    previousTranslateValue *= -1;
    nextTranslateValue *= -1;
  }

  previous.style.transform = `translate(${previousTranslateValue}%)`;
  next.style.transform = `translate(${nextTranslateValue}%)`;

  requestAnimationFrame(() => {
    _slide({speed, type, previous, next});
  })
}

const objectCurry = function({callback, numberOfKey}) {
  return function f(obj) {
    if(Object.keys(obj).length >= numberOfKey) return callback(obj);
    return (restObj) => f(Object.assign(restObj, obj));
  }
}

export const fade = objectCurry({callback: _fade, numberOfKey: 3});
export const slide = objectCurry({callback: _slide, numberOfKey: 4});