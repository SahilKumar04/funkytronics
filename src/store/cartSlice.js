import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    cartItems: [],
    totalAmount: 0,
};

// Actual Slice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, { payload }) {
            const isItemExist = state.cartItems.find(
                (item) => item.id === payload.id
            );

            if (!isItemExist) {
                state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
            } else {
                state.cartItems = state.cartItems.map((item) => {
                    if (item.id === payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
            state.totalAmount = state.totalAmount + payload.price;
        },
        removeFromCart(state, { payload }) {
            const index = state.cartItems.findIndex((item) => item.id === payload)
            let existingItem = state.cartItems[index];

            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                state.cartItems[index] = existingItem;
            } else {
                state.cartItems = state.cartItems.filter((item) => item.id !== payload)
            }

            state.totalAmount = state.totalAmount - existingItem.price;

        },

        emptyCart() {
            return initialState;
        },
    },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
