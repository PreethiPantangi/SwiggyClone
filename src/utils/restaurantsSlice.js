import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: []
    },
    reducers: {
        updateRestaurants: (state, action) => {
            if(action.payload.isUpdate) {
                state.restaurants = [...state.restaurants, ...action.payload.cardDetails];
            } else {
                state.restaurants = [...action.payload.cardDetails];
            }
        }
    }
});

export const {updateRestaurants} = restaurantsSlice.actions;
export default restaurantsSlice.reducer;