import '../App.css';
import { Typography, Card, Avatar, Form, Input, Layout, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import React , { useState, useEffect } from 'react'
import { fetchAllUsers, createUser} from '../api'

const { Title} = Typography
const { Header, Content, Footer } = Layout;


export const RegistrationPage = (props) => {
    const { setActivePage} = props
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

    }, [users.length])

    const onFinish = async (values) => {
        const isPresent = users.find((user) => user.username === values.username)
        // const loggedUser = users.find((user) => user.username === values.username )
        if (isPresent) {
            message.error('Username Already Exist.')
        }
        else{

             try {
          const response = await createUser(values)
          if(response.status === 200){
            message.success('Account Created Successful.')
            // console.log(newTodo)
            // console.log(response)
            // const addedTodo = {...newTodo, id : response.data.id}
            // console.log(addedTodo)
            // setTodos([...todos, addedTodo])
            // TodoForm.resetFields()
            setActivePage(1)
            // setloading(false)
          }
        } 
        catch (error) {
          if(error && error.response.data)
           alert(JSON.stringify(error.response.data))
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
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
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

