import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState([]);

    // Ajax를 이용해서 Server에서 데이터를 가져온다.
    useEffect(()=>{
        axios.get("http://localhost:3001/todo").then((response)=>{
            setData(response.data);
            console.log("로딩 완료!")
        }).catch((error)=>{ 
            console.log(error); 
        });
    }, []);

    const inputElement = useRef();

    const focusInput = () => {
        inputElement.current.focus();
    };

    useEffect(()=>{
        focusInput();
    }, []);

    return (
      <div className="App">
        <h1>Todo List</h1>
        할일: <input ref={inputElement} type="text" value={inputVal}
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
