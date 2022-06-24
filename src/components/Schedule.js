import React from 'react';
import { Alert, DatePicker, Select, Space, TimePicker, Calendar, Card, Badge, Timeline, Row, Col, Modal } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';

const Schedule = () => {
    const { Option } = Select;
    const PickerWithType = ({ type, onChange }) => {
        if (type === 'time') return <TimePicker use12Hours format={format} onChange={onChange} />;
        return <DatePicker picker={type} onChange={onChange} />;
      };
    const [type, setType] = useState('time');
    
    const format = 'HH:mm';

    const dateCellRender = (value) => {
        let num = value.date();
        if(num === '') {
            var listdata = [
                {type: "warning", content: "This is a warning"},
            ];
            return <Badge status={num} text={listdata.content}/>
        }

        return listdata;
    };

    const [value, setValue] = useState(moment('2022-06-21', 'YYYY-MM-DD'));
    const [selectedValue, setSelectedValue] = useState(moment('2022-06-20', 'YYYY-MM-DD'));
    const onPanelChange = (value) => {
        setValue(value);
    }
    const [open, setOpen] = useState(false);
    const [myArray, setMyArray] = useState(['2022-06-21', '2022-09-13', '2022-06-21', '2022-09-13', '2022-06-21', '2022-09-13']);

    const onSelect = (value) => {
        let newValue = value?.format('YYYY-MM-DD');
        setValue(newValue);
        setSelectedValue(value);

        if(value.date()===24){setOpen(true)}
        console.log('a value has been selected boy', newValue);
        console.log(typeof(value));
        console.log(typeof(newValue));
        setMyArray(arr => [...arr, newValue]);
        console.log(myArray);
    }
    
    
  return (
    <>
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
    <br/>
    <br/>
    <br/>
    <Row style={{display: 'flex', marginLeft: 100}}>
    <Col>
    <Card hoverable style={{width: 450, height: 400}}>
    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
    <Calendar dateCellRender={dateCellRender} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange}/>
    </Card>
    </Col>
    <Col style={{marginRight: 200}}>
    <Timeline mode={"alternate"} style={{width: 300}}>
        {myArray.map(item => (<Timeline.Item key={Math.random()}>{item}</Timeline.Item>))}
    </Timeline>
    </Col>
    <Modal visible={open} onOk={() => setOpen(false)} onCancel={()=>setOpen(false)}>
      <p>timeline could go here</p>
      <p>timeline could go here</p>
    </Modal>
    </Row>
    </>
  );
};

export default Schedule