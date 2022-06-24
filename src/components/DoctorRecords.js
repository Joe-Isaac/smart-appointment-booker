import React from 'react'
import {useState} from 'react';
import {Table, Button, Input, Modal, Card} from 'antd';
import { DeleteOutlined, EditOutlined,  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DoctorRecords = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [dataSource, setDataSource] = useState([
      {
        id:9,
        name: 'Dr. Ptolemy Clive',
        gender: 'male',
        email: 'lems@gmail.com',
        specialty: 'Dentist',
        address: '4th street, Nairobi'
      },
      {
        id:10,
        name: 'Dr. Quincy Omash',
        gender: 'female',
        email: 'breezy@gmail.com',
        specialty: 'Physician',
        address: 'Crow drive, Kahawa'
      },
      {
        id:11,
        name: 'Dr. Roise Clement',
        gender: 'male',
        email: 'roise@gmail.com',
        specialty: 'Gyenecologist',
        address: '2nd street, Kiambu'
      },
  ])

  const addUser = () => {
    const randomVariable = parseInt(Math.random() * 1000);
    const newUser = {
      id: randomVariable,
      name: randomVariable + "User",
      gender: randomVariable + "gender",
      email: randomVariable + "@gmail.com",
      address: randomVariable + "Address"
    }
    //This is how we add something to the bottom of the list in arrays.
    setDataSource(prev => {
      return [...prev, newUser];
    })
  }

  const editUser = (record) => {
    setIsVisible(true);
    setEditing({...record});
  }
  
  const deleteUser = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        return setDataSource(pre=> {
          return pre.filter((user) => user.id !== record.id);
        })
      }
    })
  }
  
  const columns = [
    {
      key:1,
      title:'name',
      dataIndex: 'name'
    },
    {
      key:2,
      title:'gender',
      dataIndex: 'gender'
    },
    {
      key:3,
      title:'email',
      dataIndex: 'email'
    },
    {
      key: 4,
      title: 'Specialty',
      dataIndex: 'specialty',
    },
    {
      key:5,
      title:'Address',
      dataIndex: 'address'
    },
    // {
    //   key: 6,
    //   title: 'actions',
    //   render: (record) => {
    //   return <>
    //   <div>
    //   <div>
    //   <EditOutlined onClick={() => {
    //     //editUser(record);
    //   }}/>
    //   Reschedule 
    //   </div>
    //   <div>
    //   <DeleteOutlined onClick={() => {
    //     //deleteUser(record);
    //   }
    //   } style={{color: 'red', marginLeft:16,}}/>
    //   Cancel appointment
    //   </div>
    //   </div>
    //   </>
    // }}
  ];
  return(
      <>
      <Modal
            visible={isVisible}
            title={"Edit user"}
            onOk={
              () => {
                setDataSource(pre => {
                    return pre.map(user => {
                      if(user.id === editing.id){
                        return editing;
                      }
                      else{
                        return user;
                      }
                    })
                })
                setIsVisible(false);
              }
          }
            onCancel={() => setIsVisible(false)}
            closable={true}
            okText={'save'}>
                <label style={{width: 8, marginBottom: 3, marginLeft: 25}}>Name</label>
                <Input style={{margin: 8, borderRadius: 5,}}value={editing?.name} onChange={
                  (e) => {
                    setEditing(pre=>{
                      return {...pre, name:e.target.value}
                    })
                  }
                }/>
                <label style={{width: 8, marginBottom: 3, marginLeft: 25}}>Gender</label>
                <Input style={{margin: 8, borderRadius: 5,}} value={editing?.gender} onChange={
                  (e) => {
                    setEditing(pre=>{
                      return {...pre, gender:e.target.value}
                    })
                  }
                }/>
                <label style={{width: 8, marginBottom: 3, marginLeft: 25}}>Email</label>
                <Input style={{margin: 8, borderRadius: 5,}}value={editing?.email} onChange={
                  (e) => {
                    setEditing(pre=>{
                      return {...pre, email:e.target.value}
                    })
                  }
                }/>
                <label style={{width: 8, marginBottom: 3, marginLeft: 25}}>Address</label>
                <Input style={{margin: 8, borderRadius: 5,}} value={editing?.address} onChange={
                  (e) => {
                    setEditing(pre=>{
                      return {...pre, address:e.target.value}
                    })
                  }
                }/>
            </Modal>
            
              <Table
                style={{color: 'purple', padding: 5,}}
                size={'middle'}
                columns={columns}
                dataSource={dataSource} 
            />

      </>
  )
  
}

export default DoctorRecords