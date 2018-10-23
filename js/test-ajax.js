function ajax(data) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", () => {
    const data = JSON.parse(oReq.responseText);
    console.log(data);
  });
  oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
  oReq.send();
}

// console.log("SUCCESS LOAD JAVASCRIPT");
// ajax();
