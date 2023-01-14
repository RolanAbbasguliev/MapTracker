import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import travelReducer from "./reducers/travelSlice";
import travelSaga from "./saga/travelSaga";


let sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default configureStore({
    reducer: {
        travelReducer
    },
    middleware
})

sagaMiddleware.run(travelSaga);

