import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const DemoColumn = () => {
  const data = [
    {
      position: 'neuro',
      year: '4',
      value: 502,
    },
    {
      position: 'Audiology',
      year: '3',
      value: 635,
    },
    {
      position: 'Dentist',
      year: '2',
      value: 809,
    },
    {
        position: 'Gyenecology',
        year: '1',
        value: 809,
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'position',
    isPercent: true,
    isStack: true,
    style: {
      fontSize: '1px',
    },
    label: {
      position: null,
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;
