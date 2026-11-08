## 배운 것
 - React는 JSX 문법을 사용하는데, 브라우저는 JSX 문법을 바로 읽지 못하기에 이를 JS로 변환하는 `vite` 빌드 도구가 필요하다.
 - 프로젝트 생성
    - React 프로젝트는 `npm create vite@latest .`로 생성할 수 있다.
        - `npm create <이름>`은 `create-<이름>`패키지를 임시로 받아서 실행하는 명령어다.
        - `@latest`는 패키지의 최신버전을 사용하라는 뜻이다. 이를 생략할 경우, 캐시에 남은 예전 버전이 실행될 수 있다.
        - `.`은 현재 위치에 프로젝트를 만들라는 뜻이다.
 - 의존성 설치 및 개발 서버 실행
    - `package.json`에 적힌 패키지들을 설치하기 위해 `npm i` 또는 `npm install`이 필요하다. 둘의 역할은 같다.
    - 개발 서버를 띄우기 위해선 `npm run dev`가 필요하다. `npm run dev` 실행 후 콘솔에 `http://localhost:5173/` 같은 주소가 출력되는데, 이 주소를 브라우저에서 열면 된다.
 - 구조
    - `index.html`은 `main.jsx`를 `module`로 불러온다.
        ```HTML
        <!--index.html-->
        <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
        </body>
        ```
    - `main.jsx`는 `index.html`에서 `root` id를 가진 요소를 찾고, React가 관리하는 영역으로 삼은 후, 안에 `<App />`을 그려놓는다. 
        ```jsx
        // main.jsx
        createRoot(document.getElementById('root')).render(
            <StrictMode>
                <App />
            </StrictMode>,
        )
        ```
        1. `document.getElementById('root')`: `index.html`에서 `root` id를 가진 요소를 찾고
        2. `createRoot(...)`: React가 관리하는 영역으로 삼은 후
        3. `render(...)`: 안에 `<App />`을 그려놓는다.

    - `<App />`은 `App.jsx`에서 받아온다.
        ```jsx
        // App.jsx
        function App() {
            return (
                <>
                    <h1>안녕, React!</h1>
                    <p>React를 배워 프론트엔드 개발자가 되고 싶습니다.</p>
                </>
            )
        }

        export default App
        ```
        - `App.jsx`에서는 jsx를 `return`하는 함수가 있다. 이처럼 jsx를 return하는 함수를 **컴포넌트**라 부른다.
            - 컴포넌트 이름은 대문자로 시작해야 하는 있다. `<app />`같이 소문자로 할 경우, HTML의 기본 태그로 인식하는 문제가 발생하기 때문이다.
            - 이때 `return`은 자바스크립트의 문법에 따라 하나만 반환하기 때문에 `<h1>`과 `<p>`를 같이 반환해야 하는 경우 `<>...</>`를 사용해 하나로 감쌀 수 있다. `<>...</>`을 **프래그먼트(fragment)** 라고 부르는데, 여러 태그를 하나로 묶는 역할을 한다.
        - `export`한 `App`은 `main.jsx`에서 `import App from './App.jsx'`로 받는다.

## 잘 모르는 것
 - `export`, `export default`
 - `import`, `import { ... } from ...`, `import ... from ...` 등
 - `import`와 `require`의 차이

## 요약
 - `vite`는 개발 서버에 요청이 들어오면 `jsx`를 `js`로 변환해서 보내주기 때문에 브라우저에서 `jsx`를 사용할 수 있다.
 - `npm create vite@latest .`로 프로젝트 생성
 - `npm i`로 패키지 설치
 - `npm run dev`로 개발 서버 열기
 - jsx를 반환하는 함수를 '컴포넌트'라 부른다.
 - `App.jsx`에서 `App`을 `export`한거를 `main.jsx`에서 받는다. `main.jsx`는 `index.html`에서 `root` id를 가진 요소 내부에 `App`을 그려넣는다.