import { createSlice } from "@reduxjs/toolkit";
import PolylineUtil from "polyline-encoded";

const travelSlice = createSlice({
    name: "travel",
    initialState: {
        pointsInfo: {},
        polyline: "",
        roadArr: [],
    },
    reducers: {
        initPoints(state, action) {
            state.pointsInfo = action.payload;
        },

        initPolyline(state, action) {
            state.polyline = action.payload;
            state.roadArr = PolylineUtil.decode(state.polyline);
            
        },
    }
})

export const { initPoints, initPolyline, initRoadArr } = travelSlice.actions;
export default travelSlice.reducer;