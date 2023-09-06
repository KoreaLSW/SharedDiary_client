# 공유 일기

#### 📝 개요

-   행복했던일이나 슬펏던일들을 그냥 지나가기에는 너무 아쉬은날들이 많다고 느껴져서 그런 날들을 기록할수있도록 만든 프로젝트입니다.
-   SPA에서 페이지전환을 하기위해 React-Router-Dom라이브러리를 사용했습니다.
-   React-Query라이브러리를 사용하여 상태관리를 하였습니다.
-   styled-components를 사용하여 스타일링을 하였습니다.
-   Recoil을 사용하여 전역변수관리를 하였습니다.

#### 🔗 공유 링크

https://timely-youtiao-22dcc8.netlify.app

#### 프로젝트 설명

https://benkyoshirou.tistory.com/24

#### ⚒ 주요 사용 기술(FrontEnd)

-   HTML, CSS, TypeScript, REACT
-   Styled-Components, Axios, React-Query, React-Router-Dom, Socket.io-Client, Recoil

#### 리액트(FrontEnd) 파일 경로

#### 리액트(FrontEnd) 파일 경로

📦src<br/>
┣ 📂api<br/>
┃ ┣ 📜auth.ts<br/>
┃ ┣ 📜chatMessage.ts<br/>
┃ ┣ 📜chatRoom.ts<br/>
┃ ┣ 📜comment.ts<br/>
┃ ┣ 📜commentLike.ts<br/>
┃ ┣ 📜diary.ts<br/>
┃ ┣ 📜diaryLike.ts<br/>
┃ ┣ 📜follow.ts<br/>
┃ ┗ 📜user.ts<br/>
┣ 📂component<br/>
┃ ┣ 📜Calendar.tsx<br/>
┃ ┣ 📜CommentCard.tsx<br/>
┃ ┣ 📜DiaryCard.tsx<br/>
┃ ┣ 📜DropdownSelect.tsx<br/>
┃ ┣ 📜EmotionEmoji.tsx<br/>
┃ ┣ 📜FollowCard.tsx<br/>
┃ ┣ 📜FollowModal.tsx<br/>
┃ ┣ 📜ImageSlider.tsx<br/>
┃ ┣ 📜Loading.tsx<br/>
┃ ┣ 📜ModalReadDiary.tsx<br/>
┃ ┣ 📜ModalUpdateDiary.tsx<br/>
┃ ┣ 📜ModalWritediary.tsx<br/>
┃ ┣ 📜Navbar.tsx<br/>
┃ ┣ 📜PasswordUpdateModal.tsx<br/>
┃ ┣ 📜ProfileGiaryCard.tsx<br/>
┃ ┣ 📜TextCollapse.tsx<br/>
┃ ┗ 📜WeatherEmoji.tsx<br/>
┣ 📂hooks<br/>
┃ ┣ 📜auth.ts<br/>
┃ ┣ 📜chatMessage.ts<br/>
┃ ┣ 📜chatRoom.ts<br/>
┃ ┣ 📜comment.ts<br/>
┃ ┣ 📜commentLike.ts<br/>
┃ ┣ 📜diary.ts<br/>
┃ ┣ 📜diaryLike.ts<br/>
┃ ┣ 📜follow.ts<br/>
┃ ┗ 📜user.ts<br/>
┣ 📂localstorage<br/>
┃ ┗ 📜localstorage.ts<br/>
┣ 📂network<br/>
┃ ┗ 📜http.ts<br/>
┣ 📂page<br/>
┃ ┣ 📂error<br/>
┃ ┃ ┗ 📜ErrorPage.tsx<br/>
┃ ┣ 📜ChatMessage.tsx<br/>
┃ ┣ 📜Follow.tsx<br/>
┃ ┣ 📜Home.tsx<br/>
┃ ┣ 📜LoginPage.tsx<br/>
┃ ┣ 📜Main.tsx<br/>
┃ ┣ 📜Message.tsx<br/>
┃ ┣ 📜MyShareDiary.tsx<br/>
┃ ┣ 📜Profile.tsx<br/>
┃ ┣ 📜ShareDiary.tsx<br/>
┃ ┣ 📜SignUp.tsx<br/>
┃ ┗ 📜Statistics.tsx<br/>
┣ 📂recoil<br/>
┃ ┗ 📜authAtom.ts<br/>
┣ 📂routes<br/>
┃ ┗ 📜ProtectedRoute.tsx<br/>
┣ 📂socket<br/>
┃ ┗ 📜SocketProvider.tsx<br/>
┣ 📂theme<br/>
┃ ┗ 📜theme.ts<br/>
┣ 📂timedifference<br/>
┃ ┗ 📜timedifference.tsx<br/>
┣ 📂type<br/>
┃ ┣ 📜auth.ts<br/>
┃ ┣ 📜chatMessage.ts<br/>
┃ ┣ 📜chatRoom.ts<br/>
┃ ┣ 📜comment.ts<br/>
┃ ┣ 📜commentLike.ts<br/>
┃ ┣ 📜diary.ts<br/>
┃ ┣ 📜diaryLike.ts<br/>
┃ ┣ 📜follow.ts<br/>
┃ ┗ 📜type.ts<br/>
┣ 📜App.css<br/>
┣ 📜App.test.tsx<br/>
┣ 📜App.tsx<br/>
┣ 📜index.css<br/>
┣ 📜index.tsx<br/>
┣ 📜logo.svg<br/>
