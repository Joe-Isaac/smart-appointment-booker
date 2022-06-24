import React from 'react';
import MyList from './myCard';
import LegendChart from './Legend';
import MyPie from './Chart';
import { Col, Row } from 'antd';
import Card from 'antd/lib/card/Card';
import {FacebookFilled, FolderOpenOutlined, InstagramFilled, LinkedinFilled, TwitterCircleFilled} from '@ant-design/icons';
import MyLiquid from './Liquid';
import MyLine from './MyLine'

const Dashboard = () => {
  return (
      
    <div>
    <p><strong>Dashboard</strong></p>
    <Row>
    <Col span={8}>
    <MyList/>
    </Col>
    <Col span={16}>
    <Row style={{
        justifyContent: 'space-evenly',
        marginTop: 15,
        marginBottom: 25,
    }}>
        <Card
        hoverable={true}
        size={'small'}
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            marginRight: 5,
            height: 150,
            backgroundColor: '#08979c',
            color: 'white',
        }}
        >
            <>
            <p style={{
                fontFamily: 'calibri',
                fontSize: 20,
                fontWeight: 23, 
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 10,
            }}><FolderOpenOutlined /> Operation income</p>
            <p style={{fontSize: 30, fontWeight: 45, fontFamily: 'calibri',}}>5,000,000</p>
            </>
        </Card>
        <Card
        hoverable={true}
        size={'small'}
        style={{
            fontFamily: 'calibri',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            marginRight: 5,
            height: 150,
            backgroundColor: '#096dd9',
            color: 'white',
        }}>
            <p style={{
                fontFamily: 'calibri',
                fontSize: 20,
                fontWeight: 23, 
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 10,
            }}><FolderOpenOutlined /> Pharmacy income</p>
            <p style={{fontSize: 30, fontWeight: 45, fontFamily: 'calibri',}}>2,760,000</p>
        </Card>
        <Card
        hoverable={true}
        size={'small'}
        style={{
            borderRadius: 14,
            marginRight: 5,
            height: 150,
            backgroundColor: '#c41d7f',
            color: 'white',
        }}>
            <p style={{
                fontFamily: 'calibri',
                fontSize: 20,
                fontWeight: 23, 
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 10,
            }}><FolderOpenOutlined /> Hospital expenses</p>
            <p style={{fontSize: 30, fontWeight: 45, fontFamily: 'calibri',}}>900,000</p>
        </Card>
    </Row>
    <LegendChart/>
    </Col>
    </Row>
    <br/>
    <br/>
    <Row>
    <Col span={14}>
    <p style={{marginLeft: 85, marginBottom: 0, paddingBottom: 0, fontSize: 30, fontWeight: 50, fontFamily: 'Calibri'}}>Classification of patients by age</p>
    <MyPie/>
    </Col>
    <Col span={10}>
    <p style={{marginLeft: 85, marginBottom: 0, paddingBottom: 0, fontSize: 30, fontWeight: 50, fontFamily: 'calibri'}}>Overall growth progress</p>
    <MyLiquid/>
    </Col>
    </Row>
    <br/>
    <br/>
    <Row style={{height: 325, display:'flex', justifyContent: 'space-between'}}>
    
    <Col span={6} style={{border: 0.5, borderStyle: 'solid', borderColor: '#f3f3f3',}}>
    <Card style={{display: 'flex', alignItems:'center', justifyContent: 'space-between', width:'100%', height: 180, marginTop: 34, padding: 0, border: 0,}}>
        <div 
        style={{fontSize: 20, fontFamily: 'calibri', fontWeight: 100, }}>Social Counter</div>
        <div 
        style={{display:'flex', justifyContent:'space-between', fontSize: 19, fontFamily: 'calibri', width: '100%', margin: 1, marginTop:15 }}>
            <FacebookFilled/> 309</div>
        <div
        style={{display:'flex', justifyContent:'space-between', fontSize: 19, fontFamily: 'calibri', width: '100%', margin: 1, marginTop:15 }}>
            <InstagramFilled/> 435</div>
        <div 
        style={{display:'flex', justifyContent:'space-between', fontSize: 19, fontFamily: 'calibri', width: '100%', margin: 1, marginTop:15}}>
            <LinkedinFilled/> 230</div>
        <div 
        style={{display:'flex', justifyContent:'space-between', fontSize: 19, fontFamily: 'calibri', width: '100%', margin: 1, marginTop:8}}>
            <TwitterCircleFilled /> 189</div>
    </Card>
    </Col>
    <Col span={16} style={{height: '310px', paddingBottom: 5}}>
            <p>Patient Population Statistics</p>
            <MyLine />
    </Col>
    </Row>
    </div>
  )
}

export default Dashboard;