export function fade({previous, next}) {
  if(previous === next) {
    next.style.opacity = 1;
    return;
  }

  previous.style.opacity = Number(previous.style.opacity) - 0.03;
  next.style.opacity = Number(next.style.opacity) + 0.03;

  if(previous.style.opacity <= 0) {
    previous.style.opacity = 0;
    next.style.opacity = 1;
    return;
  }

  requestAnimationFrame(() => {
    fade({previous, next});
  })
}