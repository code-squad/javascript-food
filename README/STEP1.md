## 목표

---

- 기획서와 동일한 UI를 구성
- 하위 메뉴등의 텍스트는 동일해도 상관 없음
- 배치와 간격이 일정
- `float` 를 사용해서 전체 레이아웃을 잡고
- 내부 레이아웃(배치)를 할 때는 `float`를 역시 사용하거나, `position`속성을 사용해서 배치한다.

<br/><br/>

## 개발로그

---

1. html 구조 설계
   1. 헤더영역
      1. 로그인, 회원가입, 마이페이지
      2. 로고, 검색창, 베스트, 알뜰쇼핑, 출석체크
   2. GNB(?) 영역
   3. 컨테이너
2. 크기는 내 맥북기준 `1680 * 6198`
3. 가운데정렬은 `width` 지정 후, `margin: 0 auto;`
4. `display` 이 `block` 일 때, width 100% 되는 특성을 상단 레이아웃에 적용하고, 안의 태그들에 `inline` 요소를 적용하여 가로로 배열하는 식으로
5. `position` 속성을 이용하여, `relative` 와 `absolute` 를 잘 이용할것 (`left` `top` `right` `bottom` 잘 이용)
6. `max-width` 속성을 이용하면, 고정된 width 를 제공할 수 있다
   1. `background-repea` 와 `background-position: center;` 속성을 이용해서, 가로로 긴 이미지를 가운데로 위치시킬 수 있음 ()

<br/><br/>

## 모르는 것

---

1. wrapper * container
2. GNB
3. `nbps;` : 공백
4. [position 속성](http://ko.learnlayout.com/position.html)
5. 

<br/><br/>

## 알아볼 것

---

1. id="tdd" 의 의미
2. inline-block : zoom=1
3. top_navi 부분(로그인, 로그아웃)에서 padding 을 각각줬을때의 background 작용 원리
4. `dㅣ` `dt` `dd` 각 차이점, 언제 쓰는지
5. inline-block
6. px, em

<br/><br/>

## CSS Tag

---

1. **display**

   1. none
   2. block
      - 기본적으로 길이가 100% 이며, 줄바꿈 됨
   3. inline
      - 줄바꿈 되지 않으나, width, height 지정 불가능
   4. inline-block
      - 줄바꿈 되지 않으나, width, height 지정 가능

2. **position**

   `fixed` 와 `absolute` 를 사용하면 div 의 `width: 100%` 조건이 없어짐

   1. static
   2. relative : 원래 있던 위치를 기준으로 `top` `left` 가 동작
   3. fixed
   4. absolute : `절대좌표` 를 기준으로 동작 (top, left)

3. **float**

   위에서 아래로 흐르는 것은 동일하며, `left` 와 `right` 를 이용할 시, display 속성은 무시된다 (`none` 은 제외)

   1. inherit
   2. left
   3. right
   4. none

4. **clear**

   float 속성을 이용해서, 태그들을 부유시킨 이후 문서의 흐름을 제거하기 위해 사용

   1. left
   2. right
   3. both : 둘다 제거

5. **padding**

   1. 3개의 인자는 top, left and right, bottom 순으로 적용

6. **dl** **dt** **dd**

   ![](https://i.imgur.com/nSCNAn2.png)

7. **이미지 원으로 처리하는 방법**

   부모의 `div` 에 `border-radius: 50%` 속성을 준다. 그리고 `position: relative` 속성을 지정한다.

   `overflow: hidden` 속성을 제공하지 않으면, 외부로 벗어난 이미지들이 보이게 된다.

   자식으로 `img` 태그를 선언한 후, 해당 속성에 `max_width: 100%` 와 `position: absolute` 를 지정한 후, `left` 와 `top` 값을 제공한다.

8. li 여러개 적용할때에는 `:nth-child(5), nth-child(6), nth-child(7)` 이런식으로 적용한다.

9. **[var 함수](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_variables)**

   ```css
   :root {
       --border-bg-color: coral;
   }
   
   background-color: var(--border-bg-color);
   위와같이 적용
   ```

<br/><br/>

## 질문 & 피드백

---

1. 태그의 차이가 존재하나요?
   배달의 민족이나 카카오페이지 같은 경우에는 태그를 전부 div 로 통일한 후 (script 제외) 각 태그의 id 를 header, navi, content, footer 로 설정하였고, 아마존 같은 경우에는 전부 div 로 통일하지 않고 header 같은 경우는 header 태그를 사용한것을 확인할 수 있었는데요.

   Layout 태그는 명확하다. 태그로 의도를 알 수 있게 해주는 것이 중요하다. `Semnatic tag` 웹접근성에서 굉장히 좋은 것이다.

   검색 키워드 : 스크린리더기 (웹 접근성)

2. user agent stylesheet(브라우저 맘대로 margin 값을 제공하여 뜻하는데로 보이지 않았습니다) 을 제거하기 위해서 [CSS 초기화 구문](https://meyerweb.com/eric/tools/css/reset/)을 사용하는데요. 이것 말고 방법이 있나요? 해당 초기화 구문을 사용하게 되면 웹 성능에 저하가 생긴다고 합니다. (모든 태그에 대해서 스타일 시트를 만드는 작업 등으로 인한..)

3. 임의의 px을 주되,혼자 개발할때는 가이드 라인이 없으므로, 간격은 동일한 px을 제공하며, 나머지 width 및 height는 가변적으로 적용한다. HTML은 계층적이므로 밖에서 안으로 태그를 작성한다.

4. 언더바보다는 dash 형태를 적용해서 가독성을 높인다.

5. css 분리를 합니다.
   - common.css
   - main.css
6. `page_up_down_list` vs `list_page_up_down`
7. 이미지를 한꺼번에 합치는 부분들은, 웹페이지를 요청할 때 성능을 높이기 위하여, 한번 불러오고 split 를 적용한다.
   불러올때 마다 헤더파일을 만들고, 작업이 배가 되는 부분들을 최소한으로 줄이기 위함

---

1. reset CSS 같은 파일들은 별도의 path 로 구성
2. CSS 를 나중에 구분하기 위한 주석은 좋음
3. 포털들이 기본적으로 사용하는 너비는 `960px` `980px` 정도로 사용한다.
4. font-size 와 box-model 에서 상대적인 비율(em)으로 룰을 정해서 사용해보는 것도 좋다.
   `px` 보다는 `em` 이 더 많이 사용되며, `rem` 도 좋다고 하여 사용하는 추세이다.
5. 

<br/><br/>