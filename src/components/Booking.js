import React, {useState, useEffect} from 'react';
import {Input, Calendar, Form, Card, DatePicker, Select, Row, Button, Alert,  message, InputNumber, Cascader} from 'antd';
import moment from 'moment';
import Appointment from './Appointments'
import useFetch from '../useFetch';

const SpecBooking = () => {
    const [form] = Form.useForm();
    const {Option} = Select;
    const [type, setType] = useState('');
    const [typeTwo, setTypeTwo] = useState("");
    const [room, setRoom] = useState("Select room");
    const [newDate, setNewDate] = useState([]);
    const [docName, setdocName] = useState([]);
    const [docDate, setDocDate] = useState([]);
    const [doc, setDoc] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [dateState, setDateState] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [docSelect, setDocSelect] = useState([]);
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
    // //     .catch(err => console.log("error ", err))
    // const {data, isPending, setData} = useFetch("http://localhost:8000/doctors");
    function makeDate(data){
        console.log(data);
    }
    


    const disabledDatedd = (current) => { 
            if(!docSelect){
                return console.log("Cannot display disabled dates unless doctor is selected first")
            }                                            //does not show disabled dates because no doctor is selected yet
            else{                                   //execute if doctor has been selected
                console.log("this part has executed, but check the logic further")
                for(let i=0; i<rawData.length; i++){    //executes thrice because that's how long rawData is at the time this line was written.
                if(docSelect === rawData[i].name){             //if the value selected matches any name in the array
                for(let j=0; j<rawData[i].unavailable.length; j++){ //loop through the array whose first name matches the selected
                if(current < moment() || rawData[i].unavailable[j] == moment(current).format("YYYY-MM-DD")){
                    
                    return current;
                }//this block will disable the dates that have been found in the array
            }}
        }
        }
        };

    const onSelect = (data) => {
    }
    const [formData, setFormData] = useState(null);


    useEffect(()=>{
        fetch("http://localhost:8000/doctors")
        .then(res => res.json())
        .then(data => {
            setRawData(data);
            data.map(value => {setDoc(val => [...val, value.name])})
            for(let i=0; i<data.length; i++){
                console.log("This message will print many times. Count them yourself")
                console.log("When you see this message, it means the data was successfully printed", data[i].name)
                console.log("At this point, I have begun storing the data in an array", setdocName(val => [...val, data[i].name]))
                for(let j=0; j<data[i].unavailable.length; j++){
                    console.log("This is a second loop that executes to sort the deeper elements of the data")
                    setDocDate(val => [...val, data[i].unavailable[j]])
                    console.log("I have successfully set the dates of unavailable doctors if you see this message", data[i].unavailable[j])
                }
            }
        })
        .catch(err => console.log(err.message))

        fetch("http://localhost:8000/departments")
        .then(res => res.json())
        .then(results => {
        setDepartments(results);
        console.log("Departments fetched", results)
        })
    }, [])
    const setValues = (dep) => {
        setDocSelect([]);
        setDateState(true);
        setDoc([]);
        setType(dep);
        form.setFieldsValue({"doctor": "select doctor to see"});
        for(let i=0; i<rawData.length; i++){
                if(rawData[i].department === dep){
                    console.log("Match has been found", rawData[i].name);
                    setDoc(val => [...val, rawData[i].name])
                }
        }
    }
    // const selector = () => {
    //     setDoc(docDep);
    //     console.log(doc, "is the value of the selected")
    //     setDateState(false);
    // }
    
    const onFinish = (data) => {
            data.appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD", "HH:mm:ss")
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
            message.info('Successfully created an appointment');
            form.resetFields();
    })
        .catch(error => message.error(error.message))
        }

    const createDoc = (value) => {
        console.log("This is the value that has been selected", value);
        setDocSelect(value);
        setDateState(false);
    }

    useEffect(() => {
      console.log("The value of docselect has changed")
    }, [docSelect])
    
    
    
  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
        <Card hoverable style={{width: 550}} getContainer={false} forceRender>
        <Form form={form} layout='vertical' onFinish={onFinish}>
            {console.log('This is the value of the values stored in the state variable', formData)}
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="name" label="first name" {...config}><Input/></Form.Item>
            <Form.Item name="second-name" label="second name" {...config}><Input/></Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="third-name" label="last name" {...config}><Input/></Form.Item>
            <Form.Item name="age" label="age" {...config} ><InputNumber style={{width: 185}}/></Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="phoneNumber" label="Phone number" {...config}><InputNumber style={{width: 185}}/></Form.Item>
            <Form.Item name="department" label="Department" {...config} style={{width: 185}}>
                <Select value={type} onChange={setValues} defaultValue={"select department to visit"}>
                {departments.map(val=>(<Option value={val.name}>{val.name}</Option>))}
                </Select>
                </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name="doctor" label="Doctor" {...config}>
                {<Select value={docSelect} onChange={createDoc}
                defaultValue={"select doctor to see"} style={{width: 180}}>
                {doc && doc.map(val => <Option value={val}>{val}</Option>)}
                </Select>}
            </Form.Item>
            <Form.Item name="clinic" label="Clinic" {...config} style={{width: 185}}>
                <Select value={typeTwo} onChange={setTypeTwo} defaultValue={"please select clinic"}>
                    <Option value={"inpatient"}>Inpatient</Option>
                    <Option value={"outpatient"}>Outpatient</Option>
                </Select>
                </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            <Form.Item name='appointmentDate' label="Date of appointment" {...config}>
                <DatePicker disabled={dateState} allowClear={true} showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss'), minuteStep: 30, disabledTime: moment('02:00:00', 'HH:mm:ss'),
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
            {console.log(docDate, "is the value stored in DocDate rn")}
            {console.log(docName, "is the value of doctor that has been stored")}
        </Form>
        
        </Card>
        
    {console.log(rawData, "is the value stored in the doctors record")}
    </div>
  )
}

export default SpecBooking;