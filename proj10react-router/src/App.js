import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Products from "./components/Products";
import Users from "./components/Users";
import Orders from "./components/Orders";

const App = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout /> }>
                    <Route index element={<Home /> } />
                    <Route path="products" element={<Products /> } />
                    <Route path="users" element={<Users /> } />
                    <Route path="orders" element={<Orders /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    </>);
};

export default App;