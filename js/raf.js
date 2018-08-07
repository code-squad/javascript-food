export function fade({previous, next}) {
  previous.style.opacity = Number(previous.style.opacity) - 0.03;
  next.style.opacity = Number(next.style.opacity) + 0.03;

  if(previous.style.opacity > 0) {
    requestAnimationFrame(() => {
      fade({previous, next});
    })
  }
}