import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import 'antd/dist/antd.css'
import './App.css'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { EditOutlined, UserOutlined, DatabaseOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserAddOutlined, DashboardOutlined, ScheduleOutlined, OrderedListOutlined } from '@ant-design/icons';
import {faker} from '@faker-js/faker'
//import './components/Legend';

const App = () => {
    const users = [];
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [dashHidden, sethidden] = useState(true);
    const [patientHidden, setpatientHidden] = useState(true);
    const[doctorHidden, setdoctorHidden] = useState(true);
  
const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


// const items2 = [
//   {
//     key: 1,
//     label: 'Patient',
//     children: [{
//       subkey: "1-1",
//       label: "patient dashboard",
//     },
//     {
//       subkey: "1-2",
//       label: "Patient details",
//     }]
//   },
//   {
//     key: 2,
//     label: 'doctor',
//     children: [{
//       subkey: "2-1",
//       label: 'doctors dashboard',
//     },
//     {
//       subkey: "2-2",
//       label: 'doctors details',
//     }]
//   }
// ];

const dashboard1 = () => { 
  return (navigate('Legend'));
}

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email();


const updateUsers = () => {
  for (let i = 0 ; i<=10; i++){
    users.push(
      {"firstName": faker.name.firstName(),
       "lastName" : faker.name.lastName(),
       "email": faker.internet.email(),
       "contacts": faker.phone.number(),
    }
    );
  }
}

  return(
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header>
    <Layout>
      <Sider width={220} trigger={null} collapsed={collapsed} collapsible className="site-layout-background">
        {/* <Button onClick={() => {sethidden(false); setpatientHidden(true); setdoctorHidden(true)}} style={{
          border: 0,
          width: '100%',
          marginTop: 4,
          marginBottom: 4,
        }}>Dashboard</Button>
        <Button onClick={() => {sethidden(true); setpatientHidden(false); setdoctorHidden(true)}} style={{
          border: 0,
          width: '100%',
          marginTop: 4,
          marginBottom: 4,
        }}>Patient details</Button>
        <Button onClick={() => {sethidden(true); setpatientHidden(true); setdoctorHidden(false)}} style={{
          border: 0,
          width: '100%',
          marginTop: 4,
          marginBottom: 4,
        }}>Doctor's dashboard</Button> */}
        <Menu mode='inline'>
          <Menu.Item><DashboardOutlined style={{marginRight: '3px'}}/><Link to='/Dashboard'>Main Dashboard</Link></Menu.Item>
          <Menu.Item><UserOutlined style={{marginRight: '3px'}}/><Link to='/Patient__record'>Patient Details</Link></Menu.Item>
          <Menu.SubMenu title="Doctors">
            <Menu.Item><DashboardOutlined style={{marginRight: '3px'}}/><Link to='/Doctor'>Doctor's dashboard</Link></Menu.Item>
            <Menu.Item><ScheduleOutlined style={{marginRight: '3px'}}/><Link to="/Schedule">Doctor's schedule</Link></Menu.Item>
            <Menu.Item><OrderedListOutlined style={{marginRight: '3px'}}/><Link to='/DoctorRecords'>Doctor's records</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item><UserAddOutlined style={{marginRight: '3px'}}/><Link to='/Booking'>Make Appointment</Link></Menu.Item>
          <Menu.Item><DatabaseOutlined style={{marginRight: '3px'}}/><Link to='/Appointments'>Appointments</Link></Menu.Item>
          <Menu.Item><EditOutlined style={{marginRight: '3px'}}/><Link to='/RoomAllocation'>Room Allocation</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <div style={{marginRight: 4, color: '#000'}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          </div>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            minWidth: '830px',
          }}
        >
          {updateUsers()}
          {}
            <Outlet/>
          {/**
          {!patientHidden? <Patientrecord/>: null}
          {!dashHidden? <Dashboard/>: null}
          {!doctorHidden? <Doctor/>: null} **/}
        </Content>
      </Layout>
    </Layout>
    
  </Layout>
);
};

export default App;