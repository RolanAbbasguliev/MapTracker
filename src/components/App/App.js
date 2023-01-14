import React, { useEffect, useState } from 'react';
import "./App.css";
import { Table } from 'antd';

import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDispatch, useSelector } from 'react-redux';

import { initPoints, initPolyline, initRoadArr } from '../../store/reducers/travelSlice';
import { travelSagaAction } from '../../store/saga/actions/travelSagaAction';
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";




let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const dataSource = [
    {
        key: '1',
        num: '№1',
        StartLat: 59.84660399,
        StartLng: 30.29496392,
        EndLat: 59.82934196,
        EndLng: 30.42423701
    },
    {
        key: '2',
        num: '№2',
        StartLat: 59.82934196,
        StartLng: 30.42423701,
        EndLat: 59.82761295,
        EndLng: 30.41705607
    },
    {
        key: '3',
        num: '№3',
        StartLat: 59.83567701,
        StartLng: 30.38064206,
        EndLat: 59.84660399,
        EndLng: 30.29496392
    },
    {
        key: '4',
        num: '№4',
        StartLat: 59.84660399,
        StartLng: 30.29496392,
        EndLat: 59.82761295,
        EndLng: 30.41705607
    },
    {
        key: '5',
        num: '№5',
        StartLat: 59.83567701,
        StartLng: 30.38064206,
        EndLat: 59.84660399,
        EndLng: 30.29496392
    },


];

const columns = [
    {
        title: 'Номер Заявки',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: 'Координаты ОТ lat',
        dataIndex: 'StartLat',
        key: 'StartLat',
    },
    {
        title: 'Координаты ОТ lng',
        dataIndex: 'StartLng',
        key: 'StartLng',
    },
    {
        title: 'Координаты ОТ lat',
        dataIndex: 'EndLat',
        key: 'EndLat',
    },
    {
        title: 'Координаты ОТ lng',
        dataIndex: 'EndLng',
        key: 'EndLng',
    },
];
const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    },);
    return null;
}

const App = () => {
    const dispatch = useDispatch();
    const pointsInfo = useSelector((state) => state.travelReducer.pointsInfo);
    const roadArr = useSelector((state) => state.travelReducer.roadArr);

    return (
        <div className="main_wrapper">

            <Table
                className="Table"
                dataSource={dataSource}
                columns={columns}
                rowSelection={false}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        dispatch(initPoints(record));
                        dispatch({ type: travelSagaAction.FETCH_DATA_SAGA });
                    }
                })}
            />

            <MapContainer center={[59.83567701, 30.21312]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.keys(pointsInfo).length !== 0 &&
                    <React.Fragment>
                        <Marker position={[pointsInfo.StartLat, pointsInfo.StartLng]}>
                            <Popup>
                                Start Point
                            </Popup>
                        </Marker>

                        <Marker position={[pointsInfo.EndLat, pointsInfo.EndLng]}>
                            <Popup>
                                End Point
                            </Popup>
                        </Marker>
                        <Polyline pathOptions={{ color: "purple" }} positions={roadArr} />

                        <RecenterAutomatically lat={pointsInfo.StartLat} lng={pointsInfo.StartLng} />
                    </React.Fragment>

                }
            </MapContainer>

        </div >
    );
};

export default App;