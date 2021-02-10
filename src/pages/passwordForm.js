import { Typography, Card, Avatar, Form, Input, Layout, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React from 'react'

export const PasswordForm = (props) => {

    const { currentUser } = props
    const onFinish = async (activeUser) => {
    
    }

    return (
        <Card
                    // title="Account Informations"
                    style={{width: '100%'}}
                    headStyle={{color:'red'}}>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[{ required: true, message: 'Please Input your Password!' } , 
                        () => ({ validator(rule, value) { if ( !value || value === currentUser.password ) { return Promise.resolve(); }
                        return Promise.reject('Wrong Password!'); }, }) ]} hasFeedback
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Current Password"
                        autoFocus
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please Input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repeatPassword"
                        rules={[{ required: true, message: 'Please Input your Password!' } , 
                        ({ getFieldValue }) => ({ validator(rule, value) { if (!value || getFieldValue('newPassword') === value) { return Promise.resolve(); }
                        return Promise.reject('Passwords Did Not Match!'); }, }),]} dependencies={['newPass']} hasFeedback 
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm New Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Save
                        </Button>
                    </Form.Item>

                    {/* <Form.Item>
                        <Button type="link" onClick={() => setActivePage(1)}>Have Account..? Log In</Button>
                    </Form.Item> */}
                </Form>
                </Card>
        
     )
 }