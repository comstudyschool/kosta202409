import { useEffect, useRef, useState } from "react";

function App() {
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState(["Hello","World","Apple"]);

    const inputElement = useRef();

    const focusInput = () => {
        inputElement.current.focus();
    };

    useEffect(()=>{
        focusInput();
    }, []);

    return (
      <div className="App">
        <h1>Hello World!</h1>
        <input ref={inputElement} type="text" value={inputVal}
            onChange={e=>{setInputVal(e.target.value)}} 
            onKeyUp={e=>{
                if(e.key === "Enter") {
                    setData([...data, e.target.value]);
                    setInputVal("");
                }
            }} />
        <hr/>
        <ul>{
            data.map((item, i)=> <li key={i}>{item}</li>)
        }</ul>
      </div>
    );
  }
  
  export default App;
