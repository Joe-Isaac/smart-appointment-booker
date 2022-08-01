import React, {useState, useEffect} from 'react';
import { Input, Calendar, Form, Card, DatePicker, Select, Row, Button, Alert,  message, InputNumber,
    Cascader, TimePicker, Tooltip, Col, Badge, Tag} from 'antd';
import moment from 'moment';
import Appointment from './Appointments'
import useFetch from '../useFetch';
import Operation from 'antd/lib/transfer/operation';
import { CheckCircleOutlined, CheckCircleFilled, } from '@ant-design/icons';

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
    const [isFull, setIsFull] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [show, setShow] = useState(true)
    const [selectedDate, setSelectedDate] = useState();
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
                return message.warning("Cannot display disabled dates unless doctor is selected first")
            }                                            //does not show disabled dates because no doctor is selected yet
            else{   
                let countArr = [];
                countArr = range(0,8);
                hour = countArr.concat(range(19, 24));
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

                for(let j=0; j<data[i].unavailable.length; j++){
                    setDocDate(val => [...val, data[i].unavailable[j]])
                    
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


        fetch("http://localhost:8000/appointments")
        .then(res => res.json())
        .then(data => {
            setAppointmentDate(data);
        })



    }, [])
    const setValues = (clin) => {
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
            data.appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD HH:mm");
            data.dob = moment(data.dob).format("YYYY-MM-DD");
            //console.log('This is where I collect the data', data);
            fetch("http://localhost:8000/appointments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
        })
        .then(val =>{
            form.resetFields()
            setDepDisable(false);
            setDateState(true);
            message.info("Successfully scheduled an appointment")
        })
        .catch(error => message.error(error.message))

        // ------------------------------------------------------
        //-----------------------------------------------------------
        fetch("http://localhost:8000/doctors?name="+data.doctor)
        .then(response => response.json())
        .then(results => {
            console.log("lllllllllllllll doctor", results)
             let truth = false;
        //     console.log('Successfully acquired this data from the doctors profile',results)
             let operatingData = results[0];
             console.log("This is the copy variable", operatingData);
                 operatingData.booked.map(d => {
                     if(moment(data.appointmentDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD") === d.date){
                         d.time.push(moment(data.appointmentDate, "YYYY-MM-DD HH:mm").format("HH:mm"))
                         //console.log("If the date matched, this is the result", results)
                        truth = true;
                    }
                })
                if(truth == false){
                    operatingData.booked.push(
                        {
                            "date": moment(data.appointmentDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD"),
                            "time": [moment(data.appointmentDate, "YYYY-MM-DD HH:mm").format("HH:mm")]
                        }
                    );
                    //console.log("If the date didnt match, this is the result", operatingData);
                }
                fetch("http://localhost:8000/doctors/"+operatingData.id, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body:JSON.stringify(operatingData)
                }).then( val => {
                    console.log("1st Promise resolved", val);
                    fetch("http://localhost:8000/doctors")
                        .then(res => res.json())
                        .then(data => {
                            setRawData(data);
                })
            })
            .catch(error => message.error(error.message))
              })
             .catch(err => console.log(err.message))



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


    // useEffect(() => {
    //   console.log("The value of docselect has changed") 
    // }, [docSelect])




    let timeDisabled = [];
    let disabledMinutes = [];
    const newFunc = (date) => {
        setSelectedDate(date);
        rawData.map(val => {
            if(val.name === docSelect){
                //console.log("The doc selected matches record being checked")
                val.booked.map(det => {
                if(moment(date).format("YYYY-MM-DD") === moment(det.date).format("YYYY-MM-DD")){
                    //console.log("The date selected matches record being examined");
                    min = []
                    
                    det.time.map(t => {
                        
                        // console.log("This is the second deepest level of the code", t)
                        // console.log("This is the time selected", moment(date).format("HH"))
                        // console.log("This is the time in hours of the appointed days for the selected doctor, in the database", moment(t, "HH:mm").format("HH"));
                         if(moment(date).format("HH") === moment(t, "HH:mm").format("HH")){
                            min.push(parseInt(moment(t, "HH:mm").format("mm")));
                            //console.log("Minute pushed", min)
                            }
                        
                        })
                        if(min.length===3){
                            message.warning("Cannot select hours which have full appointments")
                        }
                }})
            }})}
        
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

    const DisabledTime = () => {
        return {
        disabledHours: ()=> hour,
        disabledMinutes: () => min
      }};

      const enabledHours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
      const enabledMinutes = ['00', '20', '40'];

      let color = ''
    
  return (
    <div >
        <Row gutter={4} style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Col>
            
        <Card
        style={{fontSize: '18px', height: 550, width:550, borderRadius: '8px',
         marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#efdbff' }}
        hoverable={true} getContainer={false} forceRender>
            
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
                    
                    <Form.Item name='dob' label="Date of birth" {...config}>
                        <DatePicker allowClear={true} format="YYYY-MM-DD" style={{width: 180}}/>
                    </Form.Item>
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
                        initialValue={'2022-08-07 08:00'}
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
            </Col>
            <Col>
            <Card hoverable style={{width:300, boxShadow: '1px 4px 10px 10px #f3f3f3', 
                                   textAlign:'center'}}>
            <p style={{marginBottom: 3}}>Time availability table</p>
            <p style={{color:'blue', marginBottom:5, marginTop:0, padding:0, fontSize:13, fontFamily:'calibri'}}>
                Date selected: {moment(selectedDate).format('YYYY-MM-DD')}
            </p>
            {
                enabledHours.map(val => <div style={{display:'flex', flexDirection: 'row',
                justifyContent: 'space-between'}}>
                    {enabledMinutes.map(min => {
                        color = '';
                        
                        
                        if(moment(val+":"+min, "HH:mm").format("HH:mm")===moment("09:00", "HH:mm").format("HH:mm")){
                            color = "#f5222d";
                            console.log("These colors do actually match")
                        }
                        console.log(moment(val+":"+min, 'HH:mm').format("HH:mm"), "is the moment of the time shown")
                    return(
                    <>
                    <Tag style={{
                        width: 10,
                        height: 10,
                    }} color={color}/>
                    <p style={{paddingTop:0, marginTop:0 }}>{val+":"+min}</p>
                    </>)
    
})}
                </div>
                )
            }
            </Card>
            </Col>
        </Row>
    </div>
  )
}

export default SpecBooking;