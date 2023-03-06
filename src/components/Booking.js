import React, {useState, useEffect} from 'react';
import { Input, Form, Card, DatePicker, Select, Row, Button,  message, InputNumber, Tooltip, Col, Tag} from 'antd';
import moment from 'moment';

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
    const [toolDeterminer, setToolDeterminer] = useState(false);
    const [show, setShow] = useState(true)
    const [selectedDate, setSelectedDate] =  useState('');
    const [display, setDisplay] = useState(false);
    const [visibleTime, setVisibleTime] = useState(true);
    const [lastToolVisible, setlastToolVisible] = useState(true);
    const [timeVisible, setTimeVisible] = useState(true);
    const [newTimeDeterminer, setNewTimeDeterminer] = useState(false);
    const [newerTimeDeterminer, setNewerTimeDeterminer] = useState(false);
    let hour = [];
    let min = [];
    let count = 0;
    let timeArray = [];
    const config = {
        rules: [
            {
                required: true,
                message: "cannot be empty"
            },
        ],
    };
    


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
            data.map(value => {setDoc(val => [...val, value])})
            for(let i=0; i<data.length; i++){

                for(let j=0; j<data[i].unavailable.length; j++){
                    setDocDate(val => [...val, data[i].unavailable[j]])
                }
            }
        })
        .catch(err => message.error(err.message))

        fetch("http://localhost:8000/clinics")
        .then(res => res.json())
        .then(results => {
        setClinics(results);
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
                    setDoc(val => [...val, rawData[i]])
                }
        }
    }
    
    const onFinish = (data) => {
            data.appointmentDate = moment(data.appointmentDate).format("YYYY-MM-DD");
            data.dob = moment(data.dob).format("YYYY-MM-DD");
            data.appointmentTime = moment(data.appointmentTime, "HH:mm").format("HH:mm");
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
            setTimeVisible(true);
            message.info("Successfully scheduled an appointment")
        })
        .catch(error => message.error(error.message))



        // ------------------------------------------------------
        //-----------------------------------------------------------



        fetch("http://localhost:8000/doctors?name="+data.doctor)
        .then(response => response.json())
        .then(results => {
             let truth = false;
        //     console.log('Successfully acquired this data from the doctors profile',results)
             let operatingData = results[0];
                 operatingData.booked.map(d => {
                     if(moment(data.appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD") === d.date){
                         d.time.push(moment(data.appointmentTime, "HH:mm").format("HH:mm"))
                         //console.log("If the date matched, this is the result", results)
                        truth = true;
                        setDisplay(false);
                    }
                })
                if(truth == false){
                    operatingData.booked.push(
                        {
                            "date": moment(data.appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
                            "time": [moment(data.appointmentTime, "HH:mm").format("HH:mm")]
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
                    fetch("http://localhost:8000/doctors")
                        .then(res => res.json())
                        .then(data => {
                            setRawData(data);
                })
            })
            .catch(error => message.error(error.message))
              })
             .catch(err => message.error(err.message))



    }


    const createDoc = (value) => {
        setToolDeterminer(true);
        setDocSelect(value);
        setDateState(false);
        setDepDisable(true);
        rawData.map(val => {
            if(val.name === value){
                form.setFieldsValue({"clinic": val.clinic})
            }
        })
    }



    let dimeArray = [];


    const newFunc = (date) => {
        setSelectedDate(date)
        form.setFieldsValue({"appointmentTime": ''})
        setDisplay(true);
        setTimeVisible(false);

        rawData.map(val => {
            if(val.name === docSelect){
                val.booked.map(det => {
                if(moment(date).format("YYYY-MM-DD") === moment(det.date).format("YYYY-MM-DD")){
                    //console.log("The date selected matches record being examined");
                    min = []
                    
                    
                    det.time.map(t => {
                        
                        dimeArray.push(moment(t, "HH:mm").format("HH:mm"))
                        
                         if(moment(date).format("HH") === moment(t, "HH:mm").format("HH")){
                            min.push(parseInt(moment(t, "HH:mm").format("mm")));
                            }
                        
                        })
                }})
            }})
                timeArray = dimeArray;
        }
        
        

    const DisabledTime = () => {
        return {
        disabledHours: ()=> hour,
        disabledMinutes: () => min
      }};

      const enabledHours = ['08','09','10','11','12','13','14','15','16','17','18'];
      const enabledMinutes = ['00', '20', '40'];
      let color = "";
      let realerTime = []
      let truthVar = false;
    
  return (
    <div >
        <Row style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Col>
            
        <Card
        style={{fontSize: '18px', height: 550, width:550, borderRadius: '8px',
         marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#e6f7ff' }}
        hoverable={true}>
            
        <Form form={form} layout='vertical' onFinish={onFinish}>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item key={1} name="name" style={{width: 185}} label="first name" {...config}>
                        <Input/>
                    </Form.Item>
                    <Form.Item key={2} name="second-name" style={{width: 185}} label="second name" {...config}>
                        <Input/>
                    </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item key={3} name="third-name" style={{width: 185}} label="last name" {...config}>
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item key={4} name='dob' style={{width: 185}} label="Date of birth" {...config}>
                        <DatePicker allowClear={true} format="YYYY-MM-DD" style={{width: 185}}/>
                    </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item key={5} name="phoneNumber" style={{width: 185}} label="Phone number" {...config}>
                        <InputNumber style={{width: 185}}/>
                        </Form.Item>
                    <Form.Item key={6} name="clinic" label="Clinics" {...config} style={{width: 185}}>
                        <Select value={type} onChange={setValues} disabled={depDisable} initialvalue={"select clinic to visit"}>
                        {clinics.map(val=>(<Option key={val.id} value={val.name}>{val.name}</Option>))}
                        </Select>
                    </Form.Item>
            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Item key={7} name="doctor" style={{width: 185}} label="Doctor" {...config}>
                        {<Select value={docSelect} onChange={createDoc}
                        initialvalue={"select doctor to see"} style={{width: 185}}>
                        {doc && doc.map(val => <Option key={val.id} value={val.name}>{val.name}</Option>)}
                        </Select>}
                    </Form.Item>

                    <Tooltip visible={newTimeDeterminer} onMouseEnter={() => {
                        setNewTimeDeterminer(timeVisible);
                    }} onMouseLeave={()=>setNewTimeDeterminer(false)} title="This part is disabled, enter date to activate time selection pane">

                    <Tooltip visible={newerTimeDeterminer} onMouseEnter={()=>{
                        setNewerTimeDeterminer(!timeVisible)
                    }}
                    onMouseLeave={()=>{setNewerTimeDeterminer(false)}} 
                    title="Enter time using the time selection pane">
                    <Form.Item key={8} name='appointmentTime' style={{width: 185}} label="Time of appointment" {...config}>
                

                                <Input disabled={true} style={{color:"blue"}}/>

                    
                        
                        
                    </Form.Item>
                    </Tooltip>
                    </Tooltip>

            </Row>
            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                <Tooltip visible={toolVisible} onMouseEnter={()=>{
                    if(!toolDeterminer){
                        setToolVisible(true);
                    }
                
                }} 
                    onMouseLeave={()=>setToolVisible(false)} title="Date selection is disabled, please select doctor first">
                    <Form.Item key={9} name='appointmentDate' style={{width: 185}} label="Date of appointment" {...config}>
                        <DatePicker style={{width: 185}} disabled={dateState}
                        disabledTime={DisabledTime}
                        onChange={newFunc}
                        allowClear={true}
                        disabledDate={disabledDatedd}/>
                    </Form.Item>
                    </Tooltip>
                    <Form.Item key={10} name="room" label="Room" {...config} style={{width: 185}}>
                        <Select value={typeTwo} onChange={setRoom} initialvalue={"Select room"}>
                            <Option key={1} value={"A01"}>A02</Option>
                            <Option key={2} value={"A02"}>A03</Option>
                            <Option key={3} value={"A04"}>A04</Option>
                        </Select>
                        </Form.Item>
            </Row>

            <Form.Item key={11}><Button type='primary' htmlType='submit'>Book appointment</Button></Form.Item>
            
        </Form>
        
        </Card>
            </Col>
            <Col>
            {display &&  <Card hoverable style={{width:300, boxShadow: '1px 4px 10px 10px #f3f3f3', 
                                   textAlign:'center' }}>
            <p style={{fontFamily:"calibri", fontSize: 20, margin:0}}><strong>Time selection pane</strong></p>
            
            {selectedDate && <p style={{marginBottom:5, marginTop:0, padding:0, fontSize:13, fontFamily:'calibri'}}>
                <strong>Date selected: {moment(selectedDate).format('YYYY-MM-DD')}</strong>
            </p>}

            <Tooltip visible={visibleTime} onMouseEnter={()=>{

                setTimeout(()=>{
                    setVisibleTime(false);
                    setlastToolVisible(false);
                }, 1000)

            }}
            title="Select time slot using this pane"><div>{
                enabledHours.map(val => <div style={{display:'flex', flexDirection: 'row',
                justifyContent: 'space-between'}}>
                    {
                    enabledMinutes.map(min => {
                    
                        color = '#52c41a';
                        
                        rawData.map(item => {
                            if(item.name === docSelect){
                                item.booked.map(newdate => {
                                    if(newdate.date === moment(selectedDate).format("YYYY-MM-DD")){
                                        newdate.time.map(realtime => {
                                            
                                            if(moment(realtime, "HH:mm").format("HH:mm") === moment(val + ":" + min, "HH:mm").format("HH:mm")){
                                                color="#fa541c";
                                                realerTime.push(realtime);
                                            }

                                        })
                                        
                                    }
                                })
                            }
                        })
                    
                        
                        let allTime = val+":"+min;

                    return(
                    <>
                    <Tag
                     style={{ 
                        width: 15,
                        height: 15,
                    }} color={color}
                    onClick={()=>{
                        realerTime.map(real => {
                        if(moment(real, "HH:mm").format("HH:mm") === moment(allTime, "HH:mm").format("HH:mm")){
                            message.error("Cannot select a taken slot")
                            truthVar=true;
                            form.setFieldsValue({"appointmentTime": ''})
                            }
                            
                        })

                        if(truthVar === false){
                            message.info("Time selected");
                            form.setFieldsValue({"appointmentTime": moment(allTime, "HH:mm").format("HH:mm")})
                        }

                        truthVar=false;
                        
                        
                    }}
                    />
                    <p style={{paddingTop:0, marginTop:0 }}>{val+":"+min}</p>
                    </>)
    
})}
                </div>
                )
                }
                    <br/>
                    <Tag style={{
                        width: 15,
                        height: 15,
                    }} color="#fa541c"/>
                    Means slot unavailable
                    <br/>
                    <Tag style={{
                        width: 15,
                        height: 15,
                    }} color="#52c41a"/>
                    Means slot is available
                </div>
                </Tooltip>

        
            </Card>
}
            </Col>
        </Row>
    </div>
  )
}

export default SpecBooking;