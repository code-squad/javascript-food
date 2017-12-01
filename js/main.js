
function requestData(params) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(evt, res) {
    if (this.readyState == 4 && this.status == 200) {
      const response = evt.target.response;
      params.callback(response);
    }
  };

  xhttp.open("GET", params.url, true);
  xhttp.send();
}

const carouselImages = {
  main: [
    'img/banner_main1.jpg',
    'img/banner_main2.jpg',
    'img/banner_main3.jpg',
    'img/banner_main4.jpg'
  ],
  newItems: [
    'img/banner_item1.jpg',
    'img/banner_item2.jpg',
    'img/banner_item3.jpg',
    'img/banner_item4.jpg',
    'img/banner_item5.jpg'
  ],
  notices: [
    'img/banner_notice1.png',
    'img/banner_notice2.jpg',
  ]
};

window.addEventListener('DOMContentLoaded', () => {
  (new Carousel({
    images: carouselImages.main,
    imageType: 'background',
    dotStyle: 'big',
    selector: '.carousel--main'
  })).init();

  (new Carousel({
    images: carouselImages.newItems,
    dotStyle: 'small',
    selector: '.carousel--new-items'
  })).init();

  (new Carousel({
    images: carouselImages.notices,
    dotStyle: 'small',
    selector: '.carousel--notices'
  })).init();
  
  const bestsellerTab = new TabMenu({
    buttons: '.bestseller > .container > .tab-buttons',
    contents: '.bestseller > .container > .tab-contents'
  });

  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';

  requestData({
    url: BASE_URL + 'best',
    callback: bestsellerTab.init.bind(bestsellerTab)
  });
});
