import React from 'react'
import {useState, useEffect} from 'react';
import {Table, Button, Input, Modal, Card, Spin, Tree} from 'antd';
import { DeleteOutlined, EditOutlined,  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useFetch from '../useFetch';
const DoctorRecords = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    

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
    setData(prev => {
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
        return setData(pre=> {
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
    {
      key:6,
      title:'Unavailable',
      dataIndex: 'unavailable'
    },
    {
      key: 7,
      title: 'actions',
      render: (record) => {
      return <>
      <div>
      <div>
      <EditOutlined onClick={() => {
        editUser(record);
      }}/>
      Edit record
      </div>
      <div>
      <DeleteOutlined onClick={() => {
        deleteUser(record);
      }
      } style={{color: 'red', marginLeft:16,}}/>
      Delete record
      </div>
      </div>
      </>
    }}
  ];

  const {data, isPending, setData} = useFetch('http://192.168.2.179:8000/doctors');

  return(
      <>
      <Modal
            visible={isVisible}
            title={"Edit user"}
            onOk={
              () => {
                setData(pre => {
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
          
            {
              data && <Table
                style={{color: 'purple', padding: 5,}}
                size={'middle'}
                columns={columns}
                dataSource={data} 
            />
            }
            {isPending && <div><Spin size='default'/><p style={{fontSize: '20px'}}>Loading...</p></div>}
            {console.log(data, 'shows me the data')}
            
      </>
  )
  
}

export default DoctorRecords