export const animation = ((window)=>{
  return (callback)=>window.requestAnimationFrame(callback);
})(window);

