window.addEventListener('DOMContentLoaded', () => {
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

  const courseCarousel = new Carousel({
    container: document.querySelector('.course .carousel--thumbnails'),
    itemTemplate: document.querySelector('#sidedishThumbnail'),
    getItemHTML: TabMenu.prototype.getThumbnailHTML,
    visibleItems: 4,
    itemPadding: '15px',
    usingIndicator: false
  });

  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';

  util.requestData({
    url: BASE_URL + 'best',
    callback: bestsellerTab.init.bind(bestsellerTab)
  });

  util.requestData({
    url: BASE_URL + 'main',
    callback: sidedishCarousel.init.bind(sidedishCarousel)
  });

  util.requestData({
    url: BASE_URL + 'course',
    callback: courseCarousel.init.bind(courseCarousel)
  });
});
