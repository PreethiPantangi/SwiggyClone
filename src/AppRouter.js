import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/restaurant/:resId" element={<RestaurantMenu/>} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    )
}

export default AppRouter;