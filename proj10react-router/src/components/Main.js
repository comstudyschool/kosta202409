import { Link } from "react-router-dom";

const Main = (props) => {
    return (<>
        <nav>
            <Link to="/">홈</Link> | 
            <Link to="/products">상품</Link> | 
            <Link to="/users">사용자</Link> | 
            <Link to="/orders">주문</Link>
        </nav>
    </>);
}

export default Main;