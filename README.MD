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
## 구조

MVC패턴을 사용한다

* Model: 상태가 변하는 데이터만 취급

### 메뉴 네비게이션

메뉴 네이게이션에 사용되는 데이터는 정적 데이터다.

* 한 번 렌더링 된 엘리먼트(메뉴레이어)는 재렌더링하지 않도록 함


* * css의 hover와 display를 이용하여 가시성 표현


### TAB UI

