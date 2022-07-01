import React, {useState} from 'react';
import {Input, Calendar, Form, Card, DatePicker, Select, Row, Button, Alert} from 'antd';
import moment from 'moment';
import Appointment from './Appointments'
import useFetch from '../useFetch';

const SpecBooking = () => {
    const {Option} = Select;
    const [type, setType] = useState('general-ward');
    const [typeTwo, setTypeTwo] = useState("outpatient");
    const [room, setRoom] = useState("Select room");
    const [newDate, setNewDate] = useState([]);
    const [docName, setdocName] = useState('');
    const [docDate, setDocDate] = useState('');
    const config = {
        rules: [
            {
                required: true,
                message: "cannot be empty"
            },
        ],
    };
    // fetch('http://localhost:8000/doctors')
    //      .then(res => res.json)
    //      .then(data => {
    //         console.log("some data was fetched here successfully", data);
    //     })
    //     .catch(err => console.log("error ", err))
    const {data, isPending, setData} = useFetch("http://localhost:8000/doctors");
    function makeDate(data){
        for(let i=0;i<data.length;i++){
            setDocDate(data[i].unavailable);
        }
    }
    const disabledDatedd = (current) => {
        makeDate(data);
        for(let i=0; i<docDate.length; i++){
        if(current < moment() || moment(current).format("YYYY-MM-DD") == docDate[i]){
            console.log(moment(docDate));
            console.log(current)
            return current;
        }}
        };

    const onSelect = (data) => {
    }
    const [formData, setFormData] = useState(null);
    
  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
        <Card hoverable style={{width: 550}}>
        <Form layout='vertical' onFinish={(data) => {
            <Alert message="Successfully submitted"/>
            console.log('This is where I collect the data', data);
            fetch("http://localhost:8000/appointments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
        })
        .then(response => response.json)
        .then(results => {
            console.log("success", results);
            
    })
        .catch(error => console.log("Error ", error.message))
        }}>
            {console.log('This is the value of the values stored in the state variable', formData)}
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="name" label="first name" {...config}><Input/></Form.Item>
            <Form.Item name="second-name" label="second name" {...config}><Input/></Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="third-name" label="last name" {...config}><Input/></Form.Item>
            <Form.Item name="age" label="age" {...config}><Input/></Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="phoneNumber" label="Phone number" {...config}><Input/></Form.Item>
            <Form.Item name="department" label="Department" {...config} style={{width: 185}}>
                <Select value={type} onChange={setType} defaultValue={"general ward"}>
                <Option value={'general-ward'}>General Ward</Option>
                <Option value={'urology'}>Urology</Option>
                <Option value={'onchology'}>Onchology</Option>
                </Select>
                </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="doctor" label="Doctor" {...config}>
                <Select value={docName} onChange={setdocName} defaultValue={"select doctor to see"}>
                    <Option value={'quincy'}>Dr. Quincy</Option>
                    <Option value={'mildred'}>Dr. Mildred</Option>
                    <Option value={'fanon'}>Dr. Fanon</Option>
                    <Option value={'ricky'}>Dr. Ricky</Option>
                    <Option value={'luna'}>Dr. Luna</Option>
                    <Option value={'price'}>Dr. Price</Option>
                    <Option value={'may'}>Dr. May</Option>
                </Select>
            </Form.Item>
            <Form.Item name="clinic" label="Clinic" {...config} style={{width: 185}}>
                <Select value={typeTwo} onChange={setTypeTwo} defaultValue={"outpatient"}>
                    <Option value={"inpatient"}>Inpatient</Option>
                    <Option value={"outpatient"}>Outpatient</Option>
                </Select>
                </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name='appointmentDate' label="Date of appointment" {...config}>
                <DatePicker allowClear={true} showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss'),
                }} format="YYYY-MM-DD HH:mm:ss" disabledDate={disabledDatedd}/>
            </Form.Item>
            <Form.Item name="room" label="Room" {...config} style={{width: 185}}>
                <Select value={typeTwo} onChange={setRoom} defaultValue={"Select room"}>
                    <Option value={"A01"}>A02</Option>
                    <Option value={"A02"}>A03</Option>
                    <Option value={"A04"}>A04</Option>
                </Select>
                </Form.Item>
            </Row>
            <Form.Item><Button type='primary' htmlType='submit'>Book appointment</Button></Form.Item>
            <div style={{fontFamily: 'calibri', fontSize: '15px', color: '#1890ff'}}><p><strong>tip: greyed out dates indicate full appointment slots</strong></p></div>
        </Form>
        </Card>
        

    </div>
  )
}

export default SpecBooking;