javascript level3

배민찬 설계 !

## 컴포넌트들을 나눠서 설계해보자 !

### 공부해서 적용해보고 싶은 라이브러리들 

툴 적용 
style, bundle, webserver, test
* sass -> css 사용을 더 효과적으로 하기 위해 
* webPack -> 모듈 & 빌드환경 구축 공부 하기 위해  
* express -> 웹 서버를 띄워서 데이터를 주고 하기 위해 
* jest -> test 

### 피드백
애니메이션 구현사항 보고 잘 구현
바벨, 웹팩-> ie9/10 모듈/번들 css Animation!->앱 라이크한 애니매이션 (transition transform)
공식 문서로 보고 적용할 것

비동기 
Ajax cross domain / 서버에서 해결하는 것을 해보기 /  cors
헤더값 설정 
jsonp /script실행
* xhr HTTPReqeust

AJAX!!!
비동기 충분히 이해하고 -> 프로미스 패턴 -> fetch/ axios -> async await -> Error처리 -> Generator 

cf)
xml/json 파싱이 어렵 데이터 큼 아직 둘다 쓰임 
graphql

templateRendering 
es6 
promise 
fp curying, pipe, 

패턴 보다 -> 협력 / 의존성 으로 풀어서 얘기 
브라우저 호환성 !/ 세련된 정확한 인터렉션 -> 더 낫게 하기 위한 고민/적용

자동검색
디바운스  시간/
쓰로트링  스크롤 ex) 100ms마다 실행해라 

모바일 웹 터치이벤트 <-> 클릭

슬라이더
dom조작 

#### rough Mark up 
```
header 
 download , nav 
 title , searchboar , ul-linked 
 
main
 section 
 - main menu
 - slider (L)
 - slider (M)*2
 
 section 1 bestSeller 
 - nav
 - album preview 
 
 section 2 
 * 2-1 밑 반찬
 - slider
 - banner
 * 2-2 메인 반찬
 - slider 
 - banner
* 2-3 국 찌개 
 - slider 
 - banner
 * 2-4 간편식 
 - slider 
 - banner
 * 2-5 간식
 - slider 
 - banner
 
 section 3 qnA 
 - nav qnA 
 - notice 
 - contect info 

footer
- nav 
- company info 

```
#### Component 

공통으로 사용할 수 있어 보이는 모듈들 파악하기  
* nav 
* dropdown 
* header 
* slider 
* footer
* album 


배민앱 다운로드 -> dropdown 
nav  1. 로그인 ~장바구니 
2. 밑반찬 - 브랜드관 

3. Search 

### css 그리드

그리드로 틀 잡으면 레이아웃 잡기, 반응형 고려할 떄 용이



### QnA 

1. 링크 가 있는 리스트들 과 navigation의 차이 ?
2. gnb lnb 해당 페이지에서만 쓰면 lnb <->다른 페이지에서도 공통으로 쓰면 gnb같은데 

공통으로 쓰는 링크들이 헤더 부분 전부여서 3 LinkList가 있어서 각각의 이름을 어떻게 지으면 좋을지가 걱정이다. 


###  todo


css
* 배민찬 사이트에 blind -> 이거 알아보고 적용하기 

