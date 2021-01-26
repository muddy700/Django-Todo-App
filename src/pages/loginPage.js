import '../App.css';
import { Typography, Card, Avatar, Form, Input, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React , { useState, useEffect } from 'react'
import { fetchAllUsers} from '../api'


const { Title} = Typography

export const LoginPage = (props) => {
    const { setCurrentUser, activePage, setActivePage} = props
    const [users, setUsers] = useState([])


    const pullUsers = async () => {
        try {
            const users = await fetchAllUsers()
            setUsers(users)
        } catch (err) {
            if (err && err.response.data) {
                // error from the server
                message.error('Server Error')
            } else if (err.request) {
                // netwoerk errors
                message.error('Network Error')
            } else {
                // Any other errors
                message.error('Other Error')
            }
            // console.log('hyo => ' + err)
            // message.error('No Internet Connection')
        }
    }

    useEffect(() => {

        pullUsers()

    }, [])

    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const loggedUser = users.find((user) => user.username === values.username )
        if (loggedUser ) {
            setCurrentUser(loggedUser[0])
            setActivePage(2)
        }
        else{
            setActivePage(1)
            message.error('Incorrect Username Or Password!')
        }
    };

    return (
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
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <a className="login-form-forgot" href="#" >
                        Forgot password?
                        </a>
                        <a href="#">Register now!</a>
                    </Form.Item>
                </Form>
                </Card>

            </Card>
            </Col>
            </Row>
        </div>
    )
}

