import React, {useState} from 'react';
import {Table} from 'antd';
const RoomAllocation = () => {
    const columns=[{
        key: 1,
        title: 'Room number',
        dataIndex: 'roomNumber',
    },
    {
        key: 2,
        title: 'Room Type',
        dataIndex: 'roomType',
    },
    {
        key: 3,
        title: 'Room Status',
        dataIndex: 'roomStatus',
    },
    {
        key: 4,
        title: 'RoomSchedule',
        dataIndex: 'roomSchedule',
    },];

const [dataSource, setDataSource] = useState([
    {
        roomNumber: 'A01',
        roomType: 'ICU',
        roomStatus: 'Unavailable',
        roomSchedule: '',
    },
    {
        roomNumber: 'A02',
        roomType: 'Dialysis Room',
        roomStatus: 'Unavailable',
        roomSchedule: '',
    },
    {
        roomNumber: 'A03',
        roomType: 'Operations room',
        roomStatus: 'Unavailable',
        roomSchedule: '',
    },
    {
        roomNumber: 'A04',
        roomType: 'CCU',
        roomStatus: 'Unavailable',
        roomSchedule: '',
    },
    {
        roomNumber: 'A05',
        roomType: 'ICU',
        roomStatus: 'Unavailable',
        roomSchedule: '',
    },
])
  return (
    <div>
        <Table
        columns={columns}
        dataSource={dataSource}
        />
    </div>
  )
};

export default RoomAllocation