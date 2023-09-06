# 공유 일기

#### 📝 개요
+ 행복했던일이나 슬펏던일들을 그냥 지나가기에는 너무 아쉬은날들이 많다고 느껴져서 그런 날들을 기록할수있도록 만든 프로젝트입니다.
+ SPA에서 페이지전환을 하기위해 React-Router-Dom라이브러리를 사용했습니다.
+ React-Query라이브러리를 사용하여 상태관리를 하였습니다.
+ styled-components를 사용하여 스타일링을 하였습니다.
+ Recoil을 사용하여 전역변수관리를 하였습니다.
 
#### 🔗 공유 링크
https://timely-youtiao-22dcc8.netlify.app

#### ⚒ 주요 사용 기술(FrontEnd)
+ HTML, CSS, TypeScript, REACT
+ Styled-Components, Axios, React-Query, React-Router-Dom, Socket.io-Client, Recoil
  
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

#### ⚒ 주요 사용 기술(BackEnd)
+ NodeJS, TypeScript
+ Express, MySQL, PassPort, Socket.io, Rate-limit

#### 서버(BackEnd) 파일 경로
📦server
 ┣ 📂bufferToString
 ┃ ┗ 📜bufferToString.ts
 ┣ 📂controller
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜chatMessage.ts
 ┃ ┣ 📜chatRoom.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜commentLike.ts
 ┃ ┣ 📜diary.ts
 ┃ ┣ 📜diaryLike.ts
 ┃ ┣ 📜follow.ts
 ┃ ┣ 📜type.ts
 ┃ ┗ 📜user.ts
 ┣ 📂data
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜chatMessage.ts
 ┃ ┣ 📜chatRoom.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜commentLike.ts
 ┃ ┣ 📜diary.ts
 ┃ ┣ 📜diaryLike.ts
 ┃ ┣ 📜follow.ts
 ┃ ┣ 📜type.ts
 ┃ ┗ 📜user.ts
 ┣ 📂db
 ┃ ┗ 📜mysql.ts
 ┣ 📂middleware
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜image.ts
 ┃ ┗ 📜rate-limiter.ts
 ┣ 📂router
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜chatMessage.ts
 ┃ ┣ 📜chatRoom.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜commentLike.ts
 ┃ ┣ 📜diary.ts
 ┃ ┣ 📜diaryLike.ts
 ┃ ┣ 📜follow.ts
 ┃ ┣ 📜type.ts
 ┃ ┗ 📜user.ts
 ┣ 📂socket
 ┃ ┗ 📜socketModule.ts
 ┣ 📂type
 ┃ ┗ 📜type.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜app.ts
 ┣ 📜config.ts
 ┣ 📜package-lock.json
 ┗ 📜package.json 
 
 
 #### ⚒ 사용 기술 설명(React)
 + 리액트는 create-react-app를 활용하여 프로젝트를 만들었습니다.
    + create-react-app는 프로젝트를 만들때 일일이 설정해야하는 번거로운 초기 셋팅작업을 미리 해줍니다.
 + BackEnd와 통신하기위해 TanStack Query라이브러리를 사용했습니다.
    + TanStack Query를 사용한 이유는 데이터 Fetching, 캐싱, 동기화, 상태관리를 쉽게 관리할수있기때문에 사용하였습니다.
    + useQuery는 GET,POST를 서버로부터 읽어올때 사용하는 API입니다.
    ``` JAVASCRIPT
    const { data: sessionUser, error, isLoading } = useQuery(['userInfo'], userSessionCheck, {
        staleTime: 1000 * 60,
    });
    ```
    + data : 서버에서 받아온 데이터를 불러옵니다.
    + error : 서버에서 데이터를 받아오다가 에러가 발생하게되면 에러코드를 불러옵니다.
    + isLoading : 서버에서 불러오는동안 Loading가 발생하게되면 불러오는동안 true가 됩니다. 
    ```
    useQuery(['userInfo'], userSessionCheck, {
        staleTime: 1000 * 60,
    });
    ```
    + ['userInfo']는 설정하는 Key에 따라서 query캐싱을 다룰수있다. 


    ```
    useQuery(['userInfo', user], userSessionCheck, {
        staleTime: 1000 * 60,
    });
    ```
    + staleTime : 데이터가 fresh에서 stale상태로 변경되는데 걸리는 시간
    + query 함수가 변수에 의존하고 있으면, 배열안에 query key에 포함 시켜야합니다.(ex: user)
    + userSessionCheck는 axios를 이용해서 서버에 요청하는 함수입니다.
    ```JAVASCRIPT
    export async function userSessionCheck() {
     const url: string = `${PROXY}/api/sessioncheck`;
     return axios.get(url).then((result) => {
         const user: userInfo = {
             id: result.data[0].user_id,
             pw: result.data[0].user_pw,
             email: result.data[0].user_email,
             nickname: result.data[0].user_nickname,
             img: result.data[0].user_img,
             logintype: result.data[0].user_login_type,
         };
         return user;
     });
    }
    ```
    ---
    + useMutation는 데이터를 생성, 업데이트, 삭제할때 사용합니다.
    + useMutation를 사용한 이유는 사용법도 간단하고 업데이트된 데이터를 바로 UI에 적용시켜주는(optimistic update) 아주 좋은 기능이 있습니다.
    ```
    const commentInsert = useMutation(
        (comment: commentWriteType) => commentWrite(comment),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['community', no]);
            },
        }
    );
    
    commentInsert.mutate(commentWrite, {
            onSuccess: (data) => {
                alert('댓글 작성 완료');
            },
            onError: (error, variables, context) => {
                console.log('error : ', error);
            },
        });
    ```
    
    
    

 #### 🚫 애러 일지
 ```
 Uncaught TypeError: Cannot read properties of undefined (reading 'data')
 ```
 + 원인
     +  비동기적인 데이터를 불러올때 랜더링이 끝나기도 전에 데이터를 불러왔기때문에 undefined가 발생
 + 해결
     + useState에서 에러가 난 경우
     ```
     const [data, setData] = useState([]);
     ```
     + 괄호안에 미리 값의 타입을 넣어줍니다.
     + 컴포넌트에서 에러가 난 경우
     ```
     <div class="App">
      {
        data && <p>{data}</p>
      }		
    </div>
     ```
     + && 연산자를 이용해서 data의 값이 true일때만 호출할 수 있도록 지정합니다.
---
```
Too many re-renders. React limits the number of renders to prevent an infinite loop
```
+ 원인
     +  무한루프 렌더링이 발생했을때 에러가 뜹니다.
     +  props로 전달받은 변수를 setState에 넣었을때나 서버에서 받아온 값을 setState에 넣었을때 무한루프 렌더링이 발생했습니다.
+ 해결
    + useEffect을 이용하여 무한루프 렌더링 에러를 해결해줍니다.
    + useEffect는 렌더링이 일어났을때 컴포넌트가 보여질때 딱 한번만 실행시켜주는 React Hook입니다.
    ```JAVASCRIPT
    useEffect(() => {
        setData(data);
    },[data])
    ```
    + []배열안에는 배열안의값이 변경됐을때 useEffect을 호출됩니다.
---
```
Warning : Each Child in a list should have a unique "key" prop.
```
+ 원인 
    + React에서 map()을 사용했을때 고유의 Key값을 지정해주지않으면 에러가 발생합니다.
    + 이 key값이 없으면, 추후에 컴포넌트를 수정, 삭제 등을 할 때에 어떤 요소를 의미하는지를 컴퓨터가 확인하기 어렵기 때문에 고유의 key 값을 주는 것이 중요합니다.
+ 해결
    + + data의 고유값인 id를 key에 할당해주면서 key값을 설정해주면 더이상 에러가 발생하지않습니다.
    ```
    <ul>
       {data && data.map((value) => (
           <li key={value.id}>내용<li/>
       ))}
    <ul/>
    ```
    
---
```
XMLHttpRequest at 'http://leicestercity.store/api/home/community' from origin 
'http://footballserver.cafe24app.com' has been blocked by CORS 
policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
+ 원인
    + 내가 접속한 오리진에서 다른 오리진에게 요청하면 동일 출처 정책(SOP)에 의해 요청한것을 제한했을때 발생하는 에러
        + 오리진이란 간단하게 설명하면 Protocol, Host, Port를 합친것을 말합니다.
        + 예를들면 이런 주소가 있으면 https://www.naver.com:PORT
        + [Protocol]://[Host]:[PORT] = 오리진
        
        + Same-Origin Policy(SOP) : 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것을 제한하는 중요한 보안 방식
+ 해결 
    + Node.js에서 app.use(cors())를 통해 요청을 허용합니다.
    ```
    const cors = require('cors');
    
    app.use(cors()); // 모든 도메인 허용
    
    // 특정 도메인만 허용
    let corsOptions = {
    origin: 'https://www.domain.com', // 요청한 클라이언트의 주소를 적습니다.
    credentials: true
    }
    ```
---

 #### ⚒ 사용 기술 설명(Node)
+ get방식
    ```JAVASCRIPT
    const app = express();

    app.get('경로', (req, res) => {
            res.send('안녕하세요');
    });
    ```
    + req : 클라이언트에서 서버로 보낸 요청값
    + res : 서버에서 클라이언트로 보낼 응답값

    ```JAVASCRIPT
    app.get('/fruit', (req, res) => {
            res.send('사과');
    });
    ```
    + [도메인]:[포트]/fruit 를 호출하면 res.send('사과');의값이 클라이언트로 전송되어 브라우저에서 '사과'라는 값을 받을 수 있다.
    ```JAVASCRIPT
    //클라이언트
    export async function getFruit() {
        const url: string = `${PROXY}/fruit`;
        return axios.get(url, { params: { fruit: '사과' } });
    }

    //서버
    app.get('/fruit', (req, res) => {
    const fruit = req.query.fruit;
            res.send(fruit);
    });
    ```
    + [도메인]:[포트]/fruit?fruit=사과 를 호출하면 req.query.fruit에 사과라는 값이 전달되어 서버에서 값을 받을수 있다.

+ post방식
    ```JAVASCRIPT
    export async function postStudent() {
    const url: string = `${PROXY}/student`;
    return axios.post(url, {student : '홍기롱'});
    }

    app.post('/student', (req, res) => {
        const student = req.body.student;
            res.send(student);
    });
    ```
    + post방식은 get방식과다르게 body에 데이터가 저장된다.
+ get과 post의 차이
    + get 방식은 클라이언트에서 서버로 어떠한 리소스로부터 정보를 요청하기 위해 사용되는 메서드입니다.
    + get 방식은 요청을 전송할때 URL끝에 파라미터로 값이 보이기때문에 민감한 정보를 요청할때는 보안상 사용하지않는것이 좋습니다.
    + get 방식은 캐시가 가능하다
    + get 방식은 브라우저 히스토리에 남는다.
    + get 방식은 북마크 될 수 있다.
    + get 방식은 길이 제한이 있다.
    + get 방식은 데이터를 요청할때만 사용 된다.
    ---
    + post방식은 클라이언트에서 서버로 리소스를 생성하거나 업데이트하기 위해 데이터를 보낼 때 사용 되는 메서드입니다.
    + 전송할 데이터를 HTTP 메시지 body 부분에 담아서 서버로 보내기때문에 url에 값이 보이지않아 보안에 필요한부분에 많이 이용됩니다.
    + 게시판에 게시글을 작성하는 작업 등을 할 때 사용할 된다.
    + post방식은 캐시되지 않는다.
    + post방식은 브라우저 히스토리에 남지 않는다.
    + post방식은 북마크 되지 않는다.
    + post방식은 데이터 길이에 제한이 없다.
---



