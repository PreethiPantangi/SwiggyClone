import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        location: {}
    },
    reducers: {
        updateLocation: (state, action) => {
            state.location = action.payload;
        },
    }
});

export const {updateLocation} = locationSlice.actions;
export default locationSlice.reducer;