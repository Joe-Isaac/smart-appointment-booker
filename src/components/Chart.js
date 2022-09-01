import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const MyPie = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch('http://192.168.2.179:8000/pie')
    .then(res => res.json())
    .then(intel => setData(intel))
    .catch(err => alert(err.message))
  },[])
  
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default MyPie;