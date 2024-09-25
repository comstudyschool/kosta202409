function Input({handler, greeting}) {
    // props 객체 구조분해 할당 (객체나 배열의 요소를 분해 할당.)
    // console.dir(props);
    // 참조변수로 접근하는것은 불편한 일이다.
    //const {handler, greeting} = props;
    return (<>
        {/* button은 Input.js로 모듈 분리 */}
        <button onClick={function(e){
            // 다른 함수 호출
            handler();
        }}>확인</button>
        <p>{greeting}</p>
    </>);
}

export default Input;