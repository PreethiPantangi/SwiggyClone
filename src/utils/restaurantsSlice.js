import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: []
    },
    reducers: {
        updateRestaurants: (state, action) => {
            state.restaurants = [...state.restaurants, ...action.payload];
        }
    }
});

export const {updateRestaurants} = restaurantsSlice.actions;
export default restaurantsSlice.reducer;