import { Card, Form, Input, Upload, Button} from 'antd';
import { MailOutlined, PhoneOutlined  } from '@ant-design/icons';
import React , { useState } from 'react'

export const ProfileForm = (props) => {

    const initialImage = {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }

    const [currentImage, setcurrentImage] = useState(initialImage)
    const onFinish = async (activeUser) => {
    
    }

    return (
        <Card
                    style={{width: '100%'}}
                    headStyle={{color:'red'}}>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                    <Form.Item
                        name="photo"
                        rules={[{ required: true, message: 'Please Select Your Image!' }]}
                    >
                         <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            disabled={true}
                            >
                        Choose Image
                      </Upload>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Please Input your Phone Number!' }]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Phone Number"
                        />
                    </Form.Item>
                    {/* <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please Input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm New Password"
                        />
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Save
                        </Button>
                    </Form.Item>
                </Form>
                </Card>
        
     )
 }