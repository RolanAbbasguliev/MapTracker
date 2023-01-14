import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import travelReducer from "./reducers/travelSlice";
import { rootWatcher } from "./sagas"
import { fetchPointsAction } from "./sagas/actions/fetchPointsAction";

let sagaMiddleware = createSagaMiddleware();


export default configureStore({
    reducer: {
        travelReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootWatcher);
