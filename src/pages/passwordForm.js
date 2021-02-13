import { Card,  Form, Input, Spin, Button, message} from 'antd';
import { LockOutlined  } from '@ant-design/icons';
import React , { useState } from 'react'
import { editUser } from '../api'
import { LoadingOutlined } from '@ant-design/icons';

export const PasswordForm = (props) => {

    const { currentUser, setShowModal } = props
    const [PasswordForm] = Form.useForm()
    const [passwordLoader, setPasswordLoader] = useState(false)

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />
    const spinner = <Spin indicator={antIcon} tip="Please Wait!." />

    const onFinish = async (newValues) => {
        setPasswordLoader(true)
        const {password, id, ...restData } = currentUser
        const newUser = {...restData, password: newValues.password}
          try {
            //   console.log(newUser)
              console.log(id)
            const response = await editUser(id, newUser)
            if(response.status === 200){
            message.success('Password Changed Successfull')
            PasswordForm.resetFields()
            setPasswordLoader(false)
            setShowModal(false)
        }
        } catch (error) {
          console.log(error)
        }
    
    }

    return (
        <Card
                    // title="Account Informations"
                    style={{width: '100%'}}
                    headStyle={{color:'red'}}>
                    {passwordLoader ? spinner : 
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={PasswordForm}
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
                        name = "password"
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
                </Form>  }
                </Card>
        
     )
 }