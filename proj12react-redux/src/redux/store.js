// src/redux/store.js
// store에는 사용할 state가 들어가고 
// 그 state를 사용하는 메서드가 reducers 추가.
import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { addTodo, removeTodo, toggleTodo } from "./store_todo";
import counterReducer, { increment, derement} from "./store_counter";
import positionReducer, {setPosition } from "./store_dnd";

export  {increment, derement, addTodo, removeTodo, toggleTodo, setPosition }

// Store에서 여러 기능들의 리듀서를 병함
const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todoReducer,
        position: positionReducer
    }
});

// 모듈 등록
export default store;