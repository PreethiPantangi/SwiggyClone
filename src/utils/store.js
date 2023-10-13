import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import restaurantsReducer from './restaurantsSlice';
import locationSlice from './locationSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantsReducer,
        location: locationSlice
    }
});

export default store;