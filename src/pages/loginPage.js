import '../App.css';
import { Typography, Card, Avatar, Form, Input, Layout, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React , { useState, useEffect } from 'react'
import { fetchAllUsers, authenticateUser} from '../api'

const { Title} = Typography
const { Header, Content, Footer } = Layout;


export const LoginPage = (props) => {
    const { setCurrentUser, setActivePage} = props

    const onFinish = async (values) => {
        try {
            const response = await authenticateUser(values.uname, values.pwd)
            setCurrentUser(response.data)
            setActivePage(2)
        } 
        catch (err) {
            if (err && err.response.data) {
                // error from the server
                message.error('Incorrect Username Or Password!')
            } else if (err.request) {
                // netwoerk errors
                message.error('Network Error')
            } else {
                // Any other errors
                message.error('Other Error')
            }
        }
    };

    return (
        <>
        <div className="login-container">
        <Row>
            <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 9, span: 6}}>
            <Card style={{width: '100%'}} bordered={false}>
                <Avatar size={200} icon={<UserOutlined />} style={{marginBottom: '5%'}}/>
                <Card
                    title="My Todo List"
                    style={{width: '100%'}}
                    headStyle={{color:'red'}}>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                    <Form.Item
                        name="uname"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoFocus/>
                    </Form.Item>
                    <Form.Item
                        name="pwd"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log In
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <a className="login-form-forgot" href="#" >
                        Forgot password?
                        </a>
                        <Button type="link" onClick={() => setActivePage(3)}>Register now!</Button>
                    </Form.Item>
                </Form>
                </Card>

            </Card>
            </Col>
            </Row>
        </div>
        <Layout>
          <Footer className="footer-tag" > <i>Created By Brungas &copy;2021.</i> </Footer>
        </Layout>

          </>
    )
}

