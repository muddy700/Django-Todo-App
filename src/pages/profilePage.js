import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React from 'react'
import { Typography, Card, Avatar, Layout, Menu, Row, Col, List, message, Badge, Form, Input, Button  } from 'antd';

const { Title} = Typography
const { Header, Content, Footer } = Layout;

export const ProfilePage = (props) => {

  const { currentUser, } = props

    return (
         <>
        <div className="login-container">
        <Row>
            <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 9, span: 6}}>
            <Card style={{width: '100%'}} bordered={false}
                    title = "Profile Informations" >
                <Avatar size={200} icon={<UserOutlined />} style={{marginBottom: '5%'}}/>
                <Card style={{width: '100%'}} headStyle={{color:'red'}}>
                    <Row>
                        <Col span={6}>
                            <Title level={4}>Name : </Title>
                        </Col>
                        <Col span={18}>
                            <Title level={4}> {currentUser.username} </Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Title level={4}>Email : </Title>
                        </Col>
                        <Col span={18}>
                            <Title level={4}> {currentUser.email ? currentUser.email : 'No Email'} </Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Title level={4}>Phone : </Title>
                        </Col>
                        <Col span={18}>
                            <Title level={4}> 0788387378 </Title>
                        </Col>
                    </Row>
                </Card>

            </Card>
            </Col>
            </Row>
        </div>
          </>
    )
}
