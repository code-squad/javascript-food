## 목표

---

1. requestAnimationframe을 사용해서 애니메이션을 구현한다. (raf.js 로 저장)
2. transition 을 이용한 방법으로 애니메이션을 구현한다 (transition.js로 저장)

두가지 방식을 모두 구현한다

<br/><br/>

## 설계

---

- [x] HTML 아래 동그라미 네비 버튼 추가하기
- [ ] 각 화살표 이벤트 등록하기
  - [x] transition
    - [x] 버튼에 따른 이벤트 구현
  - [ ] requestAnimationFrmae

<br/><br/>

## 개발로그

---

- **requestAnimationframe.js**

  - [REQUEST ANIMATION FRAME](https://flaviocopes.com/requestanimationframe/)

- **transform**

  - JS-Click Event 연동
  - https://codepen.io/thetallweeks/pen/boinE
    - CSS 에 `클래스명-active` 를 따로 구성해놓고 (결과 부분을 코드로 작성)
    - ClassList 를 이용해서 `add` `remove` 해주면 된다

- **HTML에 ul>li 태그 추가**

  - Emmet 사용하니 편함

- **transition**

  - CSS에 클래스를 구성하고, JS에서 classList 를 이용해 제거해주는 식으로 진행

- **[raf (Request Animation Frame)](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)**

  ```javascript
  var start = null;
  
  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
  
    var progress = timestamp - start;
  
    // Use progress to do something.
  
    if (progress < 1500) {
      window.requestAnimationFrame(step);
    }
  }
  
  window.requestAnimationFrame(step);
  ```

  기본 Request Animation 의 코드

  두개를 테스트 돌려보는데, 속도의 차이가 난다.

  - 배속(곱하기)을 이용했다

  - https://blog.coderifleman.com/2016/12/02/request-animation-frame-test/
  - https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution?hl=ko
  - 함수를 전달하니, this 의 기준이 달라졌다고 하는게 맞나(?)
    - 무튼, Class의 constructor에서 생성한 인자들을 인식하지 못함
    - 왜 그런지 알겠는데 말로 설명은 못하겠음 `이 부분 공부할 것`

- **HTML 아래에 동그란 네비게이션 (slides_pagination) 추가**

  - bottom 속성을 알아볼 것 (아래에서 해당 px 만큼 위치시키는 것 같음)
  - `border-raidus : 50%` 속성을 이용해서 동그라미로 표현
  - `ul > li > a` 를 이용해서 구현

- **classList 를 이용해 class 속성을 추가할 경우 CSS 우선순위**

  - 일단 CSS에서 구체적으로 (ex. body > span) 으로 적용한 배경에서
  - classList를 이용해 어떤 클래스를 추가해줬을 경우
  - 우선순위에 밀려서 적용이 되지 않는 경우가 발생한다.
  - 어떻게 해결해야할까?
    - 일단은 id 속성으로 제공하긴 했는데...

- **리스너를 통한 함수실행**

  - 현재 bannerIdx 만 증가시켜주거나 감소시켜주거나 하는 식으로 진행
  - Model 에서의 set 함수가 불리면, Listener 을 통해서 subscribe 된 함수들을 실행

  - Listener 는 한번에 실행되는데, 현재는 값이 바뀌고만 적용되어야 함
  - 안숨겨도 되고, z-index 값만 바뀌어도 괜찮다는 생각이 떠오름

<br/><br/>

## Animation

---

1. JS 코드에 일어날 결과를 작성한다

   ```javascript
   var boxElement = document.querySelector('.box');
   
   boxElement.addEventListener('click', function(evt){
     evt.target.style.height = "200px";
     evt.target.style.width = "200px";
   });
   ```

2. CSS에 `transition` 속성을 이용하여, 아래와 같이 설정하면 애니메이션이 동작한다.

   `transition: all 1s ease-in`

- **[transform](https://developer.mozilla.org/ko/docs/Web/CSS/transform)**

  ```
  transform: none
  transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)
  transform: translate(12px, 50%)
  transform: translateX(2em)
  transform: translateY(3in)
  transform: scale(2, 0.5)
  transform: scaleX(2)
  transform: scaleY(0.5)
  transform: rotate(0.5turn)
  transform: skewX(30deg)
  transform: skewY(1.07rad)
  transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0)
  transform: translate3d(12px, 50%, 3em)
  transform: translateZ(2px)
  transform: scale3d(2.5, 1.2, 0.3)
  transform: scaleZ(0.3)
  transform: rotate3d(1, 2.0, 3.0, 10deg)
  transform: rotateX(10deg)
  transform: rotateY(10deg)
  transform: rotateZ(10deg)
  transform: perspective(17px)
  
  transform: translateX(10px) rotate(10deg) translateY(5px)
  ```

  transform 은 **GPU 렌더링**을 통해 빠르게 처리할 수 있다.

    `transform: translate3d()` 안의 속성들을 바꿔주면 <u>굉장히 빠르게</u> 동작한다.




<br/><br/>

## 질문

---

<br/><br/>

## 피드백

---

<br/><br/>

