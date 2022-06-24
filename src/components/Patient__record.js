import React from 'react';
import {useState} from 'react';
import {Table, Button, Input, Modal} from 'antd';
import { DeleteOutlined, EditOutlined,  } from '@ant-design/icons';

const Patientrecord = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [dataSource, setDataSource] = useState([
    {
      address: 'john Address',
      id:1,
      name: 'John',
      email: 'john@gmail.com',
      gender: 'male',
    },
    {
      id:2,
      name: 'Lynn',
      gender: 'female',
      email: 'Lynn@gmail.com',
      address: 'Lynn Address'
    },
    {
      id:3,
      gender: 'female',
      name: 'Kyra',
      email: 'kyra@gmail.com',
      address: 'kyra Address'
    },
    {
      id:4,
      name: 'Clay',
      gender: 'male',
      email: 'clay@gmail.com',
      address: 'clay Address'
    },
    {
        id:5,
        name: 'Droosky',
        gender: 'male',
        email: 'dro@gmail.com',
        address: 'dros Address'
      },
      {
        id:6,
        name: 'Harlow',
        gender: 'male',
        email: 'Harlow@gmail.com',
        address: 'Harlow Address'
      },
      {
        id:7,
        name: 'Christine',
        gender: 'female',
        email: 'christy@gmail.com',
        address: 'chris Address'
      },
      {
        id:8,
        name: 'Pauline',
        gender: 'female',
        email: 'liner@gmail.com',
        address: 'Lines Address'
      },
      {
        id:9,
        name: 'Ptolemy',
        gender: 'male',
        email: 'lems@gmail.com',
        address: 'Claudius Address'
      },
      {
        id:10,
        name: 'Bree',
        gender: 'female',
        email: 'breezy@gmail.com',
        address: 'breezers Address'
      },
      {
        id:11,
        name: 'Roise',
        gender: 'male',
        email: 'roise@gmail.com',
        address: 'roises Address'
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
      key:4,
      title:'address',
      dataIndex: 'address'
    },
    {
      key: 5,
      title: 'actions',
      render: (record) => {
      return <>
      <EditOutlined onClick={() => {
        editUser(record);
      }}/>
      <DeleteOutlined onClick={() => {
        deleteUser(record);
      }
      } style={{color: 'red', marginLeft:16,}}/>
      </>
    }}
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
            <Button style={{marginLeft: 20,}} onClick={addUser}>Add new user</Button>
              <Table
                style={{color: 'purple', padding: 5,}}
                size={'middle'}
                columns={columns}
                dataSource={dataSource} 
            />

      </>
  )
  
}

export default Patientrecord;