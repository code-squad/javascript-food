# 배민찬

##이름 규칙

##### 데이터 타입에 따른 명명법

1. 엘리먼트는 'el'을 붙인다: `this.elMenuNavigation`
2. 내부에서만 사용하는 메소드는(private) '_'를 붙인다
3. 인스턴스는 'o'를 붙인다: `this.oTemplate`
4. 바인드된 함수는 결국 이벤트 다루는 함수이므로 'handle'을 붙인다: `this.handleSelectMoney`

##### 배민찬 레이아웃 명명법

1. 메뉴 네비게이션
   * 각각의 메뉴들은 `menu`라고 한다: 밑반찬, 메인반찬 등
   * 마우스가 오버되어 나타나는 레이어를 `menuLayer`라고 한다
   * menuLayer의 하위 메뉴들을 `subMenu`라고 한다: 메인반찬의 고기반찬, 생선반찬, 튀김 등
2. 베스트 반찬
   * 베스트 반찬 nav의 분류들을 `category`라고 한다
   * 한 카테고리 안에 있는 베스트 반찬들을 `bestDishes`라고 한다
   * 각각의 베스트 반찬들을 `bestDish`라고 한다
   * `bestDish`는 `image`와 `desciption`으로 구분된다
   * `description`은 1. name 2. slogan 3. originPrice 4. salesPrice로 구성된다
   * bestDIshesView에서 'display'는 `render`와 `activate`를 함께 포함하는 말이다
## 구조

디자인 패턴: MVC패턴

레이아웃을 구성하는 요소

1. 메뉴 네비게이션: `MenuNavigation`
2. 베스트 반찬(TAB UI): `BestDishesNavigation` + `bestDishesView` (controller로 연결)
3. 화면전환 UI
   * `t_NavigatorStyleSceneChange` : css의 transition을 사용한 화면전환 ui
   * `r_NavigatorStyleSceneChange` : js의 requestAnimationFrame을 사용한 ui

### 1. 메뉴 네비게이션

```javascript
const menuNavigation = new MenuNavigation({
  menuNavigation: // 메뉴 네비게이션이 들어가는 wrapper 엘리먼트
  template: // 메뉴 네비게이션 템플릿
})
menuNavigation.render({menuData}) // {munuName: '', subMenuData: ['','']} 형태의 객체
```

##### 기능

메뉴이름에 마우스오버되면 **서브메뉴 레이어**가 펼쳐진다: css의 hover를 통해 구현

##### 고려사항

1. 마우스 오버시에만 나타나는 **서브메뉴 레이어**는 다시 렌더링 하지 않기 위해 templating결과를 보관한다
   * 보관 장소: model(x), html(o) 정적 데이터는 model에 보관하지 않는다
   * templating된 서브메뉴 레이어는 html에 보관하여 css를 통해 꺼내쓴다
2. 일회성 데이터가 되버린 menuData는 인스턴스 속성으로 넣지않고 `render`메소드를 통해 외부에서 주입

### 2. 베스트 반찬 - TAB UI

```javascript
const bestDishesNavigation = new BestDishesNavigation({
  bestDishesNavigation: // 네비게이션 엘리먼트
})

const bestDishesView = new BestDishesView({
  bestDishesView: // 뷰 wrapper 엘리먼트
  template: // 템플릿
  ajax: // xhr통신을 하는 함수
  baseURI: // xhr통신을 위해 사용되는 uri
});

const controller = new Controller({
    ...
    view: {
    	bestDishesNavigation
    	bestDishesView
  	}
})
```

##### 기능

베스트 반찬 navigation을 누르면 bestDishesView에 정보가 노출된다: **AJAX**를 이용

##### 고려사항

1. AJAX는 외부에서 이루어지게 한다: `ajax` 함수를 주입받음
   * view나 controller에 관련없는 XHR통신을 하는 코드를 넣을 필요가 없음
   * `ajax`함수는 콜백함수를 주입받아 로드가 완료되면 데이터와 함께 콜백함수를 호출한다
2. AJAX를 통해 받아온 데이터는 다시 요청하지 않는다
   * 보관장소의 문제: model, view의 속성, html 다 상관없었지만 메뉴레이어와 같이 html에 보관
   * templaing을 다시 할 필요 없게끔 html에 보관하고 css를 통해 보여줌(classList 사용)
3. 둘 사이의 관계는 controller가 맡는다

### 3. 화면전환 UI

```javascript
const newDishes = new NavigatorStyleSceneChange({
  sceneList: // 사용되는 이미지(scene)의 {nodeList}
  leftButton: // 좌클릭 버튼 엘리먼트
  rightButton: // 우클릭 버튼 엘리먼트
  leftAnimation: // 좌클릭 시 실행 될 애니메이션 {Function}
  rightAnimation: // 우클릭 시 실행 될 애니메이션 {Function}
  navigatorWrap: // 화면전환 네비게이터의 wrapper 엘리먼트
  navigatorButtonTemplate: // 화면전환 네비게이터 버튼 템플릿 {Function}
  activeNavigatorButtonStyle: // 네비게이터 버튼이 눌렸을 시 적용될 style(className) {string}
})

newDishes.init();
```

화면전환 UI는 배민찬의 많은 부분을 구성하는 중요한 UI이므로 재사용이 가능하도록 구현하려고 노력함. 따라서 인자를 구체적으로 받는다.

##### 기능

클릭된 버튼에 따라 주입된 애니메이션을 실행시켜 화면을 전환한다: css transition과 requestAnimationFrame을 각각 이용하여 구현

* transition이용: t_NavigatorStyleSceneChange(transition.js)
* requestAnimationFrame이용: r_NavigatorStyleSceneChange(raf.js)

##### 고려사항

1. scene의 개수에 따라 동적으로 네비게이터 버튼을 생성
   * 이미지가 자주 변경되는 화면전환 UI의 특성을 고려함
2. animation 함수: 범용성을 고려해서 최대한 단순화 시키면서, 중요한 interface는 사용자가 직접 선택하게끔 구현
   * `previous`와 `next`만 입력받으면 둘 사이의 애니메이션을 실행
   * `speed`와 `type`을 입력받아 애니메이션을 조절할 수 있음
   * **currying**을 사용해서 함수인데도 불구하고 speed나 type같은 정보를 기억하도록 함
3. css 애니메이션과 js 애니메이션을 혼합하여 사용하지 않도록 함
   * 혼합하여 사용하면 우선도 문제때문에 애니메이션이 제대로 작동하지 않을 수 있음


### 4. 슬라이드 UI

```javascript
const sideDishes = new SlideStyleSceneChange({
  wrapper: // wrapper 엘리먼트
  leftButton: // left button 엘리먼트
  rightButton: // right button 엘리먼트
  SceneTemplate: // scene 템플릿
  uri: // ajax가 이용한 uri
  ajax: // ajax 함수
  throttle: // throttle 함수
  animationDuration: // 애니메이션 시간
})

sideDishes.registerAllEventListener();
```

슬라이드 효과 또한 배민찬에서 자주 사용되는 UI이므로 재사용성을 높일 수 있도록 구현. 화면전환 효과와는 다르게 애니메이션이 정해져 있으므로(슬라이드) 애니메이션을 옵션으로 주지는 않는다

##### 기능

DOMContentLoaded 이벤트가 발생하면 ajax를 통해 데이터를 불러와 렌더링한다. 좌우 버튼을 누르면 장면이 슬라이드된다. 슬라이드는 **무한 롤링**되어야 한다. 한 화면에 보여질 수 있는 아이템의 개수를 n이라고 할 때

* ajax를 통해 가져오는 데이터의 개수가 n의 배수: 버튼 클릭 시 n개의 아이템이 슬라이드
* 그 이외의 경우: 1개씩 슬라이드

##### 고려사항

1. 무한 롤링 구조
   * 기준이 되는 mainSceneList 앞 뒤로 똑같은 형태의 dummyScenceList 구현
   * `leftDummyScene` <-> `mainScene` <-> `rightDummyScene`
   * 맨 뒤(맨 앞)에서 다음(이전) 버튼을 누르면 dummyScene을 이용해 애니메이션을 시작
   * dummyScene 애니메이션이 완료되면 mainScene으로 돌아감
2. 일정 시간동안 이벤트 리스너 통제: **event throttling**
   * 버튼을 연속해서 누를 경우 애니메이션이 잘 동작하지 않는 문제
   * 버튼을 누른 후 애니메이션이 완료될 때까지 이벤트 리스너의 호출을 통제하는 함수 구현:`throttle`
3. 이동거리 동적 설정
   * 슬라이드 UI에서 추후에 변경될 사항을 ui의 크기(wrapper의 크기 & 한 화면에 노출되는 아이템의 개수)라고 설정
   * ui변경에 맞춰서 애니메이션의 이동 거리를 동적으로 생성하도록 구현: `element.offsetWidth`