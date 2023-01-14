import { call, takeEvery, put, select } from "redux-saga/effects";
import { initPolyline } from "../reducers/travelSlice";
import { fetchPointsAction } from "./actions/fetchPointsAction";
import { getPointsInfo } from "./selector/getPoints";



const fetchPolylineFromApi = (pointsInfo) => {
    //const url = "http://router.project-osrm.org/route/v1/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?overview=full";
    const url = `http://router.project-osrm.org/route/v1/driving/${pointsInfo.StartLng},${pointsInfo.StartLat};${pointsInfo.EndLng},${pointsInfo.EndLat}?overview=full`;
    fetch(url);
}

function* fetchTravelRoadWorker() {
    try {
        const pointsInfo = yield select(getPointsInfo);

        const result = yield call(() =>
            fetchPolylineFromApi(pointsInfo)
        );

        yield put(initPolyline(result.routes.geometry));

    } catch (e) {
        yield put({ type: "OSRMAPI_FETCH_FAILED" });
    }

}

// eslint-disable-next-line require-yield
export function* travelRoadWatch() {
    takeEvery(fetchPointsAction.FETCH_POINTS, fetchTravelRoadWorker);
}