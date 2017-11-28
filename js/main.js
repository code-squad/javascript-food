
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

window.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://crong.codesquad.kr:8080/woowa/';
  
  const bestsellerTab = new TabMenu({
    buttons: '.bestseller > .container > .tabs',
    contents: '.bestseller > .container'
  });

  requestData({
    url: BASE_URL + 'best',
    callback: bestsellerTab.init.bind(bestsellerTab)
  });
});
