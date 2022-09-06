import React, {useState} from 'react';
import {Spin, Table} from 'antd';
import useFetch from '../useFetch';

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

    const {setData, data, isPending} = useFetch('http://localhost:8000/room_allocation')

  return (
    <div>
        {data && <Table
        columns={columns}
        dataSource={data}
        />
        }
        {
            isPending && <><Spin size='default'/><p>Loading...</p></>
        }
    </div>
  )
};

export default RoomAllocation