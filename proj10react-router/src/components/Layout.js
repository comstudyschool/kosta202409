import { Outlet } from "react-router-dom";
import Main from "./Main";

const Layout = (props) => {
    return (<>
        <h1>Comstudy School</h1>
        <Main />
        <Outlet />
        <div>
            <copyright>
                <address>서울시 종로구 견지동 KOSTA</address>
            </copyright>
        </div>
    </>);
}

export default Layout;