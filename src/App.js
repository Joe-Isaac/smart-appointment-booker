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
    </Header>
    <Layout>
      <Sider width={220} trigger={null} collapsed={collapsed} collapsible className="site-layout-background">
        <Menu mode='inline'>
          <Menu.Item key={1}><DashboardOutlined style={{marginRight: '3px'}}/><Link to='/Dashboard'>Main Dashboard</Link></Menu.Item>
          <Menu.Item key={2}><UserOutlined style={{marginRight: '3px'}}/><Link to='/Patient__record'>Patient Details</Link></Menu.Item>
          <Menu.SubMenu title="Doctors" key={9}>
            <Menu.Item key={3}><DashboardOutlined style={{marginRight: '3px'}}/><Link to='/Doctor'>Doctor's dashboard</Link></Menu.Item>
            <Menu.Item key={4}><ScheduleOutlined style={{marginRight: '3px'}}/><Link to="/Schedule">Doctor's schedule</Link></Menu.Item>
            <Menu.Item key={5}><OrderedListOutlined style={{marginRight: '3px'}}/><Link to='/DoctorRecords'>Doctor's records</Link></Menu.Item>
          </Menu.SubMenu >
          <Menu.Item key={6}><UserAddOutlined style={{marginRight: '3px'}}/><Link to='/Booking'>Make Appointment</Link></Menu.Item>
          <Menu.Item key={7}><DatabaseOutlined style={{marginRight: '3px'}}/><Link to='/Appointments'>Appointments</Link></Menu.Item>
          <Menu.Item key={8}><EditOutlined style={{marginRight: '3px'}}/><Link to='/RoomAllocation'>Room Allocation</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        
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
            <Outlet/>
        </Content>
      </Layout>
    </Layout>
    
  </Layout>
);
};

export default App;