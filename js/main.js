
const getData = (() => {
  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';

  const urls = {
    bestseller: BASE_URL + 'best'
  }

  const getURL = (params) => {
    if (params.type === 'bestseller') {
      return urls[params.type];
    }
  }

  return (params) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(evt, res) {
      if (this.readyState == 4 && this.status == 200) {
        const response = evt.target.response;
        params.callback(response);
      }
    };

    xhttp.open("GET", getURL(params), true);
    xhttp.send();
  }
})();

function makeTabs(response) {
  const jsonData = JSON.parse(response);

  jsonData.forEach((tabItem) => {

    //1. tab 버튼 생성

    //2. ul 태그 생성
    
    //3. thumbnail dom 생성후 data 바인딩하기
    
    //4. tab 버튼 add click event

  });

  //5 초기화 (첫 번째 버튼에 active 클래스 추가 / 첫 번째 ul "display: block")
}

window.addEventListener('DOMContentLoaded', () => {
  getData({
    type: 'bestseller',
    callback: makeTabs
  });
});
