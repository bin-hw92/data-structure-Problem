### 앞으로 있을 면접들을 위한 내용 정리

#### 주로 velog에서 다른 개발자분들이 올려주신 면접 내용을 관련해서 나름 답변 적기

### JS 관련
- es6문법 중 let, const, var의 차이점을 설명해 주세요.
  - var 함수형 레벨 스코프, 재할당이 가능하다.
  - let 블럭형 레벨 스코프, 재할당이 가능하다.
  - const 블럭형 레벨 스코프, 재할당이 불가능하다. 단 객체의 함수를 이용해서 변경은 가능
  
- this가 무엇인지 설명해 주세요.
  - js에서 this는 객체를 뜻하며, 해당 this의 위치에 따라 객체가 달라진다.
  - 함수 내부에 this가 있어도, 함수 밖에서 new가 없이 불러온 this는 window를 가리키게 되어 있다

- js호이스팅이 무엇인가요?
  - 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것(호이스팅: 끌어올리다)
  - 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미

- const, let, var에 대한 호이스팅
  - 3가지 다 호이스팅이 된다. 단 변수의 3단계 생성과정을 알아야함.
  - 1. 선언단계: 변수를 싱행 컨텍스트의 변수 객체 등록
  - 2. 초기화 단계: 실행 컨텍스트에 등록된 변수객체에 대한 메모리를 할당한다.(이 단계에서 변수는 undefined로 초기화 된다.)
  - 3. 할당단계: undefined로 초기화 된 변수에 값을 할당한다.
  - var로 만들 경우 선언, 초기화 단계가 동시에 이뤄진다. (var로 선언된 변수는 호이스팅되어 선언과 초기화가 이뤄지기 때문에 undefined 출력)
  ```
  console.log(name) // undefined
  var name = `seo`
  ```
  - let은 선언, 초기화가 분리되어 진행(호이스팅 되어 선언단계가 이뤄지지만 초기화 단계는 실제 let이 사용된 코드 도착시 이뤄짐, 초기화 이전에 변수에 접근하려하기 때문에 reference 에러 발생)
  ```
  console.log(name) // ReferenceError: name is not defined
  let name = `seo`
  ```
  - const로 선언되면 값이 상수화 되어 변경 불가능, 선언과 동시에 초기화를 해야함.
  ```
  var name;
  name = 'seo'
  const age = 29; // 선언과 동시에 초기화 필요
  //const age;    // const 변수를 선언만 할 경우 에러가 발생
  //age  = '29';
  ```
  - let과 const 로 선언된 변수는 블록 레벨 스코프를 가집니다. 즉, {} 내부에 변수를 선언하면 해당 블록 내부에만 생명주기를 유지합니다. 반대로 var는 함수 레벨 스코프를 가지므로, 블록 내부에 선언되어도 외부에서 접근할 수 있습니다.
  ```
  {
   let name = ‘seo’
  }
  console.log(name) // ReferenceError: name is not defined
  { 
     var age = 29;
  }
  console.log(age)  // 29 , var는 함수 레벨 스코프
  ```
  
- 일반함수와 화살표형 함수의 차이점이 무엇인지 설명해주세요.
  - arrow function은 ES6에 새로 추가된 함수표현식이며, 익명 함수로 이름이 없는 함수, 즉시 실행이 필요할 경우 사용
  - this 객체에 대해서도 다름, 일반 함수는에서 this는 함수 내부 this
  - 화살표 함수에서 this는 언제나 상위 스코프의 this를 가리킨다.
  - arrow는 const를 이용해서 함수 표현식으로 사용 됨.
  - **추가적으로 내용 필요**
  
- null와 undefiend의 차이점이 무엇인가요?
  - null은 의도적으로 비어있음을 표현한것으로, 변수가 어떤 객체도 가리키고 있지 않다는 것을 의미
  - undefiend는 선언한 후 값을 할당하지 않은 변수, 값이 지정되지 않은 경우
  
- js에서 이벤트루프가 무엇인지 설명해주세요
  - js는 싱글 스레드 기반 언어이기 때문에 한번에 하나씩 작업 진행 
  
- 버블링, 캡쳐링에 대해 설명해주세요.
  - 버블링 : 한 요소에 이벤트가 발생, 할당된 핸들러가 동작하고 이어서 부모 요소 핸들러 동작 최상단 요소를 만날때 까지 이 과정이 반복 되면서 각각 할당된 핸들러가 동작
  - 캡처링 : 이벤트가 하위 요소로 전파되는 단계 

- requestAnimationFrame이 무엇인지 설명해주세요.
  - 자바스크립트 애니메이션 기능으로
  - 백그라운드 동작 및 비활성화시 중지(성능 최적화)
  - 최대 1ms(1/1000s)로 제한되며 1초에 60번 동작
  - 다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참조
  
- typescript를 사용한 이유가 무엇이고 사용했을때 장점이 뭔가요?
  - 객체의 타입을 명시 할 수 있다는 목적과 그로 인해 타입 에러들을 미리 잡을 수 있고, 개발자가 의도한 변수나 함수등의 목적을 명확하게 전달 가능
  - 장접으로는 기존 JS와 호환이 가능하며, 정적타입을 지원하기 때문에 컴파일단계에서 오류를 포착할 수 있다.
  
- d.ts에 대해 설명해주세요.
  - 타입스크립트 코드의 타입 추론을 돕는 파일
  - 기존 JS 모듈의 타입정보를 별도의 파일로 선언 한것으로, JS 모듈을 타입스크립트에서 사용하기 용이하도록 도와줌
  
- TypeScript에서 제너릭(Generics)은 무엇인가요?
  - C#, Java 등의 언어에서 재사용성이 높은 컴포넌트를 만들 때 자주 활용되는 특징 (특히 한가지 타입보다 여러 타입에서 동작하는 컴포넌트를 생성하는데 사용)
  - 제네릭이란 타입을 함수의 파라미터처럼 사용하는 것

- TypeScript에서 any와 제네릭의 차이점
  - any는 모든 데이터를 받을 수 있다는 뜻의 문자형 타입 - 그렇기 때문에 숫자 타입을 받을 수는 있지만, 문자형 함수 기능 사용 시 에러 발생
  - 제네릭은 타입을 지정할 수 있기 때문에 처음에 선언할때 어떤 타입인지 선언해서 사용할 수 있기에 각 선언된 형태에 따라 기능을 수행

- REST api에 대해 설명해 주세요.(Representational state transfer )
  - 자원을 이름(표현)으로 구분하여 해당 자원의 상태를 주고 받는 모든 것을 의미
  - URI를 통해 자원을 명시하고, Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD operation을 적용
  - 웹 사이트의 이미지, 텍스트, DB 내용 등 모든 자원에 대한 고유한 ID인 HTTP URI를 부여
  - CURD : create (생성 POST), read (조회 GET), update (수정 PUT), delete (삭제 DELETE), HEAD (header 조회)
  - 자원(RESOURCE) - URI, 행위(Verb) - HTTP METHOD, 표현(Representations) 3가지로 나뉘며, URI와 METHOD를 통해 표현(CURD) 실행
  
- HTTP 메서드가 무엇인가요? / POST와 UPDATE의 차이가 무엇인가요?
  - HTTP 메소드는 클라이언트가 웹 서버에게 사용자 요청의 목적이나 종류를 알리는 수단 (GET, POST, PUT, PATCH, DELETE 등) (기타: HEAD, OPTIONS, CONNECT, TRACE)
  - GET : 리소스 조회, POST: 요청 데이터 처리, 주로 데이터 등록에 사용, PUT: 리소스를 대체, 해당 리소스가 없으면 생성
  - PATCH: 리소스를 일부만 변경, DELETE: 리소스 삭제
  
- 본인이 알고 있는 자료구조를 있는 대로 설명해주세요
  - 선형 자료구조, 비선형 자료구조가 존재
  - 선형 : 스택과 큐
  - 비선형: 트리와 힙
  
- array list와 linked list의 차이가 무엇인가요?
  - 배열형 목록 : 순차적으로 데이터를 저장한다. 쌓아가는 형식 (검색이 빠름, 삽입 삭제가 느림)
  - 링크형 목록 : 이전 값과 다음 값을 연결해서 쌓는 형식(검색이 느림, 삽입 삭제가 빠름)
  
- cookie, session storage, local storage 각각의 차이가 무엇인가요?
  - 쿠키 : 만료 기한이 있는 key, value 형태 저장소, `장점`: 대부분 브라우저 지원, `단점`: 매번 HTTP 요청마다 포함되어 api 호출로 서버에 부담, 용량이 작음, 암호화 존재 X 따로 암호화 진행해야 함 (서버에 브라우저에 저장한 데이터를 그대로 전송하고 싶을때 사용, 하나의 URL에 대하여 어느 창(또는 탭)에서도 같은 브라우저 데이터를 원할때)
  - 웹 스토리지 : 문자열 데이터만 저장할 수 있다. 저장된 데이터가 클라이언트에 존재할 뿐 서버로 전송은 이루어지지 않는다.
  - 로컬 : 해당 브라우저 URI를 가지고 저장하기 때문에 브라우저 창을 닫아도 상관 없음 (보안적으로 민감한 데이터를 가지고 있지않을때 (ex. page 설정 데이터), 창마다 같은 데이터를 가져야 할 때)
  - 세션 : 브라우저 종료 시 영구적으로 데이터 삭제 (User Session과 같이 보안에 민감한 데이터를 저장해야 할 때, 같은 URL인데 창(또는 탭)마다 다른 데이터를 가져야 할 때)
  - **자동 로그인 -> 로컬스토리지, 입력 폼 정보, 비로그인 장바구니 -> 세션스토리지, 다시 보지 않음 팝업 창 -> 쿠키**
  
- JSON에 대해 설명해주세요.
  - Javascript Object Notation 으로 축약어로 데이터를 저장하거나, 전송할 때 많이 사용되는 경량의 DATA 교환 형식
  - JSON 문서형식은 자바스크립트 객체의 형식을 기반으로 만들어 졌다.
  - JSON 형식의 텍스트를 자바스크립트 객체로 변환하기 위해서는 JSON.parse(데이터) 사용
  - 반대로 자바스크립트 객체를 JSON 형식으로 변경하기 위해서는 JSON.stringify(데이터) 사용

- Promise, async, await 에 대해 설명하시오.
  - Promise는 항상 Promise 객체를 반환하며, then과 catch를 통해 이행과 거부 처리 콜백이 호출됨.
  - async, await은 Callback, Promise의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와 줌
  - async, await의 예외처리는 try, catch문을 이용해야함.
  - async라는 예약어를 함수 앞에 붙이고 비동기 처리 코드에 await를 붙여서 비동기 처리가 다 될때까지 기다리게 해야함.(이때 await를 붙이 비동기 처리 메서드는 꼭 Promise 객체를 반환해야함)
  
- Promise 기능에 대해
  - `Promise.all(promises)` – 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환합니다. 주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스의 결과는 무시됩니다.
  - `Promise.allSettled(promises)` – 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환합니다. 객체엔 다음과 같은 정보가 담깁니다.
    - status: "fulfilled" 또는 "rejected"
    - value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우)
  - `Promise.race(promises)` – 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환합니다.
  - `Promise.resolve(value)` – 주어진 값을 사용해 이행 상태의 프라미스를 만듭니다.
  - `Promise.reject(error)` – 주어진 에러를 사용해 거부 상태의 프라미스를 만듭니다.
  - all에서 결과값이 실패해도 상관 없이 모든 결과값을 가지고 오는 방법
    - Promise.all([p1.catch(error=> {return error})]); 이런식으로 미리 선언하여 처리하는 방식
    - Promise.all([promiseArray.map(item => item.then(...).catch(...))] map 함수를 이용해서 처리하는 방식 등이 있습니다.


### React 등 관한 문제
- react에 대해 간략히 설명해 주세요.
  - UI 라이브러리로 JSX(JavaScript XML) 코드를 통해 자바스크립트만 사용해서 UI, DOM을 구현 (오직 View만 신경 쓰는 라이브러리)
  - 그래서 다른 기능 Ajax, 라우터 등을 쓰기 위해 직접 구현 혹은 다른 라이브러리를 사용해야함
  - 앵귤러 혹은 백본 프레임워크와 혼용도 가능함.
  
- React component가 무엇인가요?
  - 리액트로 만들어진 앱을 이루는 최소한의 단위 (말 그대로 컴포넌트, 재사용이 가능한 각각의 독립된 모듈)
  - 함수형 컴포넌트와 클래스형 컴포넌트 존재
  - 화면의 각 부분을 독립적으로 동작하는 부분으로 존재하는 모듈
  
- webpack에 대해 설명해 주세요.
  - 여러개의 모듈들을 번들(bundle)화한 모듈 번들러이다.
  
- 번들 최적화를 위한 작업은 무엇이 있나요?
  - 레이아웃 최적화, 자바스크립트 실행 최적화, HTML,CSS 최적화, 애니메이션 최적화 등
  
- babel-loader에 대해 설명해 주세요
  - 구버전 브라우저에서 ES6 문법을 트랜스파일링하도록 하는 기능인 babel과 웹팩 파일을 번들링하기 위한 모듈
  
- redux와 mobx의 차이가 무엇이라 생각하나요? (둘 다 상태관리 라이브러리)
  - redux는 함수형 프로그래밍에 영향을 받는 라이브러리, mobx는 oop를 권장하는 라이브러리
  - redux는 javasciprt App을 위한 상태 컨테이너, mobx는 React를 위한 상태관리 라이브러리
  - 복잡한 상태관리가 요구될 경우 redux, 아니면 mobx가 편하다는 의견이 있음
  
- 상태관리란? / 상태관리가 필요한 이유가 무엇인가요?
  - 상태관리란 : 데이터들의 변화를 상태라고 했을 때, 해당 데이터의 변경을 관리하는 부분
  - 상태에 따라서 UI/UX 변경 및 제어를 하기 위해 필요
  
- React Hooks에 대해 설명해 주세요.
  - 상태 관련 로직을 재사용 할 수 있게 도와주는 모듈
  
- React Hooks중 useCallback hooks에 대해 설명해 주세요
  - 주로 렌더링 성능을 최적화해야 하는 상황에서 사용
  - 콜백 함수 두번째 파라미터 안에 있는 배열 값이 바뀌거나 새로운 항목이 추가될 경우 함수를 사용하게 됨(그전까지는 재사용)
  
- 클래스형 컴포넌트와 함수형 컴포넌트의 차이가 무엇인가요
  - 클래스형 컴포넌트는 로직과 상태를 컴포넌트 내에서 구현하기 때문에 상대적으로 복잡한 UI 로직을 갖는 경우가 많다.
  - 함수형 컴포넌트는 state를 사용하지 않고 단순하게 데이터를 받아서(props) UI에 뿌려준다. HOOKs로 인해 로직의 재사용이 가능하다는 장점이 있어 함수형 컴포넌트+Hook을 주로 사용한다고 한다.

- Context Api에 대해 설명하시오.
  - context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.
  - 여러 컴포넌트들에 전해줘야 하는 props의 경우 (예를 들면 선호 로케일, UI 테마) 이 과정이 번거로울 수 있습니다. context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.
  - 하위 컴포넌트들이 다 똑같은 props를 가질 필요 없을 경우에는 사용하지 않는게 좋음 (아래 컴포넌트를 볼 때, Page 컴포넌트에 있는 user, avatarSize props 값을 Avatar 컴포넌트에서만 사용을 할 경우 `Context Api`를 사용하지 않고 그 아래 코드 처럼 이용을 합니다. 이걸 제어의 역전(inversion of control)이라고 부릅니다.)
  
  ```
  <Page user={user} avatarSize={avatarSize} />
  // ... 그 아래에 ...
  <PageLayout user={user} avatarSize={avatarSize} />
  // ... 그 아래에 ...
  <NavigationBar user={user} avatarSize={avatarSize} />
  // ... 그 아래에 ...
  <Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
  </Link>
  
  // Context Api를 사용하지 않고 props 값 넘겨주기 위해
  
  function Page(props) {
  const user = props.user;
  const userLink = (
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    );
    return <PageLayout userLink={userLink} />;
  }

  //이제 이렇게 쓸 수 있습니다.
  <Page user={user} avatarSize={avatarSize} />
  // ... 그 아래에 ...
  <PageLayout userLink={...} />
  // ... 그 아래에 ...
  <NavigationBar userLink={...} />
  // ... 그 아래에 ...
  {props.userLink}
  ```

#### 그 외 내용
- Nginx에 대해 설명해 주세요.
  - 웹 서버이다.
  - 웹 서버는 인터넷 네트워크 위에서 HTTP 프로토콜을 이용해 HTML, CSS, Javascript, image/mediafile과 같은 정적인 정보들을 웹 브라우저에 전송한다.
  
- SSL에 대해 설명해 주세요.
  - SSL(Secure Sockets Layer)은 암호화 기반 인터넷 보안 프로토콜입니다
  - ssl 인증서를 통해 보안 유지를 하는 것으로 알고 있음

- GET, POST 차이점
  - GET method는 클라이언트에서 서버로 어떠한 리소스로 부터 정보를 요청하기 위해 사용되는 메서드입니다.(URL 주소 끝에 파라미터로 전송, 쿼리 스트링 (query string)이라고 함)
  - POST method는 리소스를 생성/업데이트하기 위해 서버에 데이터를 보내는 데 사용됩니다.
  - POST는  HTTP 메세지의 Body에 담아서 전송, 그 Body의 타입은 요청 헤더의 Content-Type에 요청 데이터의 타입을 표시 따라 결정

- Request와 Response
  - 웹 브라우저(클라이언트)를 통해 서버에 요청하는것 -> Request
  - 서버에서 웹 브라우저(클라이언트)에 응답하는 것 -> Response

- git merge와 git rebase 대해 설명하시오.
  - merge와 rebase는 git의 branch를 합치는 작업을 의미합니다.(Merge는 branch를 통합하는 것이고, Rebase는 branch의 base를 옮긴다는 개념의 차이가 있습니다.)
  - rebase는 커밋으로 나뉜 분기 branch의 base를 변경하는 것을 의미
  - merge는 나뉜 branch를 다음 커밋 분기로 합쳐주는 것을 

- SPA 프레임워크에 대해 설명하시오.
  - 단일 페이지 애플리케이션 서버로 부터 완전한 새로운 페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 작성함
  - 애플리케이션이나 웹사이트 서버 호출이 적은 관계로 속도가 매우 빠르고 트래픽이 적다는 장점을 가짐
  - 프론트엔드 같은 경우 앵귤러, 뷰, 리액트 등이 있음.
