import React, {useState} from 'react';
import {Input, Calendar, Form, Card, DatePicker, Select, Row, Button, Alert} from 'antd';
import moment from 'moment';
import Appointment from './Appointments'

const SpecBooking = () => {
    const {Option} = Select;
    const [type, setType] = useState('general-ward');
    const [typeTwo, setTypeTwo] = useState("outpatient");
    const [room, setRoom] = useState("Select room");
    const [newDate, setNewDate] = useState('')
    const config = {
        rules: [
            {
                required: true,
                message: "cannot be empty"
            },
        ],
    };
    fetch('http://localhost:8000/doctors')
         .then(res => res.json)
         .then(unavailable => {
            console.log("some data was fetched here successfully")
        })
        .catch(err => console.log("error ", err))

    const disabledDatedd = (current) => {
        console.log(current.endOf('month'))
        };
    const onSelect = (date) => {
        setNewDate = date;
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
            <Form.Item name="doctor" label="Doctor" {...config}><Input/></Form.Item>
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