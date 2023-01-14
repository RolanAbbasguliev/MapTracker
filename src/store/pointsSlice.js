import { createSlice } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
    name: "points",
    initialState: {
        pointsInfo: {}
    },
    reducers: {
        initPoints(state, action) {
            state.pointsInfo = action.payload;
        },
    }
})

export const { initPoints } = pointsSlice.actions;
export default pointsSlice.reducer;