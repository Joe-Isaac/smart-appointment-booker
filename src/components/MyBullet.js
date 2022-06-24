import React, { useState, useEffect } from 'react';
import { Bullet } from '@ant-design/plots';

const MyBullet = () => {
  const data = [
    {
      title: 'followers',
      ranges: [40, 70, 100],
      followers: [80],
      target: 85,
    },
  ];
  const config = {
    data,
    measureField: 'followers',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    color: {
      range: ['red', 'orange', 'green'],
            measure: '#096dd9',
            target: '#000',
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    label: {
      target: true,
    },
    // Custom legend
    legend: {
      custom: true,
      position: 'bottom',
      items: [
        {
          value: 'good',
          name: 'Good',
          marker: {
            symbol: 'square',
            style: {
              fill: 'orange',
              r: 5,
            },
          },
        },
        {
          value: 'bad',
          name: 'Bad',
          marker: {
            symbol: 'square',
            style: {
              fill: 'red',
              r: 5,
            },
          },
        },
        {
          value: 'Excellent',
          name: 'Excellent',
          marker: {
            symbol: 'square',
            style: {
              fill: 'green',
              r: 5,
            },
          },
        },
        {
          value: 'target value',
          name: 'Target value',
          marker: {
            symbol: 'square',
            style: {
              fill: 'blue',
              r: 5,
            },
          },
        },
      ],
    },
  };
  return <Bullet {...config} />;
};

export default MyBullet;