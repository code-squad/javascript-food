
var util = {
  requestData(params) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(evt, res) {
      if (this.readyState == 4 && this.status == 200) {
        const response = evt.target.response;
        params.callback(response);
      }
    };

    xhttp.open("GET", params.url, true);
    xhttp.send();
  },
  getHTMLFromTemplate(template, data) {
    const keys = Object.keys(data);
    let htmlStr = template.innerHTML;

    keys.forEach((key) => {
        htmlStr = htmlStr.replace(`{{${key}}}`, data[key]);
    });

    htmlStr = htmlStr.replace('{{undefined}}', '');
    return htmlStr;
  },
  addClass(target, className) {
    target.classList.add(className);
  },
  removeClass(target, className) {
    target.classList.remove(className);
  },
  toggleClass(target, className) {
    if (target.classList.contains(className)) {
      this.removeClass(target, className);
    } else {
      this.addClass(target, className);
    }
  }
};
