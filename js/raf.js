export function fade({previous, next, speed}) {
  if(previous === next) {
    next.style.opacity = 1;
    return;
  }

  previous.style.opacity = Number(previous.style.opacity) - speed;
  next.style.opacity = Number(next.style.opacity) + speed;

  if(previous.style.opacity <= 0) {
    previous.style.opacity = 0;
    next.style.opacity = 1;
    return;
  }

  requestAnimationFrame(() => {
    fade({previous, next, speed});
  })
}

export function slide({previous, next, type, speed}) {
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
    slide({previous, next, type, speed});
  })
}