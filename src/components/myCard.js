import React from 'react';
import {Card, Carousel, Row, Col} from 'antd';
import {RiseOutlined, UserOutlined, MedicineBoxOutlined, EyeOutlined, SmileOutlined, LikeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const MyList = () => {
  return(
<div className="card" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>          
              <Col span={24}>
              <Card
                size="small"
                hoverable={true}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 2px -2px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px, rgba(0, 0, 0, 0.09) 0px 5px 12px 4px',
                  backgroundColor: '',
                  width: 300,
                  borderRadius: 14,
                  height: 180,
                  margin: 20,
                }}
              >
                <Carousel dots={false} autoplay>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>New Patients <UserOutlined/><br/>7000</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +5% Analytics for this year</p>
                </>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Total Patients <UserOutlined/><br/>69K</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +98% cases successful</p>
                </>
                </Carousel>
              </Card>

               <Card
                size="small"
                hoverable={true}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 2px -2px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px, rgba(0, 0, 0, 0.09) 0px 5px 12px 4px',
                  backgroundColor: '',
                  width: 300,
                  borderRadius: 14,
                  height: 180,
                  margin: 20,
                }}
              >
                <Carousel dots={false} autoplay>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Surgeries <MedicineBoxOutlined/><br/>15</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +7.2% Analytics for last week</p>
                </>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Treatment <MedicineBoxOutlined/><br/>70</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +29% Analytics for last week</p>
                </>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Operations <MedicineBoxOutlined/><br/>27</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +39% Analytics for last week</p>
                </>
                </Carousel>
              </Card>
                 <Card
                size="small"
                hoverable={true}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 2px -2px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px, rgba(0, 0, 0, 0.09) 0px 5px 12px 4px',
                  backgroundColor: '',
                  width: 300,
                  borderRadius: 14,
                  height: 180,
                  margin: 20,
                }}
              >
                <Carousel dots={false} autoplay>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Today's Visitors <EyeOutlined/><br/>171</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +5.2% Analytics for today</p>
                </>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Month's visitors <EyeOutlined/><br/>2600</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +9.6% Analytics for last month</p>
                </>
                <>
                <p style={{fontSize: 30, fontWeight: 50, fontFamily: 'calibri', color: 'black',}}>Total visitors <EyeOutlined/><br/>26K</p>
                <p style={{fontWeight: 50, fontFamily: 'calibri', color: 'black',}}><RiseOutlined/> +13.6% Analytics for last year</p>
                </>
                </Carousel>
              </Card>
              </Col>
              </div>
              
  );
};

export default MyList;