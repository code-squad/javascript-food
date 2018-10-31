## 목표

---

1. requestAnimationframe을 사용해서 애니메이션을 구현한다. (raf.js 로 저장)
2. transition 을 이용한 방법으로 애니메이션을 구현한다 (transition.js로 저장)

두가지 방식을 모두 구현한다

<br/><br/>

## 설계

---

- [ ] HTML 아래 동그라미 네비 버튼 추가하기
- [ ] 각 화살표 이벤트 등록하기
  - [ ] transition
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
  - 

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

