import { Card, Col, Row, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../assets/doctor.css';
import { TeamOutlined, BookOutlined, GlobalOutlined, GiftOutlined, VideoCameraOutlined } from '@ant-design/icons';
import DemoColumn from './EmpLegend';
import MyDonut from './MyDonut';
import moment from 'moment';

const Doctor = () => {
  const [birthday, setBirthday] = useState([]);
  let bMonth = '';
  const [visible, setVisible] = useState(false);
  let response = [];

  useEffect(()=>{
    let theBirthday = '';
    async function getBirthday(){
      theBirthday = await fetch('http://localhost:8000/doctors');
      response = await theBirthday.json();
      response.map(doc => {
        setBirthday(val => [...val, moment(doc.dob, "YYYY-MM-DD").format('MM-DD')]);
      })
    }

    getBirthday();
  }, [])

  if(birthday){
    bMonth=''
    birthday.map(days => {
    if(moment().format('MM') === moment(days, "MM-DD").format('MM')){
          bMonth =+ 1;
    }
  })}


  return (
    <div className='container'>
      {<Modal visible={visible} onCancel={()=>setVisible(false)} onOk={()=>setVisible(false)}>
        <>Building in progress</>
      </Modal>}
      <Row className='smallCards'>
          <Col span={4}>
         { <Card
          onClick={()=>setVisible(true)}
          hoverable={true}
          style={{fontSize: '18px', height: 100, borderRadius: '8px', marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#ffe7ba' }}
          ><GiftOutlined /> Birthdays
          <p style={{fontSize: '13px', fontFamily: 'calibri', marginTop: 12}}>{bMonth} this month</p></Card>}
          </Col>
          <Col span={4}>
          <Card
          hoverable={true}
          style={{fontSize: '18px', height: 100, borderRadius: '8px', marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#efdbff'}}
          ><GlobalOutlined /> Confrences
          <p style={{fontSize: '13px', fontFamily: 'calibri', marginTop: 12}}>1 this month</p></Card>
          </Col>
          <Col span={4}>
          <Card
          hoverable={true}
          style={{fontSize: '18px', height: 100, borderRadius: '8px', marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#ffd6e7'}}
          ><VideoCameraOutlined /> Events
          <p style={{fontSize: '13px', fontFamily: 'calibri', marginTop: 12}}>6 this month</p></Card>
          </Col>
          <Col span={4}>
          <Card
          hoverable={true}
          style={{fontSize: '18px', height: 100, borderRadius: '8px', marginRight: 8, boxShadow: '4px 4px 10px #f3f3f3', backgroundColor: '#d6e4ff'}}
          ><BookOutlined /> Seminars
          <p style={{fontSize: '13px', fontFamily: 'calibri', marginTop: 12}}>4 this month</p></Card>
          </Col>
        </Row>
        <br />
        <Row gutter={32}>
        <Col span={6}>
        <Card size='small' className='mycards' hoverable={true}>
            <p style={{fontSize: '25px', fontweight: 70, fontFamily:'calibri'}}>21</p>
            <p style={{fontweight: 170, fontFamily: 'calibri', fontSize: 18}}>Total Permanent <TeamOutlined /></p>
            <div className='myCard'><p>Neurosurgeon</p><p className='numbers1'>50</p></div>
            <div className='myCard'><p>Dentist</p><p className='numbers'>60</p></div>
            <div className='myCard'><p>Audiology</p><p className='numbers3'>76</p></div>
            <div className='myCard'><p>Gyenecologist</p><p className='numbers4'>87</p></div>
            
        </Card>
        </Col>
        <Col span={6}>
        <Card size='small' className='mycards' hoverable={true}>
            <p style={{fontSize: '25px', fontweight: 70, fontFamily:'calibri'}}>17</p>
            <p style={{fontweight: 70, fontFamily: 'calibri', fontSize: 18}}>Contracted <TeamOutlined /></p>
            <div className='myCard'><p>Neurosurgeon</p><p className='numbers1'>12</p></div>
            <div className='myCard'><p>Dentist</p><p className='numbers'>23</p></div>
            <div className='myCard'><p>Audiology</p><p className='numbers3'>14</p></div>
            <div className='myCard'><p>Gyenecologist</p><p className='numbers4'>19</p></div>
            
        </Card>
        </Col>
        <Col span={6}>
        <Card size='small' className='mycards' hoverable={true}>
            <p style={{fontSize: '25px', fontweight: 70, fontFamily:'calibri'}}>25</p>
            <p style={{fontweight: 70, fontFamily: 'calibri', fontSize: 18}}>Total Nurses <TeamOutlined /></p>
            <div className='myCard'><p>Neurosurgeon</p><p className='numbers1'>65</p></div>
            <div className='myCard'><p>Dentist</p><p className='numbers'>53</p></div>
            <div className='myCard'><p>Audiology</p><p className='numbers3'>18</p></div>
            <div className='myCard'><p>Gyenecologist</p><p className='numbers4'>13</p></div>
            
        </Card>
        </Col>
        <Col span={6}>
        <Card size='small' className='mycards' hoverable={true}>
            <p style={{fontSize: '25px', fontweight: 70, fontFamily:'calibri'}}>25</p>
            <p style={{fontweight: 70, fontFamily: 'calibri', fontSize: 18}}>By gender <TeamOutlined /></p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <Card hoverable={true} style={{margin: 5}}><p style={{fontFamily: 'calibri', fontSize: 15}}>Male: 67</p></Card>
            <Card hoverable={true} style={{margin: 5}}><p style={{fontFamily: 'calibri', fontSize: 15}}>Female: 86</p></Card>
            </div>
            <div style={{height: 120}}>
            <MyDonut />
            </div>
        </Card>
        </Col>
        </Row>
        <br/>
    </div>
  );
};

export default Doctor;