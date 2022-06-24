import React from 'react';
import {Line} from '@ant-design/charts';
import "@ant-design/flowchart/dist/index.css";
const MyLine = () => {
            const data = [
                {month: 'January', patients: 1000},
                {month: 'February', patients: 1400},
                {month: 'March', patients: 1500},
                {month: 'April', patients: 1200},
                {month: 'May', patients: 800},
                {month: 'June', patients: 700},
                {month: 'July', patients: 1700},
                {month: 'August', patients: 980},
                {month: 'September', patients: 1650},
                {month: 'October', patients: 1340},
                {month: 'November', patients: 1900},
                {month: 'December', patients: 2030}
            ];

            const config = {
                data,
                height: 600,
                xField: 'month',
                yField: 'patients',
                point: {
                    size: 8,
                    shape: 'diamond',
                }
            };

            return <Line {...config} />;
          }
          

export default MyLine;