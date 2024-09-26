const LiComponent = ({todo, todoList, setTodoList, toggleTodo}) => {
    return(<li>
        <input type="checkbox" onChange={(e)=>{
            toggleTodo(todo._id);
        }} checked={todo.done&&"checked"} />
        <span style={{textDecoration:todo.done&&"line-through"}}>{todo.title}</span>
        <button onClick={(e)=>{
            // 조건에 맞는것만 필터링 해서 새 array 생성
            const newList = todoList.filter((item)=>{
                return item._id != todo._id;
            });
            setTodoList(newList);
        }}>Delete</button> 
    </li>);
}

export default LiComponent;