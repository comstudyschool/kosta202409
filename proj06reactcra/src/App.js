import { useState } from "react";
import Input from "./Input";
import Output from "./Output";

function App() {
    // 변수의 값을 수정 해도 컴포넌트는 새로 그려지지 않는다.
    // 컴포넌트가 새로 그려지려면 state값을 변경 해야 한다.(리 렌더링)
    // let message = "Hello world";
    // useState()  훅을 이용해서 state 생성
    const [message, setMessage] = useState("Hello world");

    function eventHandler() {
        // message = "안녕 세계";
        // 상수는 직접 수정 불가능, setter로 값 변경.
        setMessage("안녕 세계"); // state변경 후 모든 콤포넌트 갱신
        console.log("버튼 클릭 했다!", message);
    }

    return (<>
        <h1>Hello react world!</h1>
        <Input handler={eventHandler } greeting={message} />
        <Output greeting={message} />
    </>);
}

// 모듈에 등록 (사용하는 곳에서 import)
export default App;