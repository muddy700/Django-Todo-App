import '../App.css';
import { Card, Avatar, Form, Input, Layout, Button, Row, Col, Spin, message} from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React , { useState, } from 'react'
import { authenticateUser} from '../api'
import { LoadingOutlined } from '@ant-design/icons';

const { Footer } = Layout;

export const LoginPage = (props) => {
    const { setCurrentUser, setActivePage} = props
    const [loginLoader, setLoginLoader] = useState(false)
    
    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />
    const spinner = <Spin indicator={antIcon} tip="Please Wait!." />


    const onFinish = async (values) => {
        setLoginLoader(true)
        try {
            const response = await authenticateUser(values.uname, values.pwd)
            setCurrentUser(response.data)
            setLoginLoader(false)
            setActivePage(2)
        } 
        catch (err) {
            if (err && err.response.data) {
                // error from the server
                message.error('Incorrect Username Or Password!')
                setLoginLoader(false)
            } else if (err.request) {
                // netwoerk errors
                setLoginLoader(false)
                message.error('Network Error')
            } else {
                // Any other errors
                message.error('Other Error')
                setLoginLoader(false)
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
                {loginLoader ? spinner : 
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
                        {/* <a className="login-form-forgot" href="#" > */}
                        <Button type="link"> Forgot password? </Button>
                        {/* </a> */}
                        <Button type="link" onClick={() => setActivePage(3)}>Register now!</Button>
                    </Form.Item>
                </Form> }
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

