const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        resDetails: {}
    },
    reducers: {
        setResDetails: (state, action) => {
            console.log(action.payload);
            state.resDetails = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        removeItem: (state, action) => {
            let itemId = action.payload.id;
            for (let i = 0; i < state.items.length; i++) {
                if(state.items[i].id === itemId) {
                    state.items.splice(i, 1);
                    break;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const {setResDetails, addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;