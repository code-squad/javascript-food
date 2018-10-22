## 목표

---

레벨 2에서 하지 못했던 JavaScript 를 레벨3 에서 같이 한다.

- Prototype 디자인 패턴을 사용해서 모듈화 한다.
- Module pattern을 사용해서 private 한 부분을 일부 숨겨본다.

TAB 을 이용한 UI는 화면에 더 많은 데이터를 노출 할 수 있는 좋은 UX다. 이를 활용하기 위해서는 숨겨진 레이어가 필요하고, 각 레이어마다 필요한 데이터를 받아야 한다. 서버사이드에서 데이터를 모두 만들어서 내려줄 수도 있지만, 보통은 Ajax기술을 통해서 데이터를 받아서 처리한다.

- 베스트반찬은 TAB UI로 만든다.
- 처음에는 랜덤하게 특정메뉴가 선택되어져서 보여진다.
- 모든 화면에 필요한 데이터는, 로딩 이후에 Ajax를 통해서 가져와서 노출한다.

<br/><br/>

## 설계

---

1. Level2 (hover event) 에서의 Model (Data) list

   - 메인 메뉴 태그(li) 데이터

2. Level2 (hover event) 에서의 View 및 View Model

   >뷰 모델에서 모델에 의해 데이터가 바뀌면, 뷰에서도 바뀌어야 한다. 뷰에서 뷰 모델을 데이터 바인딩(Data Binding) 방식으로 제공

   - View
     - 
   - ViewModel
     - 

---

1. 탭 UI hover 했을 때, 배경 색과 글씨 색 수정
2. 아래 보여지는 반찬들 수정
   - 이미지와 텍스트들을 교체하는 식으로 진행?
     - prototype
   - **맨 처음 데이터들을 AJAX 로 받아서 전부 만들어놓고**
     **hover event 에 의해서 display의 속성을 바꿔주는 식으로 진행?**
3. 처음에 랜덤하게 특정 메뉴가 선택되도록 구현

---

**Prototype Pattern**

1. 일단 짜보자

<br/><br/>

## 개발로그

---

1. **AJAX 요청해서 잘 받아오는지 확인**

   ![](https://i.imgur.com/jPN61O4.png)

   ```javascript
   function ajax(data) {
     var oReq = new XMLHttpRequest();
     oReq.addEventListener("load", () => {
       const data = JSON.parse(oReq.responseText);
       console.log(data);
     });
     oReq.open("GET", "AJAX 요청할 URL");
     oReq.send();
   }
   
   console.log("SUCCESS LOAD JAVASCRIPT");
   ajax();
   
   ```

   - category_id
   - items (Array)
     - alt
        - badge
        - delivery_type
        - description
        - detail_hash
        - image
        - n_price
        - s_price
        - title

2. `mouseover` - `mouseout ` 과 `mouseenter` - `mouseleave`

   over 와 out 은 자식 엘리먼트 까지 동작하며, enter 와 leave 는 자식 엘리먼트까지 동작하지 않는다.

<br/><br/>

## 알아볼 것

---

- [디자인 패턴(추상 팩토리, abstract factory)](https://www.zerocho.com/category/JavaScript/post/57b9692ae492d01700b0b75a)
- 

<br/><br/>

## AJAX (Asynchronous JavaScript And XML)

---

서버와 통신하기 위해 `XMLHttpRequest` 객체를 사용하는 것을 말합니다.

화면에서의 전체적인 새로고침 없이 필요한 부분만 데이터만 갱신

- JSON (JavaScript Object Notation)

  표준적인 데이터 포맷을 결정하기 위함

  ```json
   {
      "이름": "홍길동",
      "나이": 25,
      "성별": "여",
      "주소": "서울특별시 양천구 목동",
      "특기": ["농구", "도술"],
      "가족관계": {"#": 2, "아버지": "홍판서", "어머니": "춘섬"},
      "회사": "경기 수원시 팔달구 우만동"
   }
  ```

```javascript
// 구버전을 위한 호환성 코드입니다. 더 이상 이렇게 작성하지 않아도 됩니다.
var httpRequest;
if (window.XMLHttpRequest) { // 모질라, 사파리, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 이하
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```

- AJAX는 `send` 와 `open` 하고 끝

- 나중에 `callback` 함수를 통해서 나머지 작업들이 실행됨

- **Cross Domain Problem**

  XHR 통신은 다른 도메인 간 보안을 이유로 요청이 안됨

  CORS 라는 표준적인 방법이 제공되고 있어, 이를 활용하는 경우도 등장함

  JSONP는 비표준(사실상 표준) 이지만 알아보면 좋을 듯 하다

 <br/><br/>

## MVVM(Model-ViewModel-View)

---

1. [MVC, MVP, MVVM 비교](https://magi82.github.io/android-mvc-mvp-mvvm/)
2. [vue파일에서 MVVM 패턴 구현하기](https://juliahwang.kr/vuejs/2017/10/16/vue-2-mvvmpattern.html)
3. [프론트엔드 웹애플리케이션 아키텍쳐 비교분석 : MVC와 MVVM](https://medium.com/@manyoung/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D-mvc%EC%99%80-mvvm-e446a0f46d8c)
4. [JavaScript Intermediate — MVVM vanilla flavour](https://medium.com/@bouab.nabil/javascript-intermediate-mvvm-vanilla-flavour-7f7cfbdf2da6)
5. [JavaScript MVVM — You’re (Probably) Doing it Wrong](https://dzone.com/articles/javascript-mvvm-youre-probably-doing-it-wrong)

---

이전 웹 자판기 프로젝트를 진행하면서 맨 처음에 MVC 로 구성하려고 노력했다. (결과는 스파게티 코드였지만) 그러면서 느낀 것이 Controller 와 Model 및 View 의 의존성이 너무 강해진다는 것을 느꼈다. (아주 단단히 결합된) 특히 나의 코드에서 문제점은 View에서 Controller로 직접 접근했던 코드들이 있어서, 아주 돌돌 꼬여버린 스파게티와 같았다.

그래서 프로젝트 중간에 MVC 에서 MVP 로 바꾸게 되었다. 너무 강하게 결합되어 있는 코드들을 하나둘씩 걷어내며, Presenter를 구성하고 Model과 View를 서로 쳐다보지도 않게 구현하였다. (진짜 거짓말 안치고 너무 힘들었다)

하지만 2개의 패턴들을 사용하면서, 각각의 장단점이 보였다. 뭐 패턴에 정답은 없다는게 느껴졌다. 이번에는 새로운 경험을 위해 MVVM이다. 왜 MVVM 인가 라고 묻는다면 진짜 단순히 딱 하나 `새로운 경험` 을 위한 것일 뿐이다. 아직 개발자라고 하기에도 부끄러운 실력이지만 무엇이든 경험하는것은 좋지 않겠는가?

![https://www.slideshare.net/OleksandrTryshchenko/front-end-architecture-patterns](https://i.imgur.com/IsHjnKJ.png)

![https://juliahwang.kr/vuejs/2017/10/16/vue-2-mvvmpattern.html](https://i.imgur.com/lKafHWh.png)

두가지 데이터 패턴을 사용한다. 이 2가지 패턴으로 인해서 View와 ViewModel은 의존성이 완전히 사라지게 된다. MVP와 마찬가지로 View에서 입력을 받으며, Command 패턴을 통해 ViewModel 에 명령을 내리게 되고, Data Binding 을 통해 ViewModel 의 값이 변화하면 바로 View의 정보가 바뀌어져 버리게 된다.

`ViewModel` 은 `View` 를 추상화(input control 추상화) 하거나 뷰 상태 컬렉션을 사용하는 식이다. 추상화된 뷰 모델(View Model) 은 뷰(View)에 대한 정보를 가지고 있지 않기 때문에 다양한 플랫폼에서 **재사용** 할 수 있다는 장점이 존재한다.

`ViewModel` 은 Model 에서 제공하는 데이터를 사용자 인터페이스에 맞게 상대적인 표현으로 변환하여 표기해야 하는 경우 `값 변환기(ValueConverters)` 를 가진다.

`ViewModel` 은 추상화된 뷰와 실제 뷰를 연결해줄 수 있는 수단이 필요한데, 뷰와 뷰모델의 상태를 동기화 해주는 `데이터 바인딩(Data Binding)` 을 필요로 한다. 해당 요소를 통해 뷰모델이나 뷰가 변경되었을 경우 서로에게 변경사항이 반영되는 것이다.

---

1. View에 입력이 들어오면 Command Pattern 으로 ViewModel 에 명령을 한다.
2. ViewModel은 필요한 데이터를 Model에 요청한다.
3. Model은 ViewModel에 필요한 데이터를 응답한다.
4. ViewModel은 응답 받은 데이터를 가공해서 저장한다.
5. View는 ViewModel 과의 Data Binding 으로 인해 자동으로 갱신된다.

---

- Command 패턴
- Data Binding


- Model
  - 데이터들을 관리
- VIewModel
  - 상태와 연산(명령)
  - View의 실제 논리 및 데이터 흐름을 담당
  - 상태 데이터를 변경하면 즉시 View에 반영
- View
  - UI(User Interface)
  - HTML, CSS

---

1. Model 이 선언된다.
2. ViewModel 이 선언된다. (view_element, model_element)
   1. view_element
   2. model_element : [firstname, lastname]
3. View 가 선언된다.
   - 객체들 조회 (querySelector)
   - new viewModel

---

mouse enter event 적용

1. Model
   - view 에서 불러온 태그들을 매칭시킬 수 있는 name ?
2. ViewModel
   - 현재 밸류 받아옴 ()
3. View
   - 각 li 태그 아이디들 ( 나중에 `addEventListener` 적용할 부분들)
   - view.bind (각 li태그 객체, 각 li태그 네임)

<br/><br/>

## 데이터 바인딩(Data Binding)

---

1. https://www.html5rocks.com/ko/tutorials/es7/observe/

2. https://www.zerocho.com/category/JavaScript/post/5a6578a3c994bd001ba0f9d9

---

`Object.observe()` : 객체의 데이터들의 변경을 비동기적으로 감시하기위한 방법이며, 객체들에 대한 일련의 변경사항들을 `변경이 일어난 시간 순서에 따라` 전달받을 수 있는 감시자(감시 객체, Observer)를 제공

### 무엇을 감시하는가?

- 자바스크립트 객체에 대한 변경
- 속성(Property)들이 `추가` `변경` 되었을 때
- 배열들이 가진 요소(Element) 가 합쳐지거나 나누어졌을 때
- 객체 프로토타입에 대한 변경

### 기존의 Dirty Check

...

<br/><br/>

## Prototype Design Pattern (STEP2)

---

1. [프로토타입_패턴 (위키)](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%ED%8C%A8%ED%84%B4)
2. [프로토타입 기반 프로그래밍 (위키)](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EA%B8%B0%EB%B0%98_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
3. [JavaScript and Prototype Design Pattern](https://www.lvguowei.me/post/javascript-and-prototype-design-pattern/)
4. [JavaScript Prototype Pattern](https://vegibit.com/javascript-prototype-pattern/)

**프로토타입 기반 프로그래밍**은 [객체지향 프로그래밍](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)의 한 형태의 갈래로 [클래스](https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))가 없고, [클래스 기반](https://ko.wikipedia.org/w/index.php?title=%ED%81%B4%EB%9E%98%EC%8A%A4_%EA%B8%B0%EB%B0%98&action=edit&redlink=1) 언어에서 [상속](https://ko.wikipedia.org/w/index.php?title=%EC%83%81%EC%86%8D_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)&action=edit&redlink=1)을 사용하는 것과는 다르게, [객체](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))를 원형([프로토타입](https://ko.wikipedia.org/w/index.php?title=%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_(%EA%B0%9D%EC%B2%B4)&action=edit&redlink=1))으로 하여 [복제](https://ko.wikipedia.org/w/index.php?title=%EB%B3%B5%EC%A0%9C_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)&action=edit&redlink=1)의 과정을 통하여 객체의 동작 방식을 다시 사용할 수 있다. 프로토타입기반 프로그래밍은 **클래스리스**(*class-less*), **프로토타입 지향**(prototype-oriented) 혹은 **인스턴스 기반**(instance-based) 프로그래밍이라고도 한다.

**프로토타입 패턴**(prototype pattern)은 생성할 객체들의 타입이 프로토타입인 인스턴스로부터 결정되도록 하며, 인스턴스는 새 객체를 만들기 위해 자신을 복제(clone)하게 된다.

- 프로토타입 패턴은, [추상 팩토리 패턴](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%ED%8C%A9%ED%86%A0%EB%A6%AC_%ED%8C%A8%ED%84%B4)과는 반대로, 클라이언트 응용 프로그램 코드 내에서 객체 창조자(creator)를 서브클래스(subclass)하는 것을 피할 수 있게 해준다.
- 프로토타입 패턴은 새로운 객체는 일반적인 방법(예를 들어, `new`를 사용해서라든지)으로 객체를 생성(create)하는 고유의 비용이 주어진 응용 프로그램 상황에 있어서 불가피하게 매우 클 때, 이 비용을 감내하지 않을 수 있게 해준다.

```javascript
// The Constructor (Part 1)
// Define an object
// Accept parameters
var Bicycle = function(brand) {
    this.brand = brand;
};
 
// Function Prototype (Part 2)
// Add functionality and extend objects
Bicycle.prototype = {
    goForward: function (percent) {
        percent = ' Bicycle Moving forward at ' + percent + ' percent speed!';
        return percent;
    }
};
 
// Calling Prototype based code
// Resembles traditional OOP styles
// 'New Up' instances, then call methods on that instance
var bike = new Bicycle('ProdecoTech');
var speed = bike.goForward(100);
```

```javascript
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype = {
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
};

var bob = new Person("Bob", "Doe");
console.log(bob.fullname());
```





## 질문

---

1. CSS 에 직접 hover 를 하는 것과 javaScript 에서 hover 이벤트 리스너를 달아주는 것과 코드차이가 나는것을 좀 느꼈습니다. (JavaScript가 더 길음) 더 생산적인 관점에서 어떤것이 나은가요?

<br/></br>

## 피드백

---



<br/><br/>