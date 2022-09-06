import { Button, DatePicker, Form, TimePicker, Row, Col, Input, Card, Select } from 'antd';
import moment from 'moment';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const formItemLayout = {
  style: {
    margin: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
};
const config = {
  rules: [
    {
      required: true,
      message: 'Please select!',
    },
  ],
  style: {
    marginTop: 15,
    marginRight: 45,
  }
};
const rangeConfig = {
  rules: [
    {
      required: true,
      message: 'Please select time!',
    },
  ],
  style: {
    marginTop: 15,
    marginRight: 20,
  }
};

const PatientBooking = () => {
    const {Option} = Select;
    const [gender, setGender] = useState("");
    const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];

    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
  };

  const disabledDates = (current) => {
    return current > moment('2022-06-10') && current < moment().endOf('day');
  }
  const disabledDated = (current) => {
    return current > moment('2022-06-16') && current < moment('2022-06-22');
  }

  const disabledDatedd = (current) => {
    return current.date() === 23||current.date() === 24||current.date() === 27;
    }

  return (
    <Col span={12} style={{marginLeft: 300, display: 'flex', justifyContent: 'center'}}>
    <Card hoverable={true}>
      <Form layout='vertical' name="appointment-picker" {...formItemLayout} onFinish={onFinish}>
      <Row gutter={15}>
      <Form.Item name="first-name" label="first name" {...config}>
        <Input />
      </Form.Item>
      <Form.Item name="month-picker" label="Second name" {...config}>
        <Input />
      </Form.Item>
      </Row>
      <Row gutter={15}>
      <Form.Item name="range-picker" label="Last name" {...config}>
        <Input />
      </Form.Item>
      <Form.Item name="range-time-picker" label="Phone number" {...config}>
        <Input />
      </Form.Item>
      </Row>
      <Row gutter={15}>
      <Form.Item name="email" label="Email" {...config}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" {...config}>
        <Select value={gender} onChange={setGender} defaultValue={"select gender"}>
            <Option value={'male'}>Male</Option>
            <Option value={'female'}>Female</Option>
            <Option value={'other'}>Other</Option>
            </Select>
      </Form.Item>
      </Row>
      <Row gutter={32}>
      <Form.Item name="time-picker" label="Age" {...config}>
        <Input />
      </Form.Item>
      <Form.Item name="date-time-picker" label="Pick date and time" {...config}>
        <DatePicker allowClear={true} showTime={{
        defaultValue: moment('00:00:00', 'HH:mm:ss'),
      }}
      format="YYYY-MM-DD HH:mm:ss" disabledDate={disabledDatedd}/>
      </Form.Item>
      </Row>
      <Row gutter={12}>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Book appointment
        </Button>
      </Form.Item>
      </Row>
    </Form>
    </Card>
    </Col>
    
  );
};

export default PatientBooking;