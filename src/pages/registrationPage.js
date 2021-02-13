import '../App.css';
import { Card, Avatar, Form, Input, Layout, Button, Row, Col, Spin, message} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined  } from '@ant-design/icons';
import React , { useState, useEffect } from 'react'
import { fetchAllUsers, createUser} from '../api'
import { LoadingOutlined } from '@ant-design/icons';


const { Footer } = Layout;


export const RegistrationPage = (props) => {
    const { setActivePage} = props
    const [users, setUsers] = useState([])
    const [registrationLoader, setRegistrationLoader] = useState(false)

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />
    const spinner = <Spin indicator={antIcon} tip="Please Wait!." />

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

    }, [users.length])

    const onFinish = async (values) => {
        setRegistrationLoader(true)
        const isPresent = users.find((user) => user.username === values.username)
        // const loggedUser = users.find((user) => user.username === values.username )
        if (isPresent) {
            message.error('Username Already Exist.')
            setRegistrationLoader(false)
        }
        else{
            
            try {
                const response = await createUser(values)
                if(response.status === 200){
                    message.success('Account Created Successful.')
                    setRegistrationLoader(false)
                    // TodoForm.resetFields()
                    setActivePage(1)
                }
                else{
                    setRegistrationLoader(false)
                    message.error("Error Occured")
                }
            } 
            catch (error) {
                if(error && error.response.data)
                // alert(JSON.stringify(error.response.data))
                message.error("Some Error Occured")
                setRegistrationLoader(false)
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
                    title="Account Informations"
                    style={{width: '100%'}}
                    headStyle={{color:'red'}}>
                {registrationLoader ? spinner : 
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoFocus/>
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
                        name="password"
                        rules={[{ required: true, message: 'Please Input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="link" onClick={() => setActivePage(1)}>Have Account..? Log In</Button>
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

