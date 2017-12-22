window.addEventListener('DOMContentLoaded', () => {

  const scrollVertical = function(targetPos, duration) {
    const distance = targetPos - window.scrollY;
    const fps = 60;
    const step = distance * (1000 / fps / duration);

    let animationID = window.requestAnimationFrame(scroll);

    function scroll() {
      const restOfDistance = Math.abs(targetPos - window.scrollY);
      window.scrollTo(0, window.scrollY + step);

      if (restOfDistance <= 0) {
        window.cancelAnimationFrame(animationID);
      } else {
        animationID = window.requestAnimationFrame(scroll);
      }
    }
  };

  document.querySelector('.scroller').addEventListener('click', event => {
    const target = event.target;
    const btnClassName = 'btn--scroll-to';

    if (!util.hasClass(target, btnClassName)) {
      return;
    }

    if (util.hasClass(target, `${btnClassName}-top`)) {
      scrollVertical(0, 300);
    } else if (util.hasClass(target, `${btnClassName}-bottom`)) {
      scrollVertical(document.body.scrollHeight - window.innerHeight, 300);
    }
  });
  
  (new Carousel({
    container: document.querySelector('.carousel--main'),
    dotSize: 'big',
    animationType: 'fade'
  })).init();

  (new Carousel({
    container: document.querySelector('.carousel--new-items'),
    positionOfIndicator: 'top'
  })).init();

  (new Carousel({
    container: document.querySelector('.carousel--notices'),
    positionOfIndicator: 'top'
  })).init();

  const bestsellerTab = new TabMenu({
    buttons: '.bestseller > .container > .tab-buttons',
    contents: '.bestseller > .container > .tab-contents'
  });

  const sidedishCarousel = new Carousel({
    container: document.querySelector('.sidedish .carousel--thumbnails'),
    itemTemplate: document.querySelector('#sidedishThumbnail'),
    getItemHTML: TabMenu.prototype.getThumbnailHTML,
    visibleItems: 4,
    itemPadding: '15px',
    usingIndicator: false,
    infinityLoop: true
  });

  const mainSidedishCarousel = new Carousel({
    container: document.querySelector('.sidedish--main .carousel--thumbnails'),
    itemTemplate: document.querySelector('#sidedishThumbnail'),
    getItemHTML: TabMenu.prototype.getThumbnailHTML,
    visibleItems: 4,
    itemPadding: '15px',
    usingIndicator: false,
    infinityLoop: true
  });

  const courseCarousel = new Carousel({
    container: document.querySelector('.course .carousel--thumbnails'),
    itemTemplate: document.querySelector('#sidedishThumbnail'),
    getItemHTML: TabMenu.prototype.getThumbnailHTML,
    visibleItems: 4,
    itemPadding: '15px',
    usingIndicator: false,
    infinityLoop: true
  });

  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';

  util.requestData({
    url: BASE_URL + 'best',
    callback: bestsellerTab.init.bind(bestsellerTab)
  });

  util.requestData({
    url: BASE_URL + 'side',
    callback: sidedishCarousel.init.bind(sidedishCarousel)
  });

  util.requestData({
    url: BASE_URL + 'main',
    callback: mainSidedishCarousel.init.bind(mainSidedishCarousel)
  });

  util.requestData({
    url: BASE_URL + 'course',
    callback: courseCarousel.init.bind(courseCarousel)
  });
});
