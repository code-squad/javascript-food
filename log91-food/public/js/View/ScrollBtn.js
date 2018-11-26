import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";
import { RequestAnimations } from '../Util/raf.js'

export default class ScrollBtn {
  constructor({ scrollBtnTpl, className, speed, leftValue, topValue }) {
    this.scrollBtnTpl = scrollBtnTpl;
    this.className = className;
    this.speed = speed;
    this.leftValue = leftValue;
    this.topValue = topValue;
  }
  init() {
    this.render();
    this.registScrollEvent();
  }

  render() {
    const scrollNode = document.createElement('div');
    scrollNode.classList.add(this.className);
    scrollNode.innerHTML = this.scrollBtnTpl;
    this.setCoordiantes(scrollNode, this.leftValue, this.topValue);
    document.body.appendChild(scrollNode);
    // document.querySelector('.search_bar>ul').firstElementChild.focus();
    $on(qs('.search_wrap'), 'keydown', e => {
      if (!qs('.search_auto_drop')) return;
      if (e.code === 'ArrowDown') {
        if (!qs('.search_auto_drop_hl')) {
          qs('.search_auto_list').firstElementChild.classList.add('search_auto_drop_hl');
          // debugger;
          console.log('wfewfwef');
          return;
        }
        // debugger;
        if (!qs('.search_auto_drop_hl').nextElementSibling) return;
        qs('.search_auto_drop_hl').nextElementSibling.classList.add('search_auto_drop_hl');
        qsa('.search_auto_drop_hl')[0].classList.remove('search_auto_drop_hl');
      }
      else if (e.code === 'ArrowUp') {
        if (!qs('.search_auto_drop_hl').previousElementSibling) return;
        console.log(qs('.search_auto_drop_hl').previousElementSibling.classList);
        qs('.search_auto_drop_hl').previousElementSibling.classList.add('search_auto_drop_hl');
        qsa('.search_auto_drop_hl')[1].classList.remove('search_auto_drop_hl')
      }
      else if (e.code === "Enter") {
        if (!qs('.search_auto_drop_hl')) return;
        const completed = qs('.search_auto_drop_hl').firstElementChild.innerHTML.replace(/\<strong\>|\<\/strong\>/g, '');
        qs('.search_bar_in').value = completed;
        qs('.search_auto_list').innerHTML = '';
      }
      return;
    });
    $on(qs('.search_bar_in'), 'input', e => {
      console.log(e.target.value);
      fetch(`http://crong.codesquad.kr:8080/ac/${e.target.value}`)
        .then(response => { return response.text(); })
        .then(response => {
          if (!Array.isArray(JSON.parse(response))) {
            document.querySelector('.search_bar>ul').innerHTML = '';
            return;
          }
          // document.querySelector('.search_bar>ul').innerHTML = '';
          const parsedData = JSON.parse(response);
          parsedData[1].forEach(v => {
            v = v[0].replace(parsedData[0], `<strong>${parsedData[0]}</strong>`);
            // console.log(v.replace(response, 'hello'));
            document.querySelector('.search_bar>ul').innerHTML += `
            <div class="search_auto_drop"><span class="search_auto_drop_sp">${v}</span></div>
            `
          });

        });
    });
  }

  setCoordiantes(node, top = "500px", left = "1180px") {
    node.style.top = top;
    node.style.left = left;
  }

  registScrollEvent() {
    $on(qs(`.${this.className}`), 'click', e => {
      e.preventDefault();
      if (e.target.className.match(/down/g)) RequestAnimations.scrollDown(e.pageY - e.clientY, document.body.offsetHeight, this.speed);
      if (e.target.className.match(/up/g)) RequestAnimations.scrollUp(e.pageY - e.clientY, 0, this.speed);
    })
  }
}