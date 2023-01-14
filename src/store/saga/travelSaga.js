import { call, put, takeEvery, select } from 'redux-saga/effects';
import { initPolyline } from '../reducers/travelSlice';
import { getPointsInfo } from '../selector/getPointsInfo';
import { travelSagaAction } from './actions/travelSagaAction';

const fetchApi = (pointsInfo) => {
    const url = `http://router.project-osrm.org/route/v1/driving/${pointsInfo.StartLng},${pointsInfo.StartLat};${pointsInfo.EndLng},${pointsInfo.EndLat}?overview=full`;
    return fetch(url);
}

function* fetchTravelWorker() {
    const pointsInfo = yield select(getPointsInfo);
    const data = yield call(() => fetchApi(pointsInfo));
    const json = yield call(() => new Promise(res => res(data.json())));
    yield put(initPolyline(json.routes[0].geometry));
}

export default function* travelWatcher() {
    yield takeEvery(travelSagaAction.FETCH_DATA_SAGA, fetchTravelWorker);
}
