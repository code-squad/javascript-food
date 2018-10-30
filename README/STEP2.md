## 목표

---

- 다양한 마우스 이벤트에 따른 레이어 노출등의 컨트롤
  - 상단메뉴에 마우스 오버시 메뉴를 출력
  - 메뉴 하위텍스트에 마우스 오버시 밑줄 및 색 변화
- Protytpe디자인 패턴을 사용해서 모듈화
- Module pattern을 사용해서 private한 부분을 일부 숨겨본다.

이벤트가 발생한 지점을 기준으로 거기에 맞는 레이어를 잘 위치를 파악해서 노출해야 한다. event listener에 전달되는 event 객체이 있는 다양한 위치값 정보를 이용하면 좋다.

<br/><br/>

## 설계

---

1. 호버 이벤트
   1. 배경, 글자 색 변경
   2. 아래 ul-display 속성 변경
2. li > a 재구성 (width, height)
3. ul 에 메뉴들 구성
4. ul > li 에도 호버 이벤트
   1. 글자색 및 밑줄 구현

---

1. li > a 재구성 (width, height)
2. li > a hover 이벤트 적용 (bg, font color)

<br/><br/>

## 개발로그

---



<br/><br/>

## 알아볼 것

---

1. [px, em, rem](https://webdesign.tutsplus.com/ko/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984)

<br/><br/>

## CSS Tag

---



<br/><br/>

## 질문

---



<br/></br>

## 피드백

---

1. nth-child 의 사용을 자제할 것 (좋은 DOM 구조가 나올 수가 없음)
   그리고, 내가 직접 어떤 컨텐츠를 추가할 때도, `li:nth-child` 라는 부분에 의해서 다른 style sheet 가 적용되는 부분들을 겪으니 최대한 클래스로 처리하는게 좋을 듯
2. var good

<br/><br/>