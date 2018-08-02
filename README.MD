# 배민찬

##이름 규칙

##### 데이터 타입에 따른 명명법

1. 엘리먼트는 'e'를 붙인다: `this.eMenuNavigation`
2. 내부에서만 사용하는 메소드는(private) '_'를 붙인다
3. 인스턴스는 'o'를 붙인다: `this.oTemplate`
4. 바인드된 함수는 'b'를 붙인다: `this.bSelectMoney`

##### 배민찬 레이아웃 명명법

1. 메뉴 네비게이션
   * 각각의 메뉴들은 `menu`라고 한다: 밑반찬, 메인반찬 등
   * 마우스가 오버되어 나타나는 레이어를 `menuLayer`라고 한다
   * menuLayer의 하위 메뉴들을 `subMenu`라고 한다: 메인반찬의 고기반찬, 생선반찬, 튀김 등

## 구조

MVC패턴을 사용한다

##### 메뉴 네비게이션

`MenuNavigation` <-> `Controller` <-> `Model`

* MenuNav는 모델로부터 모든 데이터를 넘겨받아 렌더링
  * template 이용
* ~~마우스 오버될 때 마다 렌더링하기로 함~~ (퍼포먼스 문제)
* 한 번 렌더링 된 엘리먼트(메뉴레이어)는 재렌더링하지 않도록 함
  * css의 hover와 display를 이용하여 가시성 표현