import React, { useState } from 'react';
import "./App.css";
import { Table } from 'antd';

import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
const App = () => {
    const [selectedRow, setSelectedRow] = useState({});

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                console.log(e);
                const latlng = {
                    lat: selectedRow.StartLat,
                    lng: selectedRow.StartLng
                }
                setPosition(latlng)
                map.flyTo(latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }



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
                        setSelectedRow(record);
                        // console.log(record);
                    }
                })}
            />

            <MapContainer center={[59.83567701, 30.21312]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.keys(selectedRow).length !== 0 &&
                    <React.Fragment>
                        <Marker position={[selectedRow.StartLat, selectedRow.StartLng]}>
                            <Popup>
                                Start Point
                            </Popup>
                        </Marker>

                        <Marker position={[selectedRow.EndLat, selectedRow.EndLng]}>
                            <Popup>
                                End Point
                            </Popup>
                        </Marker>

                        <LocationMarker />
                    </React.Fragment>
                }
            </MapContainer>

        </div >
    );
};

export default App;