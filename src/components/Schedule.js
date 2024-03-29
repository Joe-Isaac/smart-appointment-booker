import React from 'react';
import { Alert, DatePicker, Select, Space, TimePicker, Calendar, Card, Badge, Timeline, Row, Col, Modal, message, } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import useFetch from '../useFetch';
import { ClockCircleOutlined } from '@ant-design/icons';
const myColors = ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'grey', 'purple', 'violet', 'indigo']

const Schedule = () => {
    const { Option } = Select;
    const [type, setType] = useState('time');
    const [rawData, setRawData] = useState();
    const [timelineVisibility, setTimelineVisibility] = useState(false);
    let count = 0;
    

    const dateCellRender = (value) => {
      count=0;
      rawData.forEach(date => {
        if(moment(value).format("YYYY-MM-DD") === moment(date.appointmentDate).format("YYYY-MM-DD")){
          count++;
        }
      });
        if(count>=1){
        return (
          <ul style={{margin: 0, listStyle: 'none', padding: 5}}>
            <li>
              <Badge status={"success"} text={`${count} appointments`}/>
            </li>
          </ul>
        )
    }}




    const [myvalue, setmyvalue] = useState([]);
    const [selectedValue, setSelectedValue] = useState(moment('2022-06-20', 'YYYY-MM-DD'));
    const onPanelChange = (value) => {
        //setValue(value);
    }
    const [open, setOpen] = useState(false);
    const [myArray, setMyArray] = useState([]);
    const [dateValue, setdateValue] = useState([]);

    const onSelect = (value) => {
      setTimelineVisibility(false);
      setmyvalue([]);
        for(let i=0; i<rawData.length; i++){
        if(moment(value).format("YYYY-MM-DD") === moment(rawData[i].appointmentDate).format("YYYY-MM-DD")){
          setmyvalue(val => [...val, [(rawData[i].appointmentTime), rawData[i].name, (moment().format("YYYY")-(moment(rawData[i].dob).format("YYYY"))+" years old"), rawData[i].department, rawData[i].appointmentDate]])
          setTimelineVisibility(true);
        }
    }
        }


    useEffect(()=>{
    fetch("http://localhost:8000/appointments")
    .then(res => res.json())
    .then(data => {
      setRawData(data)
    }
  )
}, []);


const findColor = () => {
  return myColors[Math.floor(Math.random() * myColors.length)];
}
    
  return (
    <div style={{marginTop: 10}}>
    <Row style={{display: 'flex'}}>
    <Col span={18}>
    <Card style={{backgroundColor: '#f9f0ff'}} hoverable>
    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
    {rawData && <Calendar style={{backgroundColor: '#f9f0ff'}} dateCellRender={dateCellRender}
     fullscreen={true} onSelect={onSelect}
     onPanelChange={onPanelChange}/>}
    </Card>
    </Col>
    <Col span={6}>
      {timelineVisibility && <Timeline mode='alternate'>
        {myvalue.map(val => <Timeline.Item
        dot={<ClockCircleOutlined/>}
        color={findColor()}
        style={{
          margin: 15,
          padding: 3
          }}>
            <Card hoverable={true}
            style={{
              border:0,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 2px -2px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px, rgba(0, 0, 0, 0.09) 0px 5px 12px 4px',
            }}
            >
          {val.map(item =>
        <p style={{padding: 0, margin: 0, fontSize: 13}}>
          {item}</p>)}
          </Card>
          </Timeline.Item>)}
      </Timeline>}
    </Col>
    
    </Row>
    </div>
  );
};

export default Schedule;