import { useState } from "react";
import LiComponent from "./LiComponent";

const Container = () => {
    const [newTodo, setNewTodo] = useState("");

    let listArray = [
        {_id:"todo0001", title:"밥먹고 커피 마시기", done: false},
        {_id:"todo0002", title:"TodoList 과제하기", done: true},
        {_id:"todo0003", title:"미니 프로젝트 기획", done: false},
        {_id:"todo0004", title:"파이널 프로젝트 팀회의", done: false}
    ];
    const [todoList, setTodoList] = useState(listArray);
    const [todoId, setTodoId] = useState(5);

    const buttonHandler = (e) => {
        setTodoList([...todoList, {_id:"todo000"+todoId, title:newTodo, done: false}]);
        setTodoId(todoId+1);
        // 배열에 추가 후 state 초기화
        setNewTodo("");
    }

    
    function toggleTodo(_id) {
        const idx = todoList.findIndex((todo)=>{
            return todo._id === _id;
        });
        console.log("idx ==> ", idx)
        if(idx != -1) {
            const newList = [...todoList];
            newList[idx].done = !newList[idx].done;
            setTodoList(newList);
        }
    }

    function makeElements() {
        return todoList.map((todo)=>{
            return (<LiComponent 
                        key={todo._id} 
                        todo={todo} 
                        todoList={todoList} 
                        toggleTodo={toggleTodo}
                        setTodoList={setTodoList} />);
        });
    }

    function makeElements_test() {
        return todoList.map((todo)=>{
            return (<li key={todo._id}>
                <span>{todo.title}</span>
                <button onClick={(e)=>{
                    const newTodoList = [...todoList]; 
                    const idx = newTodoList.findIndex((item)=>{
                        return todo._id === item._id;
                    });
                    console.log(idx);
                    if(idx != -1) {
                        newTodoList.splice(idx, 1);
                        setTodoList(newTodoList);
                    }
                }}>Delete</button> 
            </li>);
        });
    }


    return (<div className="container" style={{marginTop:"30px"}} >
        <h3>할일 입력</h3>
        <p>
            <input type="text" value={newTodo} onChange={(e)=>{setNewTodo(e.target.value)}} />
            <button onClick={buttonHandler}>SAVE</button>
            {newTodo}
        </p>
        <hr />
        <h3>할일 목록</h3>
        <ul>{ makeElements() }</ul>
    </div>);
}

export default Container;