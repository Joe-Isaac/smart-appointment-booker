import React from 'react';
import { Alert, DatePicker, Select, Space, TimePicker, Calendar, Card, Badge, Timeline, Row, Col, Modal } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import useFetch from '../useFetch';

const Schedule = () => {
    const { Option } = Select;
    const [type, setType] = useState('time');
    const [rawData, setRawData] = useState();
    const [timelineVisibility, setTimelineVisibility] = useState(false);
    

    const dateCellRender = (value) => {
      for(let i=0; i<rawData.length; i++){
        console.log("I shall paint the calendar with all the days of the appointments here")
      if(moment(value).format("YYYY-MM-DD") == moment(rawData[i].appointmentDate).format("YYYY-MM-DD")){
        console.log("Now Im about to print out the dates that have appointments")
        return (
          <ul style={{margin: 0, listStyle: 'none', padding: 5}}>
            <li>
              <Badge status={"success"} text={"click to see appointments"}/>
            </li>
          </ul>
        )
      }
    }
  }



    let myvalue = [];
    const [selectedValue, setSelectedValue] = useState(moment('2022-06-20', 'YYYY-MM-DD'));
    const onPanelChange = (value) => {
        //setValue(value);
    }
    const [open, setOpen] = useState(false);
    const [myArray, setMyArray] = useState([]);
    const [dateValue, setdateValue] = useState([]);

    const onSelect = (value) => {
        myvalue = [];
        console.log("This is the value that has been selected", moment(value).format("YYYY-MM-DD"))
        for(let i=0; i<rawData.length; i++){
        if(moment(value).format("YYYY-MM-DD") === moment(rawData[i].appointmentDate).format("YYYY-MM-DD")){
          console.log("Now Im about to print out the details of a patient's appointment", rawData[i])
          myvalue.push([rawData[i].name, rawData[i].age, rawData[i].appointmentDate])
          setTimelineVisibility(true);
          console.log("Values in the array", myvalue);
        }
    }}


    useEffect(()=>{
    fetch("http://localhost:8000/appointments")
    .then(res => res.json())
    .then(data => {
      setRawData(data)
    }
  )
}, []);
    
  return (
    <>
    <br/>
    <br/>
    <br/>
    <Row style={{display: 'flex'}}>
    <Col span={18}>
    <Card hoverable>
    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
    {rawData && <Calendar dateCellRender={dateCellRender} fullscreen={true} onSelect={onSelect} onPanelChange={onPanelChange}/>}
    </Card>
    </Col>
    <Col span={6}>
      { timelineVisibility && <Timeline mode={"alternate"} style={{width: 300}}>
        {myvalue.map(val => <Timeline.Item><ul style={{listStyle: "none", margin: 0, paddingRight: 5,}}><li>{val}</li></ul></Timeline.Item>)}
      </Timeline>}
    </Col>
    <Modal visible={open} onOk={() => setOpen(false)} onCancel={()=>setOpen(false)}>
      <p>timeline could go here</p>
      <p>timeline could go here</p>
    </Modal>
    {console.log(myvalue)}
    </Row>
    </>
  );
};

export default Schedule;