import React from 'react';
import {useState, useEffect} from 'react';
import {Table, Button, Input, Modal, Card, Spin, message, Form, DatePicker} from 'antd';
import { DeleteOutlined, EditOutlined,  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useFetch from '../useFetch';

const Appointment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [data, setData] = useState();
    const [isPending, setIsPending] = useState(true);
    const [docData, setDocData] = useState([]);

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
    console.log(record);
    let usedId = record.id
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        fetch(("http://192.168.2.179:8000/appointments/" + usedId), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(data),
        })
        .then(response => response.json)
        .then(results => {
            message.info('Successfully cancelled an appointment');
            console.log("This is what's returned after deleting a record", results)
            setIsPending(false);
            fetch("http://192.168.2.179:8000/appointments")
            .then(res => res.json())
            .then(data => {
              setData(data);
              console.log("This is the doc data", data)
            })
            .catch(err => console.log(err.message))
    })
      }
    })
  }
  
  const columns = [
    {
      key:1,
      title:'id',
      dataIndex: 'id'
    },
    {
      key:2,
      title:'name',
      dataIndex: 'name'
    },
    {
      key:3,
      title:'dob',
      dataIndex: 'dob'
    },
    {
      key:4,
      title:'phone-number',
      dataIndex: 'phoneNumber'
    },
    {
      key: 5,
      title: 'date of appointment',
      dataIndex: 'appointmentDate',
    },
    {
      key:6,
      title:'Appointment status',
      dataIndex: 'status'
    },
    {
      key:7,
      title:'Department',
      dataIndex: 'department'
    },
    {
      key:8,
      title:'Doctor',
      dataIndex: 'doctor'
    },
    {
      key:9,
      title:'clinic',
      dataIndex: 'clinic',
    },
    {
      key:10,
      title:'Room Allocated',
      dataIndex: 'room',
    },
    {
      key: 11,
      title: 'Time of appointment',
      dataIndex: 'appointmentTime',
    },
    {
      key: 12,
      title: 'actions',
      render: (record) => {
      return <>
      <div>
      <div>
      <EditOutlined onClick={() => {
        editUser(record);
      }}/>
      Reschedule 
      </div>
      <div>
      <DeleteOutlined onClick={() => {
        deleteUser(record);
      }
      } style={{color: 'red', marginLeft:16,}}/>
      Cancel appointment
      </div>
      </div>
      </>
    }}
  ];
  // const {setData, data, isPending} = useFetch('http://localhost:8000/appointments');

    useEffect(() => {
      fetch("http://192.168.2.179:8000/appointments")
      .then(res => res.json())
      .then(results => {
        setData(results);
        console.log("results", results)
        setIsPending(false);
      })

      fetch("http://192.168.2.179:8000/doctors")
      .then(response => response.json())
      .then(data => {

      })

      return ()=>console.log("useEffect destroyed")
    }, [])

    
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
                <Card hoverable={true}>
                <Form style={{textAlign: 'center', display:'flex', flexDirection:'column',
              alignItems:'center'}}>
                  <Form.Item style={{width: 300}}>
                    Name
                    <Input disabled/>
                  </Form.Item>
                  <Form.Item style={{width: 300}}>
                    Age
                    <Input disabled/>
                  </Form.Item>
                  <Form.Item style={{width: 300}}>
                    Phone Number
                    <Input/>
                  </Form.Item>
                  <label>
                    current date
                  </label>
                  <Form.Item style={{width: 300}}>
                    Edit date
                    <DatePicker/>
                  </Form.Item>
                </Form>
                </Card>
            </Modal>
            <div style={{border: '1px', borderStyle: 'solid', borderColor: '#f3f3f3', width: 'fit-content', padding: '4px', backgroundColor: '#1890ff'}}><Link style={{color:'white', fontFamily: 'calibri', fontWeight:30, fontSize: 16}} to='/Booking'>Create new Appointment</Link></div>
              {data && <Table
                style={{color: 'purple', padding: 5,}}
                size={'middle'}
                columns={columns}
                dataSource={data} 
            />}
            {isPending && <><Spin size="large"/><p>Loading...</p></>}

      </>
  )
  
}

export default Appointment;