import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

export default function LegendChart() {
    const data = [
      {"month":"January", "type":"Admits",value: 6000},
      {"month":"January", "type":"Discharged",value: 5890},
      {"month":"January", "type":"Failed",value: 110},
        {"month":"February", "type":"Admits",value: 6000},
        {"month":"February", "type":"Discharged",value: 5989},
        {"month":"February", "type":"Failed",value: 11},
        {"month":"March", "type":"Admits",value: 7000},
        {"month":"March", "type":"Discharged",value: 6999},
        {"month":"March", "type":"Failed",value: 1},
        {"month":"April", "type":"Admits",value: 6400},
        {"month":"April", "type":"Discharged",value: 6390},
        {"month":"April", "type":"Failed",value: 10},
        {"month":"May", "type":"Admits",value: 13000},
        {"month":"May", "type":"Discharged",value: 12970},
        {"month":"May", "type":"Failed",value: 30},
        {"month":"June", "type":"Admits",value: 5000},
        {"month":"June", "type":"Discharged",value: 4980},
        {"month":"June", "type":"Failed",value: 20},
        {"month":"July", "type":"Admits",value: 1500},
        {"month":"July", "type":"Discharged",value: 1489},
        {"month":"July", "type":"Failed",value: 11},
        {"month":"August", "type":"Admits",value: 1000},
        {"month":"August", "type":"Discharged",value: 987},
        {"month":"August", "type":"Failed",value: 13},
        {"month":"September", "type":"Admits",value: 1560},
        {"month":"September", "type":"Discharged",value: 1550},
        {"month":"September", "type":"Failed",value: 10},
        {"month":"October", "type":"Admits",value: 7800},
        {"month":"October", "type":"Discharged",value: 7600},
        {"month":"October", "type":"Failed",value: 200},
        {"month":"November", "type":"Admits",value: 5760},
        {"month":"November", "type":"Discharged",value: 5740},
        {"month":"November", "type":"Failed",value: 30},
        {"month":"December", "type":"Admits",value: 11000},
        {"month":"December", "type":"Discharged",value: 10900},
        {"month":"December", "type":"Failed",value: 200},
    ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isGroup: 'true',
    legend: {
      selected: {
        tea: false,
      },
    },
  };

  return <Column {...config} />;
};