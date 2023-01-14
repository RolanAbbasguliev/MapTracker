import { all } from "redux-saga/effects"
import { travelRoadWatch } from "./travelSaga"

export function* rootWatcher() {
    yield all([travelRoadWatch()]);
}