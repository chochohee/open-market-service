# 오픈마켓 서비스
> 배포주소 : https://chochohee.github.io/open-market-service/ </br>
> 🛠 사용 기술스택 : <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> </br>

## 1. 프로젝트의 목표와 기능
### 1.1 프로젝트 목표
- 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하며 구매자는 구매하는 서비스.
- JavaScript와 API를 사용하여 상품 등록, 결제, 상품에 대한 CRUD를 직접 구현해보는 프로젝트


### 1.2 구현하고자하는 기능
```
🎨 현재 구현완료 기능
  
  🔸 구매자 페이지 中
    ▫ 로그인 페이지
    ▫ 상품 목록 페이지
    ▫ 회원 가입 페이지
    ▫ 상품 상세 페이지
```
```
 🎨 추후 구현예정 기능
    
  🔸 구매자 페이지 中
    ▫ 주문/결제 페이지
    ▫ 장바구니 페이지

  🔹 판매자 페이지
    ▫ 로그인 페이지
    ▫ 회원 가입 페이지
    ▫ 상품 목록 페이지
    ▫ 상품 상세 페이지
    ▫ 판매자 센서 페이지
    ▫ 상품 등록 페이지
```
   
  ### 1.3 팀 구성
  |[FE] 황초희|
  |:---:|
  |<img src = "https://github.com/user-attachments/assets/959ca3c8-a246-4c49-baff-1f341b91f006" width="120px" height="120px" />|
  |[chochohee](https://github.com/chochohee)|

## 2. 요구사항과 기능 명세
![image](https://github.com/user-attachments/assets/62599be3-2f29-47c8-9278-6bd505244b0e)

## 3. 프로젝트 구조와 개발 일정
### 3.1 프로젝트 구조
│  📄 index.html  
│  📄 index.js  
│  📄 README.md  
│  
├─ 📁 component  
│      📄 DetailPage.js  
│      📄 Error404.js  
│      📄 Footer.js  
│      📄 Header.js  
│      📄 HomePage.js  
│      📄 LoginModal.js  
│      📄 LoginPage.js  
│      📄 SignUpPage.js  
│  
├─ 📁 css  
│      📄 reset.css  
│      📄 style.css  
│      📄 style.css.map  
│      📄 style.scss  
│      📄 _common.scss  
│      📄 _detailPage.scss  
│      📄 _error404.scss  
│      📄 _footer.scss  
│      📄 _header.scss  
│      📄 _login.scss  
│      📄 _loginModal.scss  
│      📄 _main.scss  
│      📄 _mixin.scss  
│      📄 _signUp.scss  
│      📄 _variable.scss  
│  
├─ 📁 js  
│      📄 api.js  
│      📄 isLoggedIn.js  
│      📄 login.js  
│      📄 mypageModal.js  
│      📄 productList.js  
│      📄 signup.js  
│      📄 state.js  
│  
└─ 📁 src  
      └─ 📁assets  

### 3.2 타임라인
![OpenMarketService_TimeLine-001 (1)](https://github.com/user-attachments/assets/2390bb66-75b9-4e60-9f44-1eaebe507c30)



## 4. 와이어프레임/UI
  ### 4.1 와이어프레임
  ![image](https://github.com/user-attachments/assets/717505b7-0f20-492a-9709-15593ef4674d)

  ### 4.2 UI
  #### 구현완료 페이지
  |로그인페이지|회원가입페이지|
  |:---:|:---:|
  |![login](https://github.com/user-attachments/assets/b3ee31b3-f41d-4d72-ade3-80787d171f25)|![signup](https://github.com/user-attachments/assets/e1c324cf-781e-404a-ad3f-346c6185399b)|
  |상품목록페이지(메인)|상품상세페이지|
  |![main](https://github.com/user-attachments/assets/2634852d-7854-4feb-9431-b923f26cf989)|![detailpage](https://github.com/user-attachments/assets/a60586e9-4ce2-4537-a9d6-d849ddb3c126)|
  |(로그인)마이페이지모달|(비로그인)로그인요청모달|
  |![mypageModal](https://github.com/user-attachments/assets/01b9b266-ca8b-4e29-b257-710cf7617c38)|![loginModal](https://github.com/user-attachments/assets/5166331d-0d72-4039-975a-9bb88ab5a8c8)|
  
## 5. 에러와 해결방법
  - 가장 많이 에러가 났던 부분은 단연 라우터... 가장 많이 수정했던 부분은 중복 초기화/랜더링, 그리고 가장 애먹었던 것은 코드 순서.
초기화 이후 랜더링이 되어야하지만, 랜더링 이후 초기화를 해버린다거나, 초기화->랜더링->초기화 식으로 중복된 코드와 순서가 모두 섞여서 JavsScript가 일부 화면에서는 동작하지 않는 등의 에러가 많이 발생하였다.  
에러를 해결하는것에 가장 많이 도움이 되었던 것은 아무래도 익숙치않은 코드들이다보니, 내가 작성한 코드들을 다시 한줄한줄 훑어보며 어떻게 동작하는지 눈에 익히고, 살펴보는것이 아니었을까 생각한다.  
  -  새로고침시 hash(주소)는 보고있던 화면이나, 랜딩되는 화면은 Main(상품목록페이지)인 것에대한 오류 : window에 load event를 부여함으로써, 변경된 페이지를 sessionStorage에 저장하고, 기억하여 페이지 로드시에 저장된 페이지가 로드될 수 있도록 하여 에러를 해결하였다.

## 6. 개선 필요사항
  - 라우터 및 Component init() render() 메서드 점검, 라우터의 구성 및 동작을 이해하고 조금 더 간결하게 작성할 수 있는 방법은 없는지 찾아봐야 할 것 같다.
  - 복잡한 Signup validation/markup : 초반 signupPage 마크업 중 부분 error message content 작성으로 인해, validation을 하는 과정에서 일부는 textContent삽입, 일부는 createElement로 인한 코드의 통일성이 부족하다.
  하여 error message content 삭제를 통한 코드의 통일 및 CSS 수정이 필요하다. 또한 핸드폰번호를 입력받는 input을 Number가 아닌 text로 만들면서, 숫자외에는 입력이 안되도록 & 4자리 수 이상 입력(복붙 등) 되었을 경우 숫자 4자리만 남기도록 하는 과정에서 탭 입력을 통한 이동이 불가능하다는 것 등 불편사항이 발견되어, 수정 필요.
  - Footer 반응형 CSS : 현재 화면의 크기를 줄이면, 메인페이지나, 상세페이지에서 Footer 부분이 컨텐츠가려서 인터넷 창의 밑부분에 붙어있는 것이 아닌, 위로 올라와버리는 문제점이 있다. 수정 필요.
  - 배포페이지 오류 : VSC 라이브서버로 확인한 페이지와, 배포페이지에서 확인한 페이지의 이미지가 일부 노출이 되지않고 또한 CSS가 일부 크기가 다르게 반영되는 부분이 있다. 수정 필요.
  - 상품목록 stock 예외처리 : 상품목록의 잔여개수 1개 또는 그이상일 경우에만 처리가 되어있어, 상품이 모두 판매되었을 때의 sold out 예외처리가 안되어있다. 추가 구현 필요.

## 7. 개발하며 느낀점
```
프로젝트 시작 첫날, 욕심으로 SPA를 시도해보다가 오전시간을 아무것도 못하고 날려버려서 MPA방식으로 해야겠다. 하고 진행을 했었다.
그런데 초반 마크업과 CSS 진행하는 과정에서 오류가있었던 부분을 되짚어 볼 수 있게 되었고, 이렇게 하면 되지않을까 라는 생각에
다시한번 SPA를 시도, 성공하였다. 아직 미숙한 부분인만큼 프로젝트 진행 중에도 구글링을 통해 지속 학습하고,
내가 적은 코드를 되풀이해보면서 문제점이 무엇인지를 짚어나가고, 꼬여버린 코드들을 하나씩 다시 풀어나가기를 반복했다.
물론 중간중간 오류도 생기고, 많은 에러들로 고생을 했었던 터라 순탄치만은 않았던 시간이었다.
그래도 "내 개발 실력이 이 프로젝트로 인하여 한걸음 더 나아갈 수 있다." 라고 생각하니 기꺼이 받아들이고 진행할 수 있었다.
아직도 부족한 부분은 여전히 많다. 프로젝트 진행하는 중간중간 한계를 느끼기도 했고,  
어떻게 해보아도 오류가 해결이 되질 않아서 답답하기도 했었다.  
하지만 역시 안풀리는 문제를 해결하는것만큼 기분좋은게 없는 것 같다. 어떻게든 필수적인 구현 필요 사항에 대해서는
보여지는 "구현"은 했다고 생각하나, 아직 개선 필요사항 등 내부적으로 develop이 필요한 부분이 많다.
차근차근 다시 뜯어보고, 개발해나가면서 좀 더 발전해나가고싶다.
```

## 8. 추후 개발 계획
  > [!IMPORTANT]
  > ▫ 구현완료 페이지의 개선 필요사항 개선  
  > ▫ 추후 구현 예정 기능들 구현  
  > ▫ 메인페이지(상품목록) animation 작업 진행  
  > ▫ 구현되어있는 페이지의 편의성 개선  
