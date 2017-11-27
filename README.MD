
## tab UI 기능 구현
1. ajax 통신으로 category와 해당하는 item 이미지를 받아옴.
2. item을 담을 ul 태그를 만들고 item 이미지들을 li태그 아래의 img태그로 추가하여 dom생성.
3. 첫 번째 카테고리에 해당하는 ul을 제외한 나머지 ul태그 모두 "display: none"
4. category에 해당하는 tab버튼 생성후 첫 번째 버튼에 'active'클래스 추가
5. tab 버튼 클릭 이벤트 추가
  1. currentIndex에 해당하는 ul element "display: none"
  2. 클릭한 tab버튼의 index에 해당하는 ul element 탐색해서 "display: block"
  3. currentIndex에 해당하는 tab 버튼에 "active"클래스 삭제
  4. 클릭한 tab버튼에 "active"클래스 추가
