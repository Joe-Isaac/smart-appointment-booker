import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const MyPie = () => {
    const data = [
        {
          type: '0-4 yrs',
          value: 100,
        },
        {
          type: '5-10 yrs',
          value: 109,
        },
        {
          type: '10-18 yrs',
          value: 87,
        },
        {
          type: '19-29 yrs',
          value: 75,
        },
        {
          type: '30-45 yrs',
          value: 150,
        },
        {
          type: '45-70 yrs',
          value: 120,
        },
        {
          type: '71yrs and above',
          value: 74,
        }
      ];
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