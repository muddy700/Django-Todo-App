import '../App.css';
import { Typography, Card, Layout, Menu, Row, Col, List, message, Form, Input, Button  } from 'antd';
import React , { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';


const { Title} = Typography
const { Header, Content, Footer } = Layout;


export const HomePage = (props) => {
    const { currentUser, userTodos } = props

    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // if(userTodos){
        const todoList =  userTodos.map((todo)=> <Title level={6} key={todo.id}>{todo.title}</Title>)
    // }

       const onFinish = (values) => {
     
    };

    return (
        <Layout>
          <Header className="header-tag" >
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu-tag">
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">About</Menu.Item>
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Item key="4"><Title level={4} style={{color: 'white'}}> Welcome {currentUser.username}.</Title></Menu.Item>
              <Menu.Item key="5" style={{float: 'right'}}>Logout</Menu.Item>
            </Menu>
          </Header>
          <Content className="content-tag" >
            <Card className="outer-card">
              
              <Row>
                <Col xs={{offset: 0, span:24}} sm={4} md={4} lg={4} xl={{offset: 6, span: 12}}>
                  <Card className="inner-card" title = "Add, Edit Or Delete Todo">
                      <Card className="form-card">
                        <Form
                          name="normal_login"
                          className="todo-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          >
                          <Row>
                            <Col xs={8} sm={4} md={4} lg={4} xl={6}>
                              <Form.Item
                                  name="title"
                                  rules={[{ required: true, message: 'Please input Title!' }]} >
                                  <Input placeholder="Title" />
                              </Form.Item>
                            </Col>
                            <Col xs={16} sm={4} md={4} lg={4} xl={14}>
                              <Form.Item name="description" >
                                  <Input placeholder="Description" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={4} md={4} lg={4} xl={3}>
                              <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Add
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row> 
                       </Form>
                      </Card>
                    <div className="demo-infinite-container">
                      <InfiniteScroll>
                        <List
                          dataSource={userTodos}
                          renderItem={item => (
                            <List.Item key={item.id} style={{textAlign: 'left'}}>
                              <List.Item.Meta
                                title={item.title}
                                description={item.description}
                              />
                              {/* <div>Content</div> */}
                            </List.Item>
                          )}>
                        </List>
                      </InfiniteScroll>
                    </div>
                      <Card className="counting-tag">
                        <Button>All</Button>
                        <Button>Pending</Button>
                        <Button>Completed</Button>
                        <Button>Clear Completed</Button>
                      </Card>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Content>
          <Footer className="footer-tag" > <i>Created By Brungas &copy;2021.</i> </Footer>
        </Layout>
    )
}


        // <div>

            
        // </div>