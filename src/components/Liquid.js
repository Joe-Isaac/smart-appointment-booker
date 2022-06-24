import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/plots';

const MyLiquid = () => {
  const config = {
    percent: 0.78,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    style: {
        color: 'white',
    }
  };
  return <Liquid {...config} />;
};

export default MyLiquid;