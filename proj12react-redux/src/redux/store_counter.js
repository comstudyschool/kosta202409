import { createSlice } from "@reduxjs/toolkit";

// Slice
const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        derement: (state) => {
            state.count -= 1;
        }
    }
});

export const {increment, derement} = counterSlice.actions;
export default counterSlice.reducer;