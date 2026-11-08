## 배운 것
 - 모듈은 독립된 스코프를 가진 하나의 파일로, 파일 내부의 변수나 함수를 다른 파일에서도 쓰려면 `export`와 `import`가 모두 필요하다.
 - `export <대상>`은 대상을 내보내는 역할을 한다.
    - 내보내는 방식에 따라 `Named export`, `Default export`로 나뉜다.
        - `Named export`
            - 문법
                ```jsx
                export const 이름 = 값;
                ```
                ```jsx
                export function 이름() {}
                ```
            - 한 파일에 `export`를 여러 개 사용할 수 있다.
                ```jsx
                export function add(a, b) {
                    return a + b
                }

                export function subtract(a, b) {
                    return a - b
                }
                ```
                한번에 `export`할 때 중괄호로 묶고, `,`를 사용해 구분할 수 있다.
                ```jsx
                function add(a, b) {
                    return a + b
                }

                function subtract(a, b) {
                    return a - b
                }

                export { add, subtract }
                ```
        - `Default export`
            - 문법
                ```jsx
                export default 이름
                ```
            - 파일의 대표되는 값을 내보낼 때 쓰며, 한 파일에 한 번만 쓸 수 있다.
                ```jsx
                function Profile() {
                    return <p>React를 배워 프론트엔드 개발자가 되고 싶습니다.</p>
                }

                export default Profile
                ```
        - `Named export`와 `Default export`를 같이 사용할 수도 있다.
            ```jsx
            function add(a, b) {
                return a + b
            }

            function subtract(a, b) {
                return a - b
            }

            function multiply(a, b) {
                return a * b
            }

            export { add, subtract }
            export default multiply
            ```
        - `Named export`와 `Default export` 사용
            - `Named export`는 `math.js`와 같이 여러 개의 도구를 공유하는 경우 사용하기 적합하다.
            - `Default export`는 `Profile.jsx`같이 컴포넌트 하나를 내보낼 때 사용하기 적합하다.

 - `import <...> from <경로>`는 경로의 파일로부터 값을 가져오는 역할을 한다. 
    - `<경로>`값은 `./` 또는 `../`로 시작하면 내 프로젝트 파일 속 경로를 뜻한다. `react`와 같은 단순 이름일 경우 node_modules에 설치된 패키지를 의미한다.
        ```jsx
        // 내 프로젝트
        import Profile from './components/Profile.jsx'
        import './App.css'
        
        // node_modules
        import { useState } from 'react';
        ```

    - `<...>`부분은 `Named export`/`Default export`에 따라 문법이 달라진다.
        - `Named export`일 경우 `import { 이름 } from '경로'`이다. 이때 중괄호 내부에 오는 `이름`은 `경로`의 파일이 `export`한 이름과 동일해야 한다.
            ```jsx
            // utils/math.js
            export function add(a, b) {
                return a + b
            }
            ```
            ```jsx
            // App.jsx
            import { add } from './utils/math.js'
            ```
            가져올 대상이 여러 개라면 중괄호 내부에 이어 적고 `,`로 구분할 수 있다.
            ```jsx
            // utils/math.js
            export function add(a, b) {
                return a + b
            }

            export function subtract(a, b) {
                return a - b
            }
            ```
            ```jsx
            // App.jsx
            import { add, subtract } from './utils/math.js'
            ```

            - `as`로 이름을 수정할 수 있다.
                - 문법
                    ```jsx
                    import { 이름 as 새이름 } from '경로'
                    ```

                ```jsx
                // utils/math.js
                export function add(a, b) {
                    return a + b
                }
                ```
                ```jsx
                // App.jsx
                import { add as plus } from './utils/math.js'
                ```
                `as`를 이용해 이름을 변경했을 경우, 기존 이름은 사용할 수 없다.

        - `Default export`일 경우 `import 이름 from '경로'`이다.
            ```jsx
            // components/Profile.jsx
            function Profile() {
                return <p>React를 배워 프론트엔드 개발자가 되고 싶습니다.</p>
            }

            export default Profile
            ```
            ```jsx
            // App.jsx
            import Profile from './components/Profile.jsx'
            ```
            
            `import` 바로 뒤에 오는 `이름`은 `export`한 이름과 달라도 상관없다.
            
            ```jsx
            // components/Profile.jsx
            function Profile() {
                return <p>React를 배워 프론트엔드 개발자가 되고 싶습니다.</p>
            }

            export default Profile
            ```
            ```jsx
            // App.jsx
            import Hello from './components/Profile.jsx'
            ```
            다만 코드를 읽는 사람이 헷갈릴 여지가 있기 때문에 실무에선 **파일 이름 = 컴포넌트 이름 = import 이름**으로 하는 관례가 존재한다.
    
        - `Named export`와 `Default export`를 혼용하여 사용할 때의 `import`
            - `import 이름, { 이름 } from ...`을 사용할 수 있다. 이때 중괄호 외부에 있는 이름은 `Default export`, 중괄호 내부의 이름들은 `Named export`이다.

                ```jsx
                // utils/math.js
                function add(a, b) {
                    return a + b
                }

                function subtract(a, b) {
                    return a - b
                }

                function multiply(a, b) {
                    return a * b
                }

                export { add, subtract }
                export default multiply
                ```
                ```jsx
                // App.jsx
                import multiply, { add, subtract } from './utils/math.js'
                ```


 - 에러 예상해보기
    1. `Default export`에서의 `import { 이름 } from ...` 사용
        - `import 이름 from ...`를 `import { 이름 } from ...`에서 중괄호를 생략한 형태라고 오인했다. 실제로는 중괄호 유무가 `named`/`default`를 가르는 문법이다.
            - 콘솔은 `Uncaught SyntaxError: The requested module '/src/components/Profile.jsx?t=1794158068583' does not provide an export named 'Profile'`을 출력했다.
    2. `Profile.jsx`에서 `export default`의 주석 처리
        - `App.jsx`측은 `Profile`을 `import`했으나, `Profile.jsx`측은 `export`한 게 아무것도 없으니, `SyntaxError`를 예상했다.
            - 콘솔은 `Uncaught SyntaxError: The requested module '/src/components/Profile.jsx?t=1794158009848' does not provide an export named 'default'`을 출력했다.
    3. 존재하지 않는 이름으로 `import`
        - `Named export`에서 존재하지 않는 `sum` 이름으로 `./utils/math.js`에 `import`를 시도했다. `math.js`측은 `sum`을 `export`하지 않으니, `SyntaxError`를 예상했다.
            - 콘솔은 `Uncaught SyntaxError: The requested module '/src/utils/math.js?t=1794156368856'          does not provide an export named 'sum'`를 출력했다.
    4. `import 이름 from ...`에서 이름 변경하기
        - `Default export`의 `import Profile from './components/Profile.jsx'`에서 `import Hello from ...`으로 코드를 수정하였다. `Default export`의 경우, 정상 작동을 예상했다.
            - 에러 없이 화면이 정상 출력되었다



 - `require`와 `import`의 차이
    - `require`는 Node.js에서 쓰이는 옛 모듈 방식(CommonJS)이다.
        ```js
        // greet.cjs
        function hello(name) {
            console.log(name);
        }

        module.exports = { hello }
        ```
        ```js
        // main.cjs
        const { hello } = require('./greet.cjs')
        hello("홍길동"); // 홍길동
        ```
    - `export`, `import`는 자바스크립트 표준 방식(ES Modules, ESM)이다.
        ```js
        // greet.mjs
        export function hello(name) {
            console.log(name)
        }
        ```
        ```js
        // main.mjs
        import { hello } from "./greet.mjs";
        hello("홍길동") // 홍길동
        ```
    두 코드의 실행 결과는 동일하나, `require`는 `console.log()`와 같은 **실행 환경이 제공하는 기능**이다.
    `require`는 Node.js 환경에서는 작동하지만, 브라우저에서 사용할 경우 `require is not defined`가 발생해 동작하지 않는다.
    React는 결국 브라우저에서 실행되기 때문에 Node.js에서만 굴러가는 `require` 대신 `import`를 사용하는 것이다.
 - `.cjs`, `.mjs` 확장자
    `.js` 확장자를 가진 파일은 `package.json`의 `type` 필드 값에 따라 다르게 동작한다. `type: "module"`이라면 ESM으로 취급되고 동작한다. 반면 `type: "commonjs"`거나, `type` 필드가 아예 없다면 CommonJS로 동작한다. 단, Node 20.19+ / 22.7+에서는 `type`이 없어도 파일 안에 `import`, `export`가 있으면 ESM으로 동작한다.
    - `.cjs`는 내부 코드를 CommonJS로 취급하라고 Node.js에 명시하는 역할을 한다.
    - `.mjs`도 동일하게 ES Modules로 명시하는 역할을 한다.


## 연구 필요
 - `import Profile from ...`는 `import { default as Profile } from ...`의 축약형이다.
 - `does not provide an export named 'default'.` 에러 메시지는 `default export`가 사실 `default`라는 이름이 붙은 `named export`다.
 - `TypeError`가 아니라 `SyntaxError`인 이유