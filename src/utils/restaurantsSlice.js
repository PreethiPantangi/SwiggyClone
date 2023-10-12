import { createSlice, current } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: []
    },
    reducers: {
        updateRestaurants: (state, action) => {
            state.restaurants = [...state.restaurants, ...action.payload];
            console.log(current(state));
        }
    }
});

export const {updateRestaurants} = restaurantsSlice.actions;
export default restaurantsSlice.reducer;