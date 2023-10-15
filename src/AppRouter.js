import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import About from "./components/About";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/SwiggyClone" element={<Body />} />
            <Route path="/SwiggyClone/restaurant/:resId" element={<RestaurantMenu/>} />
            <Route path="/SwiggyClone/cart" element={<Cart/>} />
            <Route path="/SwiggyClone/about" element={<About/>} />
        </Routes>
    )
}

export default AppRouter;