import React, {useState, useEffect} from 'react';
import {Input, Calendar, Form, Card, DatePicker, Select, Row, Button, Alert,  message, InputNumber, Cascader, TimePicker, Tooltip} from 'antd';
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
    const [clinics, setClinics] = useState([]);
    const [docSelect, setDocSelect] = useState([]);
    const [depDisable, setDepDisable] = useState(false);
    const [toolVisible, setToolVisible] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState([]);
    let hour = [];
    let min = [];
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
    

    // const disableTime = (now) => {
    //     if (moment(now).format("HH:mm") < moment().format("HH:mm")){
    //         return{
    //             disabledHours: () => 12,
    //             disabledMinuutes: () => 10
    //         };
    //     }
    // }


    const disabledDatedd = (current) => { 
            if(!docSelect){
                return console.log("Cannot display disabled dates unless doctor is selected first")
            }                                            //does not show disabled dates because no doctor is selected yet
            else{    
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

        

        function range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
              result.push(i);
            }
            return result;
          }

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

        fetch("http://localhost:8000/clinics")
        .then(res => res.json())
        .then(results => {
        setClinics(results);
        console.log("Clinics fetched", results)
        })


        fetch("http://localhost:8000/appointmentDates")
        .then(res => res.json())
        .then(data => {
            setAppointmentDate(data);
        })



    }, [])
    const setValues = (clin) => {
        setDocSelect([]);
        setDateState(true);
        setDoc([]);
        setType(clin);
        form.setFieldsValue({"doctor": "select doctor to see"});
        for(let i=0; i<rawData.length; i++){
                if(rawData[i].clinic === clin){
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
            data.appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD");
            data.appointmentTime = moment(data.appointmentTime).format("HH:mm");
            data.dob = moment(data.dob).format("YYYY-MM-DD");
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
        setDepDisable(true);
        rawData.map(val => {
            if(val.name === value){
                form.setFieldsValue({"clinic": val.clinic})
            }
        })
    }


    useEffect(() => {
      console.log("The value of docselect has changed") 
    }, [docSelect])




    let timeDisabled = [];
    let disabledMinutes = [];
    const newFunc = (date) => {
        console.log("A date has been clicked")
        rawData.map(val => {
            if(val.name === docSelect){
                console.log("The doc selected matches record being checked")
                val.booked.map(det => {
                if(moment(date).format("YYYY-MM-DD") === moment(det.date).format("YYYY-MM-DD")){
                    console.log("The date selected matches record being examined")
                    det.time.map(t => {
                        console.log("This is the second deepest level of the code", t)
                        console.log("This is the time selected", moment(date).format("HH:mm"))
                        if(moment(date).format("HH:mm") === t){
                        console.log("so far so good, print the values now")
                        min.push(parseInt(moment(t, "HH:mm").format("mm")))
                    }})
                }
            })}
        })
        }
        //myArr = [12, 13, 14, 15]

    // const onChange = (val) => {
    //     myArr=[];
    //     console.log('This is the value returned by onchange', val)
    //     rawData.map(name => {
    //         if (name.name === docSelect){
    //             console.log(name.booked)
    //             if(moment(name.booked.date).format("YYYY-MM-DD") === moment(val).format("YYYY-MM-DD")){
    //                 name.booked.time.map(newTime => {
    //                     //console.log(newTime);
    //                     console.log(moment(val).format("HH:mm"))
    //                     if(newTime==(moment(val).format("HH:mm"))){
    //                         console.log("The times are the same son")
    //                         minArr.push(parseInt(moment(newTime, "HH:mm").format("mm")))
    //                     }
    //                     })
    //                 }

    //             }
    //                 //The block above disables the dates
                
    //     }
    // )}

    const DisabledTime = (val) => {
        console.log(val, " kkkkkkkkkkkkkk")
        return {
        disabledHours: ()=> hour,
        disabledMinutes: () => min
      }};
    
  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
        <Card hoverable style={{width: 550}} getContainer={false} forceRender>
        <Form form={form} layout='vertical' onFinish={onFinish}>
            {console.log('This is the value of the values stored in the state variable', formData)}
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item name="name" label="first name" {...config}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="second-name" label="second name" {...config}>
                        <Input/>
                    </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item name="third-name" label="last name" {...config}>
                        <Input/>
                    </Form.Item>
                    <Tooltip visible={toolVisible} title="Type date using format YYYY-MM-DD">
                    <Form.Item name='dob' label="Date of birth" {...config}>
                        <DatePicker allowClear={true} format="YYYY-MM-DD" style={{width: 180}}/>
                    </Form.Item>
                    </Tooltip>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item name="phoneNumber" label="Phone number" {...config}>
                        <InputNumber style={{width: 185}}/>
                        </Form.Item>
                    <Form.Item name="clinic" label="Clinics" {...config} style={{width: 185}}>
                        <Select value={type} onChange={setValues} disabled={depDisable} defaultValue={"select clinic to visit"}>
                        {clinics.map(val=>(<Option value={val.name}>{val.name}</Option>))}
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
                    {/* <Form.Item name="clinic" label="Clinic" {...config} style={{width: 185}}>
                        <Select value={typeTwo} onChange={setTypeTwo} defaultValue={"please select clinic"}>
                            <Option value={"inpatient"}>Inpatient</Option>
                            <Option value={"outpatient"}>Outpatient</Option>
                        </Select>
                        </Form.Item> */} 
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item name='appointmentDate' label="Date of appointment" {...config}>
                        <DatePicker disabled={dateState} showTime={{minuteStep: 20, format:"HH:mm", 
                        }}
                        disabledTime={DisabledTime}
                        onSelect={newFunc}
                        allowClear={true}
                        disabledDate={disabledDatedd}/>
                    </Form.Item>
                    <Form.Item name="room" label="Room" {...config} style={{width: 185}}>
                        <Select value={typeTwo} onChange={setRoom} defaultValue={"Select room"}>
                            <Option value={"A01"}>A02</Option>
                            <Option value={"A02"}>A03</Option>
                            <Option value={"A04"}>A04</Option>
                        </Select>
                        </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
            {/* <Form.Item name='appointmentTime' label="Time of appointment" {...config}>
                <TimePicker disabled={dateState} allowClear={true}
                defaultValue={moment('08:00:00', 'HH:mm:ss')} minuteStep={15}
                format="HH:mm:ss" disabledTime={DisabledTime}
                // disabledMinutes: () => disabledMinutes,
                />
            </Form.Item> */}
            </Row>
            <Form.Item><Button type='primary' htmlType='submit'>Book appointment</Button></Form.Item>
            
        </Form>
        
        </Card>
        
    {console.log(rawData, "is the value stored in the doctors record")}
    </div>
  )
}

export default SpecBooking;