// src/inc/Main.js
import { Link } from "react-router-dom";

const Main = (props) => {
    return (<>
        <nav>
            <Link to="/">홈</Link> | 
            <Link to="/counter">Counter</Link> | 
            <Link to="/todo">TodoList</Link> |
            <Link to="/dnd">드래그앤드롭</Link>
        </nav>
    </>);
}

export default Main;