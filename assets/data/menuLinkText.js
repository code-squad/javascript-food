export const userMenuLinkText = [
  {
    type: "link",
    text: "로그인",
    url: "#",
  },
  {
    type: "link",
    text: "회원가입",
    url: "#",
  },
  {
    type: "dropdown",
    triggerId: "dropdown-my-page-trigger",
    dropdownId: "dropdown-my-page",
    triggerText: "마이페이지",

    dropdown: [
      {
        url: "#",
        text: "주문현황",
        className: "my-page",
      },
      {
        url: "#",
        text: "1:1문의",
        className: "my-page",
      },
      {
        url: "#",
        text: "교환/반품",
        className: "my-page",
      },
      {
        url: "#",
        text: "등급별혜택/쿠폰함",
        className: "my-page",
      },
      {
        url: "#",
        text: "포인트",
        className: "my-page",
      },
      {
        url: "#",
        text: "내정보관리",
        className: "my-page",
      },
    ],
  },
  {
    type: "dropdown",
    triggerId: "dropdown-client-center-trigger",
    triggerText: "고객센터",
    dropdownId: "dropdown-client-center",
    dropdown: [
      {
        url: "#",
        text: "공지사항",
        className: "client-center",
      },
      {
        url: "#",
        text: "자주묻는 질문",
        className: "client-center",
      },
      {
        url: "#",
        text: "새벽배송안내",
        className: "client-center",
      },
      {
        url: "#",
        text: "정기배송안내",
        className: "client-center",
      },
    ],
  },
  {
    type: "link",
    text: "새벽배송 지연검색",
    url: "#",
  },
  {
    type: "link",
    text: "이벤트 게시판",
    url: "#",
  },
  {
    type: "link",
    text: "장바구니",
    url: "#",
  },
];

const sideDish = [
  {
    text: "나물무침",
    url: "#",
  },
  {
    text: "볶음",
    url: "#",
  },
  {
    text: "조림",
    url: "#",
  },
  {
    text: "김치",
    url: "#",
  },
  {
    text: "전",
    url: "#",
  },
  {
    text: "장아찌.피클",
    url: "#",
  },
  {
    text: "젓갈.장소스",
    url: "#",
  },
  {
    text: "세트",
    url: "#",
  },
];

export const mainMenuLinkText = [
  {
    text: "밑반찬",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "국찌개",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "메인반찬",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "아이반찬",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "장기식단",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "간편식",
    url: "#",
    subMenuList: sideDish,
  },
  {
    text: "브랜드관",
    url: "#",
    subMenuList: sideDish,
  },
];

export const specialMenuLinkText = [
  {
    url: "https://www.baeminchan.com/best30/list.php",
    imgUrl: "https://cdn.bmf.kr/banner/p_gnb1/180410/1523352994426_e20d5cc1c0a6.png",
    alt: "베스트반찬",
  },
  {
    url: "https://www.baeminchan.com/promotion_c/list.php?cno=2160000",
    imgUrl: "https://cdn.bmf.kr/banner/p_gnb2/171228/1514426530229_82c43181b982.jpg",
    alt: "알뜰쇼핑",
  },
  {
    url: "/attendance/index.php",
    imgUrl: "https://cdn.bmf.kr/banner/p_gnb3/180402/1522645059002_3d74e23a9479.jpg",
    alt: "출석체크",
  },
];

export const appDownLoad = {
  triggerId: "dropdown-download-trigger",
  triggerText: "배민찬 앱 다운로드",
  dropdownId: "dropdown-download",
  dropdown: [
    {
      text: "앱스토어",
      url: "#",
      className: "appstore",
    },
    {
      text: "구글플레이스토어",
      url: "#",
      className: "playstore",
    },
  ],
};
