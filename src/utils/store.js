import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import restaurantsReducer from './restaurantsSlice';
import locationSlice from './locationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    cart: cartReducer,
    restaurants: restaurantsReducer,
    location: locationSlice
})

const persistedReducer = persistReducer(persistConig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);