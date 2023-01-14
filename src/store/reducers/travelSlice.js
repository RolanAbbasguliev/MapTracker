import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
    name: "travel",
    initialState: {
        pointsInfo: {},
        polyline: ""
    },
    reducers: {
        initPoints(state, action) {
            state.pointsInfo = action.payload;
        },

        initPolyline(state, action) {
            state.polyline = action.payload;
        }
    }
})

export const { initPoints, initPolyline } = travelSlice.actions;
export default travelSlice.reducer;