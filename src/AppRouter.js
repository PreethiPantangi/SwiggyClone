import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import About from "./components/About";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/restaurant/:resId" element={<RestaurantMenu/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
    )
}

export default AppRouter;