import {currying} from "./helper.js";

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

export const fade = currying({fn: _fade, keys: ['speed', 'previous', 'next']});
export const slide = currying({fn: _slide, keys: ['speed', 'type', 'previous', 'next']});