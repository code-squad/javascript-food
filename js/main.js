
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

function makeListElement(data) {
  const listElement = document.createElement('li');
  listElement.dataset.index = data.index;
  listElement.textContent = data.text;

  return listElement;
}

function getThumbnailHTML(template, data) {
  const keys = Object.keys(data);
  let htmlStr = template.innerHTML;

  keys.forEach((key) => {
      htmlStr = htmlStr.replace(`{{${key}}}`, data[key]);
  });

  htmlStr = htmlStr.replace('{{n_price}}', '');

  const tempNode = document.createElement('div');
  tempNode.innerHTML = htmlStr;

  const deliveryInfo = tempNode.querySelector('.wrap-delivery-info');
  const tags = tempNode.querySelector('.thumbnail__tags');

  //delivery types
  data.delivery_type.forEach((type, index) => {
    if (index !== 0) {
      const separator = document.createElement('hr');
      deliveryInfo.appendChild(separator);
    }

    const info = document.createElement('sapn');
    info.textContent = type;
    
    deliveryInfo.appendChild(info);
  });

  //tag
  if (data.badge) {
    data.badge.forEach((tagName, index) => {
      const tag = document.createElement('li');
      tag.textContent = tagName;
      tags.appendChild(tag);
    });
  }

  return tempNode.innerHTML;
}

function makeTabs(response) {
  const jsonData = JSON.parse(response);
  const containerElement = document.querySelector('.bestseller > .container');
  const tabElement = document.querySelector('.bestseller .tabs');
  const bestItemElement = document.querySelector('#bestItemTemplate');

  jsonData.forEach((category, index) => {
    //1. tab 버튼 생성
    const tabButton = makeListElement({
      index: index,
      text: category.name
    });

    tabElement.appendChild(tabButton);

    //2. ul 태그 생성
    const thumbnailList = document.createElement('ul');
    thumbnailList.classList.add('thumbnails');
    thumbnailList.dataset.index = index;
    
    //3. thumbnail dom 생성후 data 바인딩하기
    category.items.forEach((item) => {
      const thumbnailTemplate = document.querySelector('#bestItemTemplate');
      const thumbnailHTML = getThumbnailHTML(thumbnailTemplate, item);

      thumbnailList.innerHTML += thumbnailHTML;
    });

    containerElement.appendChild(thumbnailList);
  });

  //4. tab 버튼 add click event
  const thumbnailLists = document.querySelectorAll('.thumbnails');

  tabElement.addEventListener('click', (evt) => {
    const currentIndex = tabElement.dataset.currentIndex;
    const selectedIndex = evt.target.dataset.index;

    // button active toggle
    tabElement.children[currentIndex].classList.remove('active');
    evt.target.classList.add('active');

    // ul display toggle
    thumbnailLists[currentIndex].style = 'display: none;';
    thumbnailLists[selectedIndex].style = 'display: block;';

    tabElement.dataset.currentIndex = selectedIndex;
  });

  //5 초기화 (첫 번째 버튼에 active 클래스 추가 / 첫 번째 ul "display: block")
  tabElement.children[0].classList.add('active');
  thumbnailLists.forEach((thumb) => thumb.style = 'display: none;');
  thumbnailLists[0].style = 'display: block;';
}

window.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';

  requestData({
    url: BASE_URL + 'best',
    callback: makeTabs
  });
});
